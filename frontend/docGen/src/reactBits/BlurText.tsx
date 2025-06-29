import React, { useState, useEffect } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  className = '',
}) => {
  const [animatedIndexes, setAnimatedIndexes] = useState<Set<number>>(new Set());

  const splitText = animateBy === 'words' ? text.split(' ') : text.split('');

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    splitText.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setAnimatedIndexes(prev => new Set(prev).add(index));
      }, index * delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [text, delay, splitText.length]);

  const getTransform = (index: number) => {
    const isAnimated = animatedIndexes.has(index);
    if (isAnimated) return 'translate(0, 0)';

    switch (direction) {
      case 'top':
        return 'translate(0, -20px)';
      case 'bottom':
        return 'translate(0, 20px)';
      case 'left':
        return 'translate(-20px, 0)';
      case 'right':
        return 'translate(20px, 0)';
      default:
        return 'translate(0, -20px)';
    }
  };

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {splitText.map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-500 ease-out"
          style={{
            filter: animatedIndexes.has(index) ? 'blur(0px)' : 'blur(10px)',
            opacity: animatedIndexes.has(index) ? 1 : 0.3,
            transform: getTransform(index),
          }}
        >
          {char}
          {animateBy === 'words' && index < splitText.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

export default BlurText;