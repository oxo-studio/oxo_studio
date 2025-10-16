// components/IntroText.jsx


const IntroText = () => {
  return (
    <div style={{ 
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{ 
        color: '#00ffff', 
        fontSize: 'clamp(24px, 5vw, 42px)', 
        textAlign: 'center',
        
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
   
        padding: '3rem 4rem',
        
       
        
        
        maxWidth: '80%',
        lineHeight: '1.5',
        animation: 'glow 3s ease-in-out infinite alternate'
      }}>
        Cerchiamo di creare esperienze uniche<br />
        e siamo in continua evoluzione
        <div style={{
          marginTop: '2rem',
          fontSize: 'clamp(18px, 3vw, 24px)',
          opacity: 0.9,
          animation: 'pulse 2s infinite'
        }}>
           Scorri per scoprire di più 
        </div>
      </div>

      
    </div>
  );
};

export default IntroText;