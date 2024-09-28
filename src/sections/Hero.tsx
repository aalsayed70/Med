"use client";

import React, { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Slogan from "@/assets/slogan.png";
import { BrainCircuit, Baby, Weight, HeartPulse, Activity } from 'lucide-react';

export const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null); // Updated ref



  const handleScrollDown = () => {
    if (contentRef.current) {
      const yOffset = 840;
      const targetPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 6000; // Total scroll duration
      let startTime: number | null = null; // Specify the type of startTime
      let animationFrameId: number; // Specify the type of animationFrameId
  
      // Ease-out cubic function for fast-to-slow effect
      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };
  
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
  
        // Scroll according to ease-out cubic
        const run = easeOutCubic(progress) * distance + startPosition;
        window.scrollTo(0, run);
  
        if (timeElapsed < duration) {
          animationFrameId = requestAnimationFrame(animation);
        }
      };
  
      // Start the scrolling animation
      animationFrameId = requestAnimationFrame(animation);
  
      // Function to cancel the animation on user interaction (touch/mouse)
      const cancelScroll = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousedown', cancelScroll);
        window.removeEventListener('touchstart', cancelScroll);
      };
  
      // Add event listeners for mouse and touch events
      window.addEventListener('mousedown', cancelScroll);
      window.addEventListener('touchstart', cancelScroll);
    }
  };


  return (
    <section
      dir="rtl"
      className="relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="w-full max-w-4xl px-4 py-10 relative z-10">
        <div className="text-center mb-12">
          <div className="text-2xl inline-flex border-2 border-blue-400 py-1 px-4 rounded-full tracking-wide text-blue-600 font-semibold mb-3 transition-all hover:bg-blue-50 hover:shadow-md">
            مركز
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 text-transparent bg-clip-text py-1 mb-5 animate-gradient">
            د. ناصر فرحات
          </h1>
          <div className="text-2xl sm:text-3xl flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <span className="font-semibold text-gray-700 md:ml-3">استشاري اول</span>
            <span className="text-pink-600 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 font-bold h-10"> 
              <TypeAnimation
                sequence={[
                  'نساء و توليد', 
                  1000, 
                  'حقن مجهري', 
                  1000,
                  'مناظير',
                  1000
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 items-center text-center">
            
            مرحبًا بك في مركز صحة الحمل المدعوم بالذكاء الاصطناعي
          </h2>
          
          <p className="text-gray-700 mb-6 text-lg">
            اكتشفي أدوات مدعومة بالذكاء الاصطناعي مصممة لدعمك طوال رحلة الحمل. نماذجنا بتحلل عوامل مهمة لتقديم رؤى شخصية—
            <span className="font-bold text-pink-600">وكل ده مجانًا</span>
          </p>
          
          <h3 className="text-xl font-semibold text-blue-700 mb-4">طب إنتي ممكن تعملي إيه هنا؟</h3>
          
          <ul className="space-y-4 text-gray-800 mb-6">
            <li className="flex items-center bg-blue-50 p-3 rounded-lg">
              <Baby className="text-pink-500 mr-3" size={24} />
              <span className="font-medium">توقع نوع الولادة</span>
            </li>
            <li className="flex items-center bg-pink-50 p-3 rounded-lg">
              <Weight className="text-blue-500 mr-3" size={24} />
              <span className="font-medium">متابعة وزنك أثناء الحمل</span>
            </li>
            <li className="flex items-center bg-purple-50 p-3 rounded-lg">
              <HeartPulse className="text-green-500 mr-3" size={24} /> {/* Replaced Diabetes with HeartPulse */}
              <span className="font-medium">تقييم خطر الإصابة بسكري الحمل</span>
            </li>
            <li className="flex items-center bg-green-50 p-3 rounded-lg">
              <Activity className="text-purple-500 mr-3" size={24} />
              <span className="font-medium">تقدير خطر الإصابة بضغط الحمل</span>
            </li>
          </ul>
          
          <div className="text-center">
            <p className="text-purple-800 mb-6 font-semibold text-xl">
              جربي نماذجنا الآن و إطمني على صحتك خلال الحمل
            </p>
            <button 
              onClick={handleScrollDown}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-10000 ease-in-out transform hover:scale-105 shadow-lg"
            >
              ابدئي الآن
            </button>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg relative z-10">
        <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
          <BrainCircuit className="" size={32} />
          اعرفي أكثر
        </h2>
        <p className="text-xl font-medium leading-relaxed text-gray-700 mb-6">
إحنا طورنا النماذج دي من خلال تحليل بيانات
          <span className="font-bold text-pink-600"> 3.5 مليون أم</span>.
          تم بناؤها بالكامل من الصفر بهدف
          الاطمئنان على صحة الحمل وتقديم تحليلات دقيقة
          لمساعدتك في جوانب متعددة من رحلة الحمل.
        </p>
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <Image
            src={Slogan}
            alt="Cog image"
            className="w-full object-contain transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
