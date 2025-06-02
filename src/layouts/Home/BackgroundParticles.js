import { useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { useReducedMotion } from 'framer-motion';
import { useInViewport } from 'hooks';
import { useEffect, useRef } from 'react';
import styles from './BackgroundParticles.module.css';

export const BackgroundParticles = () => {
  const theme = useTheme();
  const canvasRef = useRef();
  const animationRef = useRef();
  const particlesRef = useRef([]);
  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { innerWidth, innerHeight } = window;
    
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Initialize particles
    const particleCount = reduceMotion ? 20 : 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 180, // Blue to cyan range
    }));

    const animate = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        innerWidth / 2, innerHeight / 2, 0,
        innerWidth / 2, innerHeight / 2, Math.max(innerWidth, innerHeight) / 2
      );
      
      if (theme.themeId === 'dark') {
        gradient.addColorStop(0, 'rgba(20, 20, 30, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 10, 20, 0.3)');
      } else {
        gradient.addColorStop(0, 'rgba(240, 240, 250, 0.1)');
        gradient.addColorStop(1, 'rgba(220, 220, 240, 0.2)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, innerWidth, innerHeight);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = innerWidth;
        if (particle.x > innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = innerHeight;
        if (particle.y > innerHeight) particle.y = 0;

        // Animate hue
        particle.hue += 0.2;
        if (particle.hue > 240) particle.hue = 180;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${(particle.hue + otherParticle.hue) / 2}, 50%, 50%, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      if (!reduceMotion && isInViewport) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!reduceMotion && isInViewport) {
      animate();
    }

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theme.themeId, reduceMotion, isInViewport]);

  return (
    <Transition in timeout={2000}>
      {visible => (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          data-visible={visible}
          aria-hidden="true"
        />
      )}
    </Transition>
  );
};
