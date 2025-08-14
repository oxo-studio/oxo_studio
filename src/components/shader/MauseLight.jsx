import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MouseLight() {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,      // ✅ trasparenza abilitata
      antialias: true,
    });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = true; // ✅ corretto qui

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(
          window.innerWidth * pixelRatio,
          window.innerHeight * pixelRatio
        ),
      },
      iMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true, // ✅ permette trasparenza nel colore finale
      vertexShader:  /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader:  /* glsl */ `
        precision highp float;

        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec2 iMouse;

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          vec2 pos = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
          vec2 mousePos = (iMouse * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

          float pinch = uv.x * (1.0 - uv.x);
          float attraction = 0.7 / (1.0 + length(pos - mousePos) * 10.0);

          vec3 col = vec3(0.0);
          col += mix(vec3(0.0, 0.7, 1.5), vec3(1.0, 0.3, 1.0), smoothstep(0.0, 1.0, attraction)) * attraction * 1.5;

          // ✅ Rendiamo trasparente lo sfondo
          float alpha = clamp(length(col), 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * pixelRatio;
      const y = (e.clientY - rect.top) * pixelRatio;
      mouse.current.x = x;
      mouse.current.y = uniforms.iResolution.value.y - y;
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width * pixelRatio, height * pixelRatio);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const animate = () => {
      const elapsedTime = (Date.now() - startTimeRef.current) * 0.001;
      uniforms.iTime.value = elapsedTime;
      uniforms.iMouse.value.set(mouse.current.x, mouse.current.y);

      renderer.render(scene, camera);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0, // sempre sotto tutto
      }}
    />
  );
}
