import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
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

vec3 plasmaColor(float value, vec2 uv, float t) {
  vec3 electricBlue = vec3(0.0, 0.9, 1.0);
  vec3 neonPurple = vec3(0.9, 0.1, 1.0);
  vec3 shockPink = vec3(1.0, 0.0, 0.8);
  vec3 laserGreen = vec3(0.2, 1.0, 0.3);
  vec3 hotCyan = vec3(0.0, 1.0, 0.9);
  
  float f = smoothstep(0.0, 1.0, value);
  
  float cycle1 = sin(t * 2.0 + uv.x * 5.0) * 0.5 + 0.5;
  float cycle2 = cos(t * 1.7 + uv.y * 4.0) * 0.5 + 0.5;
  float cycle3 = sin(t * 3.0 + (uv.x + uv.y) * 6.0) * 0.5 + 0.5;
  
  vec3 mix1 = mix(electricBlue, neonPurple, cycle1);
  vec3 mix2 = mix(shockPink, laserGreen, cycle2);
  vec3 mix3 = mix(mix1, mix2, cycle3);
  vec3 finalMix = mix(mix3, hotCyan, f * 0.7);
  
  float sparkle = sin(t * 10.0 + uv.x * 20.0 + uv.y * 15.0) * 0.3 + 0.7;
  finalMix *= sparkle;
  
  return finalMix * (1.2 + f * 0.8);
}

vec2 meltingDistortion(vec2 uv, vec3 col, float t) {
  float distortionPower = 3.0;
  
  float wave1 = sin(t * 3.0 + uv.x * 8.0 + col.r * 5.0) * 0.1;
  float wave2 = cos(t * 2.5 + uv.y * 6.0 + col.g * 4.0) * 0.08;
  float wave3 = sin(t * 4.0 + (uv.x + uv.y) * 10.0 + col.b * 6.0) * 0.12;
  
  vec2 distortion = vec2(
    (col.r - col.g) * distortionPower + wave1 + wave3,
    (col.b - col.r) * distortionPower + wave2 - wave3
  );
  
  return distortion * (1.0 - col.g) * 2.5;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float t = iTime;

  vec3 col0 = BlurredPixel(iChannel0, uv, 6.0);

  vec2 distortion = meltingDistortion(uv, col0, t);
  vec2 uv2 = uv + distortion * 0.03;

  vec3 blurred = texture(iChannel0, uv2).rgb;

  float brightness = dot(blurred, vec3(0.299, 0.587, 0.114));
  float inverted = 1.0 - brightness;
  float contrastInverted = inverted * inverted * 1.5;

  vec3 plasma = plasmaColor(contrastInverted, uv, t);

  float glow = pow(contrastInverted, 3.0) * 2.0;
  plasma += glow * vec3(0.5, 0.8, 1.0);

  float fadeDuration = 2.0;
  float timeFade = clamp(1.0 - (t / fadeDuration), 0.0, 1.0);

  float alpha = smoothstep(0.1, 0.7, contrastInverted) * hoverAmount * timeFade;

  vec3 original = texture(iChannel0, uv).rgb;

  vec3 finalColor = mix(original, plasma, alpha * 1.2);

  float vibration = sin(t * 20.0) * 0.01 * hoverAmount;
  finalColor = texture(iChannel0, uv + vec2(vibration)).rgb * (1.0 - alpha) + plasma * alpha;

  finalColor = pow(finalColor, vec3(0.9));

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

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
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
          hoverAmount: { value: 1 },
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

        if (elapsed < 2) {
          const smooth = 1 - Math.min(elapsed / 2, 1);
          mat.uniforms.hoverAmount.value = smooth;
        } else {
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
      style={{ 
        width, 
        height, 
        cursor: "pointer",
        background: "black"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
    />
  );
};

export default BlurPhoto;