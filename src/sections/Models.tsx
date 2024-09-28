'use client'
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import cogImage from '@/assets/AI.png';
import Image from "next/image";
import Modelss from './Cards';

export const Models = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col items-center mt-6">
       
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-pink-500 blur-3xl opacity-50"></div>
          <Image
            src={cogImage}
            alt="AI"
            className="w-full h-full object-contain relative z-10"
          />

      <Modelss />
    </section>
  );
};
