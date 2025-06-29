import React, { useRef, useEffect, useState } from 'react';

interface OrbProps {
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  hue?: number;
  forceHoverState?: boolean;
}

const Orb: React.FC<OrbProps> = ({
  hoverIntensity = 1,
  rotateOnHover = false,
  hue = 220,
  forceHoverState = false,
}) => {
  const [isHovered, setIsHovered] = useState(forceHoverState);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceHoverState) {
      setIsHovered(true);
    }
  }, [forceHoverState]);

  return (
    <div
      ref={orbRef}
      className="relative w-full h-full"
      onMouseEnter={() => !forceHoverState && setIsHovered(true)}
      onMouseLeave={() => !forceHoverState && setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 rounded-full transition-all duration-700 ease-out ${
          rotateOnHover && isHovered ? 'animate-spin' : ''
        }`}
        style={{
          background: `radial-gradient(circle at 30% 30%, 
            hsla(${hue}, 100%, 70%, ${isHovered ? 0.8 * hoverIntensity : 0.4}), 
            hsla(${hue + 60}, 100%, 60%, ${isHovered ? 0.6 * hoverIntensity : 0.3}), 
            hsla(${hue + 120}, 100%, 50%, ${isHovered ? 0.4 * hoverIntensity : 0.2}),
            transparent)`,
          filter: `blur(${isHovered ? 20 * hoverIntensity : 30}px)`,
          transform: `scale(${isHovered ? 1.2 : 1})`,
        }}
      />
      
      <div
        className="absolute inset-4 rounded-full border transition-all duration-500"
        style={{
          borderColor: `hsla(${hue}, 100%, 80%, ${isHovered ? 0.6 : 0.3})`,
          borderWidth: '2px',
          boxShadow: `inset 0 0 ${isHovered ? 60 : 30}px hsla(${hue}, 100%, 70%, ${isHovered ? 0.4 : 0.2})`,
        }}
      />
    </div>
  );
};

export default Orb;