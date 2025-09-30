import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

export default function SplashScreen({ onFinish }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      // Animazione di uscita verso l'alto
      gsap.to(containerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: onFinish, // chiama la funzione solo dopo l'animazione
      });
    };

    if (video) {
      video.play().catch((err) => {
        console.error('Errore nel tentativo di riprodurre il video:', err);
      });

      video.addEventListener('ended', handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src="/public/video/video.mp4"
        className="w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />
    </div>
  );
}

SplashScreen.propTypes = {
  onFinish: PropTypes.func.isRequired,
};
