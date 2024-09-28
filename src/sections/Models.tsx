'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import cogImage from '@/assets/AI.png';
import Image from 'next/image';
import Modelss from './Cards';

export const Models = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col items-center mt-6">
        {/* Container for the image with a specific size */}
        <div className="relative w-80 h-80 flex items-center justify-center md:w-100 md:h-100">
          {/* Background effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-pink-500 blur-3xl opacity-50"></div>
          {/* Image with specific size inside the container */}
          <Image
            src={cogImage}
            alt="AI"
            className="object-contain relative z-10"
            width={400} // Adjust the width as needed
            height={400} // Adjust the height as needed
          />
        </div>
        <Modelss />
      </div>
    </section>
  );
};
