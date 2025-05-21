import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const characters = '0123456789!@#$%^&*()-_=+[]{};:\'",.<>/?\\|';


function getRandomChar() {
  return characters[Math.floor(Math.random() * characters.length)];
}

export default function DecoderText({ text, className = '' }) {
  const [displayed, setDisplayed] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const stopAnimation = useRef(false);
  const intervals = useRef([]);

  const clearAllIntervals = () => {
    intervals.current.forEach(clearInterval);
    intervals.current = [];
  };

  useEffect(() => {
    // Cleanup intervals on unmount
    return () => {
      clearAllIntervals();
    };
  }, []);

  const handleMouseEnter = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    stopAnimation.current = false;

    const letters = text.split('');
    const finalText = [...letters];
    const tempText = [...letters];

    let index = 0;
    const delayPerLetter = 30;      // Ridotto da 60 a 30 ms
    const cyclesPerLetter = 3;      // Cicli un po' più alti per effetto più fluido
    const cycleIntervalTime = 20;   // Ridotto da 60 a 20 ms

    const animateLetter = () => {
      if (stopAnimation.current) {
        clearAllIntervals();
        setDisplayed(text);
        setIsAnimating(false);
        return;
      }

      let cycle = 0;

      const cycleInterval = setInterval(() => {
        if (stopAnimation.current) {
          clearAllIntervals();
          setDisplayed(text);
          setIsAnimating(false);
          return;
        }

        if (letters[index] === ' ') {
          // Salta l'animazione per spazi
          cycle = cyclesPerLetter;
        }

        if (cycle < cyclesPerLetter) {
          tempText[index] = getRandomChar();
          setDisplayed(tempText.join(''));
          cycle++;
        } else {
          tempText[index] = finalText[index];
          setDisplayed(tempText.join(''));
          clearInterval(cycleInterval);
          index++;

          if (index < letters.length) {
            setTimeout(animateLetter, delayPerLetter);
          } else {
            setIsAnimating(false);
          }
        }
      }, cycleIntervalTime);

      intervals.current.push(cycleInterval);
    };

    animateLetter();
  };

  const handleMouseLeave = () => {
    stopAnimation.current = true;
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}   // attiva animazione al tocco
      onTouchEnd={handleMouseLeave}      // ferma animazione al rilascio del tocco
      onTouchCancel={handleMouseLeave} 
      style={{
        whiteSpace: 'nowrap',
        display: 'inline-block',
        fontVariantLigatures: 'none',
        cursor: 'pointer',
      
      }}
    >
      {displayed}
    </span>
  );
}

DecoderText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

