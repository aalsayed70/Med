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
        

        <div
          className="bg-gradient-to-br from-pink-400 to-purple-500 text-center text-white max-w-3xl mx-auto px-6 py-8 rounded-xl shadow-2xl border-2 border-pink-300 relative z-10 mb-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-10 transform rotate-3"></div>
          <p className="text-lg md:text-xl font-medium leading-relaxed relative z-10 text-shadow">
            النماذج دي طورناها باستخدام بيانات أكثر من
            <span className="font-bold text-yellow-300"> 3.5 مليون أم</span>،
            <br className="hidden md:inline" /> تم بناؤها بالكامل من الصفر وهدفها
            <br className="hidden md:inline" /> تطمني على صحة الحمل وتقديم تحليلات دقيقة
            <br className="hidden md:inline" /> هتساعدك في حاجات زي
          </p>
        </div>
      </div>

      <Modelss />
    </section>
  );
};
