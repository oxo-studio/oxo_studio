import { useEffect } from 'react';
import Container from '../components/Container';
import initializeHoverHeader from '../threejs/HoverHeader';

export default function Boxes() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    initializeHoverHeader();
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Container>
      <main
        style={{
          margin: 0,
          padding: 0,
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          id="TextContainer"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 5,
          }}
        ></div>
      </main>
    </Container>
  );
}
