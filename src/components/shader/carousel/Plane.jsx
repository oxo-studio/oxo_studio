// src/shade/carousel/Plane.js
import * as THREE from 'three';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from '../carousel/Shader';

export default class Plane {
  constructor({ texture, width, height, scene }) {
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.scene = scene;

    this.geometry = new THREE.PlaneGeometry(width, height, 30, 30);

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uZoomScale: { value: new THREE.Vector2(1, 1) },
        uTex: { value: this.texture },
        uRes: { value: new THREE.Vector2(width, height) },
        uImageRes: {
          value: new THREE.Vector2(
            texture.image.width,
            texture.image.height
          ),
        },
      },
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setActive(active, viewport) {
    const uniforms = this.material.uniforms;

    uniforms.uZoomScale.value.x = viewport.width / this.width;
    uniforms.uZoomScale.value.y = viewport.height / this.height;

    gsap.to(uniforms.uProgress, { value: active ? 1 : 0 });
    gsap.to(uniforms.uRes.value, {
      x: active ? viewport.width : this.width,
      y: active ? viewport.height : this.height,
    });
  }

  setPosition(x, y, z = 0) {
    this.mesh.position.set(x, y, z);
  }
}
