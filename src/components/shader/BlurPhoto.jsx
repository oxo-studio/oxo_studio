import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

// Vertex Shader
const vertexShader =  /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader
const fragmentShader =  /* glsl */`
precision highp float;

uniform sampler2D iChannel0;
uniform vec2 iResolution;
uniform float iTime;
uniform float hoverAmount;
uniform vec2 iMouse;

const int c_samplesX = 25;
const int c_samplesY = 25;
const float c_textureSize = 512.0;

const int c_halfSamplesX = c_samplesX / 2;
const int c_halfSamplesY = c_samplesY / 2;
const float c_pixelSize = (1.0 / c_textureSize);

float Gaussian(float sigma, float x) {
  return exp(-(x * x) / (2.0 * sigma * sigma));
}

vec3 BlurredPixel(in sampler2D channel, in vec2 uv, float sigma) {
  float total = 0.0;
  vec3 ret = vec3(0.0);
  for (int iy = 0; iy < c_samplesY; ++iy) {
    float fy = Gaussian(sigma, float(iy - c_halfSamplesY));
    float offsetY = float(iy - c_halfSamplesY) * c_pixelSize;
    for (int ix = 0; ix < c_samplesX; ++ix) {
      float fx = Gaussian(sigma, float(ix - c_halfSamplesX));
      float offsetX = float(ix - c_halfSamplesX) * c_pixelSize;
      total += fx * fy;
      ret += texture(channel, uv + vec2(offsetX, offsetY)).rgb * fx * fy;
    }
  }
  return ret / total;
}

// Plasma con blu elettrico → viola → grigio
vec3 plasmaColor(float value, vec2 uv, float t) {
vec3 colA = vec3(0.0, 0.8, 1.0);       // Azzurro elettrico #00CCFF
vec3 colB = vec3(0.8, 0.2, 1.0);       // Viola neon #CC33FF
vec3 colC = vec3(0.95, 0.95, 0.0);     // Giallo shock #F2F200

  float f = smoothstep(0.0, 1.0, value); // maggiore luminosità = più colore

  vec3 mixAB = mix(colA, colB, f);
  return mix(mixAB, colC, 0.2 + 0.2 * sin(t * 0.5 + uv.x * 3.0 + uv.y * 3.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float t = iTime;

  // Blur dell'immagine
  vec3 col0 = BlurredPixel(iChannel0, uv, 5.0);

  // Calcolo UV distorto (come prima)
  vec2 dif = col0.rr * (col0.b - col0.g) * vec2(sin(t), cos(t));
  vec2 uv2 = uv + dif * (1.0 - col0.g) * 2.0;

  // Prende colore sfocato e distorto
  vec3 blurred = texture(iChannel0, uv2).rgb;

  // Calcolo luminosità
  float brightness = dot(blurred, vec3(0.299, 0.587, 0.114));
  float inverted = 1.0 - brightness;

  // Plasma mapping
  vec3 plasma = plasmaColor(inverted, uv, t);

  // Fade out progressivo in base a iTime (durata 2 secondi)
  float fadeDuration = 2.0;
  float timeFade = clamp(1.0 - (t / fadeDuration), 0.0, 1.0);

  // Alpha finale = plasma visibility * hoverAmount * fade out
  float alpha = smoothstep(0.05, 0.5, inverted) * hoverAmount * timeFade;

  // Colore originale nitido senza deformazioni
  vec3 original = texture(iChannel0, uv).rgb;

  // Mix tra plasma e immagine originale in base a alpha (plasma sopra)
  vec3 finalColor = mix(original, plasma, alpha);

  gl_FragColor = vec4(finalColor, 1.0);
}




`;

const BlurPhoto = ({ imageSrc, width = 512, height = 512 }) => {
  const containerRef = useRef();
  const requestRef = useRef();
  const rendererRef = useRef();
  const materialRef = useRef();
  const mousePos = useRef([0, 0]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          iChannel0: { value: texture },
          iResolution: { value: new THREE.Vector2(width, height) },
          iTime: { value: 0 },
          hoverAmount: { value: 1 }, // parte sfocato
          iMouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader,
        fragmentShader,
        transparent: false,
      });

      materialRef.current = material;

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let startTime = Date.now();

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const mat = materialRef.current;

        mat.uniforms.iTime.value = elapsed;
        mat.uniforms.iMouse.value.set(mousePos.current[0], mousePos.current[1]);

        // Dissolvenza iniziale (nei primi 2 secondi)
        if (elapsed < 2) {
          const smooth = 1 - Math.min(elapsed / 2, 1);
          mat.uniforms.hoverAmount.value = smooth;
        } else {
          // Normale comportamento hover
          mat.uniforms.hoverAmount.value = hover ? 1 : 0;
        }

        renderer.render(scene, camera);
        requestRef.current = requestAnimationFrame(animate);
      };

      animate();
    });

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [imageSrc, width, height, hover]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    mousePos.current = [x, y];
  };

  return (
    <div
      ref={containerRef}
      style={{ width, height, cursor: "pointer" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
    />
  );
};

BlurPhoto.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default BlurPhoto;
