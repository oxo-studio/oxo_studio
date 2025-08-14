import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D iChannel0;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform bool isHover;
  uniform vec2 iMouse; // posizione mouse normalizzata [0,1]

  const int c_samplesX = 25;
  const int c_samplesY = 25;
  const float c_textureSize = 512.0;

  const int c_halfSamplesX = c_samplesX / 2;
  const int c_halfSamplesY = c_samplesY / 2;
  const float c_pixelSize = (1.0 / c_textureSize);

  float Gaussian(float sigma, float x) {
    return exp(-(x*x) / (2.0 * sigma * sigma));
  }

  vec3 BlurredPixel(in sampler2D channel, in vec2 uv, float sigma) {
    float c_sigmaX = sigma;
    float c_sigmaY = c_sigmaX;

    float total = 0.0;
    vec3 ret = vec3(0.0);

    for (int iy = 0; iy < c_samplesY; ++iy) {
      float fy = Gaussian(c_sigmaY, float(iy) - float(c_halfSamplesY));
      float offsety = float(iy - c_halfSamplesY) * c_pixelSize;
      for (int ix = 0; ix < c_samplesX; ++ix) {
        float fx = Gaussian(c_sigmaX, float(ix) - float(c_halfSamplesX));
        float offsetx = float(ix - c_halfSamplesX) * c_pixelSize;
        total += fx * fy;
        ret += texture(channel, uv + vec2(offsetx, offsety)).rgb * fx * fy;
      }
    }
    return ret / total;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    if (!isHover) {
      vec3 col = texture(iChannel0, uv).rgb;
      gl_FragColor = vec4(col, 1.0);
      return;
    }

    // Calcola distanza tra pixel e posizione mouse
    float dist = distance(uv, iMouse);

    // Più vicino al mouse -> più forte effetto
    float intensity = smoothstep(0.3, 0.0, dist); 

    vec3 col0 = BlurredPixel(iChannel0, uv, 5.0);

    float t = iTime;
    vec2 dif = col0.rr * (col0.b - col0.g) * vec2(sin(t), cos(t));
    vec2 uv2 = uv + dif * (1.0 - col0.g) * 2.0 * intensity;

    vec3 col = mix(texture(iChannel0, uv).rgb, texture(iChannel0, uv2).rgb, intensity);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const BlurPhoto = ({ imageSrc, width = 512, height = 512 }) => {
  const containerRef = useRef();
  const requestRef = useRef();
  const rendererRef = useRef();
  const materialRef = useRef();

  const [hover, setHover] = useState(false);
  const mousePos = useRef([0, 0]);

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
          isHover: { value: false },
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
        material.uniforms.iTime.value = elapsed;
        material.uniforms.isHover.value = hover;
        material.uniforms.iMouse.value.set(mousePos.current[0], mousePos.current[1]);

        renderer.render(scene, camera);
        requestRef.current = requestAnimationFrame(animate);
      };

      animate();
    });

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode)
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
      }
    };
  }, [imageSrc, width, height, hover]);

  // Handler mouse per aggiornare posizione normalizzata [0,1]
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height; // invertito Y per coordinate UV
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

BlurPhoto.defaultProps = {
  width: 512,
  height: 512,
};

export default BlurPhoto;
