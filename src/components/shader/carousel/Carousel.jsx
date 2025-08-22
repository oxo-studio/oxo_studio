// src/shade/carousel/Carousel.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import images from '../carousel/Image';
import CarouselItem from '../carousel/CarouselItems';
import { lerp, getPiramidalIndex } from '../carousel/Utils';

const planeSettings = {
  width: 1,
  height: 2.5,
  gap: 0.1
};

const Carousel = () => {
  const containerRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const sceneRef = useRef(new THREE.Scene());
  const itemsRef = useRef([]);
  const progress = useRef(0);
  const speed = useRef(0);
  const oldProgress = useRef(0);

  const viewportRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const container = containerRef.current;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Load textures
    const loader = new THREE.TextureLoader();
    Promise.all(images.map(img => loader.loadAsync(img.image))).then(textures => {
      textures.forEach((tex) => {
        const item = new CarouselItem({
          texture: tex,
          width: planeSettings.width,
          height: planeSettings.height,
          scene: sceneRef.current
        });
        itemsRef.current.push(item);
      });

      // Start animation loop AFTER items are ready
      animate();
    });

    // Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      viewportRef.current = { width, height };
    };
    window.addEventListener('resize', handleResize);

    // Scroll + drag interaction
    let isDragging = false;
    let startX = 0;
    const speedWheel = 0.02;
    const speedDrag = -0.3;

    const handleWheel = (e) => {
      progress.current += e.deltaY * speedWheel;
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      progress.current += dx * speedDrag;
      startX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);

    const items = itemsRef.current;
    const viewport = viewportRef.current;

    progress.current = Math.max(0, Math.min(progress.current, 100));
    const active = Math.floor((progress.current / 100) * (items.length - 1));
    const pyramid = getPiramidalIndex(items, active);

    items.forEach((item, i) => {
      item.setActive(i === active, viewport);
      item.setPosition(
        (i - active) * (planeSettings.width + planeSettings.gap),
        items.length * -0.1 + pyramid[i] * 0.1
      );
    });

    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    );
    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  return <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Carousel;
