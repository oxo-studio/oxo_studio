import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MauseBable() {
  const canvasRef = useRef(null);
  const materialRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pixelRatio = window.devicePixelRatio || 1;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

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
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;

        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec2 iMouse;

        // Hash da float
        float hash(float p) {
          p = fract(p * 0.011);
          p *= p + 7.5;
          p *= p + p;
          return fract(p);
        }

        // Hash da vec2
        float hash(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.13);
          p3 += dot(p3, p3.yzx + 3.333);
          return fract((p3.x + p3.y) * p3.z);
        }

        // Rumore 3D
        float noise(vec3 x) {
          const vec3 step = vec3(110, 241, 171);

          vec3 i = floor(x);
          vec3 f = fract(x);

          float n = dot(i, step);

          vec3 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(
              mix(hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
              mix(hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
            mix(
              mix(hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
              mix(hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y),
            u.z);
        }

        // Gradiente glow elettrico (blu elettrico → fucsia → bianco)
        vec3 glowGradient(float t) {
          return mix(vec3(0.0, 0.7, 1.5), vec3(1.0, 0.3, 1.0), smoothstep(0.0, 1.0, t));
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;

          // Normalizza posizione in coordinate centrali [-1, 1], mantiene proporzioni
          vec2 pos = (gl_FragCoord.xy * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

          // Calcolo posizione mouse normalizzata con stesso sistema di riferimento
          vec2 mousePos = (iMouse * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);

          // Striscia "pinch" centrale, per amplificare l'effetto visivo come nel secondo shader
          float pinch = uv.x * (1.0 - uv.x);

          // Altezza master per oscillazioni strisce
          float masterHeight = (uv.y - 0.5) * 15.0 
            - sin(iTime * 2.0 + uv.x * 10.0)
            - sin(iTime * 10.0 + uv.x * 25.0) * 0.8
            - sin(iTime * 2.0 + uv.x * 45.0) * 0.6;

          masterHeight *= pow(abs(pinch), 0.1) * -0.02;

          vec3 col = vec3(0.0);

          // Attrazione calamita verso il mouse
          float attraction = 0.7 / (1.0 + length(pos - mousePos) * 14.0);

          for (int i = 0; i < 3; i++) {
            // Rumore 3D dinamico per creare variazioni strisce
            float noiseOffset = noise(vec3(uv.x * 35.0, iTime * 15.0, float(i) * 10.0)) * 2.0 - 1.0;

            float offset = 0.5 + noiseOffset * 0.1 * pinch;

            float invHeight = 15.0 / pow(pinch, 3.0);

            // Funzione per creare le strisce ondulate
            float func = (uv.y - offset + masterHeight) * invHeight - sin(iTime * 6.0 + uv.x * 20.0 + float(i) * 4.0);
            func *= 3.0;

            // Calcolo il glow blu intenso per ogni striscia
            float blueIntensity = 3.0 / pow(abs(func), 0.4);

            // Aggiungo al canale blu e verde per dare sfumatura elettrica
            col.b += blueIntensity * 0.4;
            col.g += blueIntensity * 0.2;
          }

          // Aggiungo l’effetto glow calamita elettricità, amplificato dall’attraction verso il mouse
          col += glowGradient(attraction) * attraction * 1.5;

          // Output finale
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    startTimeRef.current = Date.now();

    function onMouseMove(e) {
      mouse.current.x = e.clientX * pixelRatio;
      mouse.current.y = (window.innerHeight - e.clientY) * pixelRatio;
    }
    window.addEventListener("mousemove", onMouseMove);

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width * pixelRatio, height * pixelRatio);
    }
    window.addEventListener("resize", onResize);

    function animate() {
      const elapsedTime = (Date.now() - startTimeRef.current) * 0.001;
      material.uniforms.iTime.value = elapsedTime;
      material.uniforms.iMouse.value.set(mouse.current.x, mouse.current.y);

      renderer.render(scene, camera);
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }

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
      id="webgl"
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}

