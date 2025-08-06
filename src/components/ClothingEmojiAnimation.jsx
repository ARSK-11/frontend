import { useState, useEffect } from "react";
import "./ClothingEmojiAnimation.css";

const ClothingEmojiAnimation = () => {
  const [emojis, setEmojis] = useState([]);
  
  const clothingEmojis = [
    { emoji: "👕", name: "Kemeja" },
    { emoji: "👖", name: "Celana" },
    { emoji: "👗", name: "Gaun" },
    { emoji: "👠", name: "Sepatu Hak Tinggi" },
    { emoji: "👟", name: "Sneakers" },
    { emoji: "🧥", name: "Jaket" },
    { emoji: "👔", name: "Dasi" },
    { emoji: "👘", name: "Kimono" },
    { emoji: "🥻", name: "Sari" },
    { emoji: "👙", name: "Bikini" },
    { emoji: "🩳", name: "Celana Pendek" },
    { emoji: "🧢", name: "Topi" },
    { emoji: "👜", name: "Tas" },
    { emoji: "💍", name: "Cincin" },
    { emoji: "🕶️", name: "Kacamata Hitam" }
  ];

  useEffect(() => {
    const createEmoji = () => {
      const randomEmoji = clothingEmojis[Math.floor(Math.random() * clothingEmojis.length)];
      const newEmoji = {
        id: Date.now() + Math.random(),
        emoji: randomEmoji.emoji,
        name: randomEmoji.name,
        x: Math.random() * (window.innerWidth - 100),
        y: window.innerHeight + 50,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        speed: 1 + Math.random() * 2,
        opacity: 0.7 + Math.random() * 0.3
      };
      
      setEmojis(prev => [...prev, newEmoji]);
      
      // Remove emoji after animation
      setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
      }, 8000);
    };

    const interval = setInterval(createEmoji, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateEmojis = () => {
      setEmojis(prev => 
        prev.map(emoji => ({
          ...emoji,
          y: emoji.y - emoji.speed,
          rotation: emoji.rotation + 1
        }))
      );
    };

    const animationInterval = setInterval(animateEmojis, 50);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            left: emoji.x,
            top: emoji.y,
            transform: `rotate(${emoji.rotation}deg) scale(${emoji.scale})`,
            opacity: emoji.opacity,
            fontSize: '2rem'
          }}
          title={emoji.name}
        >
          <div className="relative group">
            <span className="clothing-emoji">{emoji.emoji}</span>
            {/* Sparkle effects */}
            <div className="sparkle" style={{ top: '-8px', right: '-8px' }}></div>
            <div className="sparkle" style={{ bottom: '-8px', left: '-8px', animationDelay: '0.7s' }}></div>
            <div className="sparkle" style={{ top: '50%', right: '-12px', animationDelay: '1.2s' }}></div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap tooltip-animate">
              {emoji.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClothingEmojiAnimation; 