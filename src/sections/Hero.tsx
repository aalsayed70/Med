"use client";
import { TypeAnimation } from 'react-type-animation';

import Slogan from "@/assets/slogan.png"
import Image  from 'next/image';

export const Hero = () => {
  return (
    <section
      dir="rtl"
      className="relative  flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50"
    >
      <div className="w-full max-w-3xl px-0 py-10">
        <div className="text-center">
          <div className="text-2xl inline-flex border-2 border-blue-400 py-1 px-4 rounded-full tracking-wide text-blue-600 font-semibold mb-3 transition-all hover:bg-blue-50">
            مركز
          </div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 text-transparent bg-clip-text py-1 mb-5">
            د. ناصر فرحات
          </h1>
          <div className="text-3xl flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-0">
            <span className="font-semibold text-gray-700 md:ml-3">استشاري اول</span>
            <span className="text-pink-600 text-3xl flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-0 font-bold h-10"> 
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
                cursor={false}
                repeat={Infinity}
              />
            </span>
          </div>
        </div>
        <Image
      src={Slogan}
      alt="Cog image"
      className="w-full object-contain relative z-10"
    />
      </div>
    </section>
  );
};
