import { useState, useEffect } from "react";

const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticle = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 10,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 6000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y - particle.speed,
          opacity: particle.opacity - 0.005
        }))
      );
    };

    const animationInterval = setInterval(animateParticles, 50);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect; 