import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';


const BirthPredictionCard = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Trigger animation based on scroll
      transition={{ duration: 0.5 }}
      className="mt-6 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-pink-500 to-blue-300 text-white"
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-purple-400 opacity-20 rounded-full transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-pink-300 opacity-20 rounded-full transform -rotate-45"></div>
      
      <div className="relative p-8 z-10">
        <motion.h3 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold mb-6 text-right text-white shadow-text"
        >
توقع نوع الولادة
</motion.h3>
        
        <motion.p 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg mb-8 text-right leading-relaxed"
        >
نموذج ذكي بيحلل عوامل متعددة عشان يقدم توقع دقيق لاحتمالية الولادة الطبيعية أو القيصرية.
</motion.p>
        
        <motion.ul 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-md mb-10 text-right space-y-4"
        >
          {[
            "الوزن والطول",
            "عمر الأم",
            "وجود سكري أو ضغط دم سابق للحمل",
            "عدد الولادات القيصرية السابقة"
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-center justify-end bg-white bg-opacity-10 rounded-lg p-3 shadow-inner"
            >
              <span>{item}</span>
              <svg className="w-6 h-6 ml-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="/model1" className="block">
            <button className="w-full bg-pink-400 text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 transition duration-300 text-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
              استخدم النموذج الآن
            </button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Weight = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Trigger animation based on scroll
      transition={{ duration: 0.5 }}
      className="mt-6 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-400 to-pink-400 text-white"
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-pink-400 opacity-20 rounded-full transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-yellow-300 opacity-20 rounded-full transform -rotate-45"></div>
      
      <div className="relative p-8 z-10">
        <motion.h3 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold mb-6 text-right text-white shadow-text"
        >
متابعة الوزن في الحمل
</motion.h3>
        
        <motion.p 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg mb-8 text-right leading-relaxed"
        >
نموذج هيخليكي تتابعي وزنك طوال فترة الحمل و يعرفك إذا كان في نطاق الزياده الصحي ولا لأ (اسبوعياً)
</motion.p>
        
        <motion.ul 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-md mb-10 text-right space-y-4"
        >
          {[
            " الوزن الحالي",
            " الوزن قبل الحمل والطول",
            "أسبوع الحمل",
            " توأم؟"
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-center justify-end bg-white bg-opacity-10 rounded-lg p-3 shadow-inner"
            >
              <span>{item}</span>
              <svg className="w-6 h-6 ml-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="/model2" className="block">
            <button className="w-full bg-orange-400 text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 transition duration-300 text-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
              استخدم النموذج الآن
            </button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};


const Gest_diab_risk = () => {
  const ref = useRef(null); // Set up the ref
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // Track if the element is in view

  return (
    
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Trigger animation based on scroll
      transition={{ duration: 0.5 }}
      className="mt-6 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-indigo-500 to-pink-600 text-white"
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-pink-400 opacity-20 rounded-full transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-pink-300 opacity-20 rounded-full transform -rotate-45"></div>
      
      <div className="relative p-8 z-10">
        <motion.h3 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold mb-6 text-right text-white shadow-text"
        >
          خطورة الإصابة بمرض سكري الحمل
        </motion.h3>
        
        <motion.p 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg mb-8 text-right leading-relaxed"
        >
            نموذج هيساعدك تعرفي خطورة إصابتك النسبيه بسكر الحمل الحمل عشان تعرفي تحددي إذا كنتي هتحتاجي رعاية خاصه أثناء الحمل أو لأ
            </motion.p>
        
        <motion.ul 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-md mb-10 text-right space-y-4"
        >
          {[
            "الوزن والطول",
            "وجود مرض الضغط قبل الحمل",
            "عمر الأم"
            
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-center justify-end bg-white bg-opacity-10 rounded-lg p-3 shadow-inner"
            >
              <span>{item}</span>
              <svg className="w-6 h-6 ml-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="/model3" className="block">
            <button className="w-full bg-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 transition duration-300 text-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
              استخدم النموذج الآن
            </button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};



const Gest_hyper_risk = () => {
  const ref = useRef(null); // Set up the ref
  const isInView = useInView(ref, { once: false, amount: 0.3 }); // Track if the element is in view

  return (
    
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Trigger animation based on scroll
      transition={{ duration: 0.5 }}
      className="mt-6 relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-pink-600 to-yellow-300 text-white"
    >
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-pink-400 opacity-20 rounded-full transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-yellow-300 opacity-20 rounded-full transform -rotate-45"></div>
      
      <div className="relative p-8 z-10">
        <motion.h3 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold mb-6 text-right text-white shadow-text"
        >
          خطورة الإصابة بضغط الحمل
        </motion.h3>
        
        <motion.p 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg mb-8 text-right leading-relaxed"
        >
            نموذج هيساعدك تعرفي خطورة إصابتك النسبيه بمرض ضغط الحمل عشان تعرفي تحددي إذا كنتي هتحتاجي رعاية خاصه أثناء الحمل أو لأ
        </motion.p>
        
        <motion.ul 
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-md mb-10 text-right space-y-4"
        >
          {[
            "الوزن والطول",
            "عمر الأم",
            "وجود مرض السكري قبل الحمل"
          ].map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              className="flex items-center justify-end bg-white bg-opacity-10 rounded-lg p-3 shadow-inner"
            >
              <span>{item}</span>
              <svg className="w-6 h-6 ml-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="/model4" className="block">
            <button className="w-full bg-red-400 text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 transition duration-300 text-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl">
              استخدم النموذج الآن
            </button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};
const Modelss = () => {
  return (
    <div className="space-y-8 lg:space-y-0 lg:flex lg:flex-wrap lg:justify-between">
      <div className="lg:w-1/2 lg:pr-4">
        <BirthPredictionCard />
      </div>
      <div className="lg:w-1/2 lg:pl-4">
        <Weight />
      </div>
      <div className="lg:w-1/2 lg:pr-4">
        <Gest_diab_risk />
      </div>
      <div className="lg:w-1/2 lg:pl-4">
        <Gest_hyper_risk />
      </div>
    </div>
  );
};
export default Modelss;
