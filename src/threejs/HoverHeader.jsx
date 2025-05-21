import * as THREE from 'three';

export default function initializeHoverHeader() {
  const container = document.getElementById('TextContainer');
  if (!container) {
    console.error('TextContainer non trovato nel DOM!');
    return;
  }

  let easeFactor = 0.05;
  let scene, camera, renderer, planeMesh;
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetMousePosition = { x: 0.5, y: 0.5 };
  let prevPosition = { x: 0.5, y: 0.5 };

  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    uniform sampler2D u_texture1;
    uniform sampler2D u_texture2;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;

    void main() {
      vec2 gridUV = floor(vUv * vec2(40.0)) / vec2(40.0);
      vec2 centerOfPixel = gridUV + vec2(1.0 / 40.0);

      vec2 direction = u_mouse - u_prevMouse;
      vec2 offset = centerOfPixel - u_mouse;
      float dist = length(offset);
      float strength = smoothstep(0.2, 0.0, dist);
      vec2 uvOffset = strength * -direction * 0.15;

      vec4 tex1 = texture2D(u_texture1, vUv - uvOffset);
      vec4 tex2 = texture2D(u_texture2, vUv - uvOffset);

      vec4 color = max(tex1, tex2); // unisci i due testi

      if (color.a < 0.05) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      } else {
        gl_FragColor = color;
      }
    }
  `;

  function createTextTexture(text, offsetY = 0) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth * 2;
    const height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;

    const fontSize = Math.floor(width * 0.1);
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${fontSize}px Orbitron`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = width / 2;
    const y = height / 2 + offsetY;

    ctx.lineWidth = fontSize * 0.005;
    ctx.strokeStyle = "#ffffff";
    for (let i = 0; i < 3; i++) ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;

    return texture;
  }

  function initScene(texture1, texture2) {
    scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.OrthographicCamera(-1, 1, 1 / aspect, -1 / aspect, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      u_texture1: { value: texture1 },
      u_texture2: { value: texture2 },
      u_mouse: { value: new THREE.Vector2() },
      u_prevMouse: { value: new THREE.Vector2() },
    };

    planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      })
    );

    scene.add(planeMesh);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(new THREE.Color("#0e100f"), 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    window.addEventListener("resize", onWindowResize);
  }

  function animate() {
    requestAnimationFrame(animate);

    mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

    planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1 - mousePosition.y);
    planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1 - prevPosition.y);

    prevPosition.x = mousePosition.x;
    prevPosition.y = mousePosition.y;

    renderer.render(scene, camera);
  }

  function handleMove(x, y) {
    const rect = container.getBoundingClientRect();
    prevPosition = { ...targetMousePosition };
    targetMousePosition.x = (x - rect.left) / rect.width;
    targetMousePosition.y = (y - rect.top) / rect.height;
  }

  function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.top = 1 / aspect;
    camera.bottom = -1 / aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  container.addEventListener("mousemove", e => handleMove(e.clientX, e.clientY));
  container.addEventListener("mouseenter", e => handleMove(e.clientX, e.clientY));
  container.addEventListener("mouseleave", () => {
    easeFactor = 0.02;
    targetMousePosition = { ...prevPosition };
  });

  container.addEventListener("touchstart", e => {
    if (e.touches.length) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  });
  container.addEventListener("touchmove", e => {
    if (e.touches.length) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  });
  container.addEventListener("touchend", () => {
    easeFactor = 0.02;
    targetMousePosition = { ...prevPosition };
  });

  const texture1 = createTextTexture("Web Design", -200);
  const texture2 = createTextTexture("& Developer", 200);
  initScene(texture1, texture2);
  animate();
}
