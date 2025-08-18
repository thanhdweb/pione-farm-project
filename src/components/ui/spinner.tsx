'use client';
import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';

// ================= Spinner =================
export const Spinner = () => (
  <div className="w-8 h-8 rounded-full animate-spin border-4 border-t-4 border-t-blue-500 border-gray-300 shadow-md" />
);

// ================= DotLoader =================
export const DotLoader = () => (
  <div className="flex items-center justify-center space-x-1 mt-2">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
  </div>
);

// ================= AnimatedSquare =================
interface AnimatedSquareProps {
  x?: string | number;
  rotate?: number;
  delay?: number;
  loop?: boolean;
  alternate?: boolean;
  color?: string;
  size?: number;
}

export const AnimatedSquare: React.FC<AnimatedSquareProps> = ({
  x = '17rem',
  rotate = 360,
  delay = 500,
  loop = true,
  alternate = true,
  color = 'bg-red-500',
  size = 40
}) => {
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (squareRef.current) {
      animate(squareRef.current, {
        x,
        rotate: {
          to: rotate,
          delay: 1000,
        },
        delay,
        loop,
        alternate
      });
    }
  }, [x, rotate, delay, loop, alternate]);

  return (
    <div
      ref={squareRef}
      style={{ width: size, height: size }}
      className={`${color} rounded`}
    />
  );
};
