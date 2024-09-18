'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Header } from "@/sections/Header";
import { UserCheck, Activity, Heart, Ruler, Weight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormData {
    age: string;
    height: string;
    weight: string;
    pre_diab : string;
  }

interface Prediction {
  risk: number;
  comment: string;
}

const Page: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      age: '',
      height: '',
      weight: '',
      pre_diab : '',
    });
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
        try {
            const payload = {
              age : formData.age,
              height: parseFloat(formData.height), // Ensure height is passed as a float
              weight: parseFloat(formData.weight), // Ensure weight is passed as a float
              pre_diab: formData.pre_diab,
              
            };
      
            console.log("Sending payload:", payload);  // Debug the payload
      
            const response = await axios.post('https://13.51.157.80:5000/predict4', payload, {
              headers: {
                'Content-Type': 'application/json'
              }
            });

        setPrediction(response.data);
      } catch (error) {
        console.error('Error making prediction:', error);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 bg-gray-100 rounded-3xl shadow-md mt-6" dir="rtl">
        <h2 className="text-xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide py-6 px-4 text-center">
            خطورة الإصابه بمرض ضغط الحمل بالذكاء الإصطناعي
        </h2>

        
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
          <label className="font-medium items-center text-orange-400">
            <UserCheck className="mr-2 ml-2 text-pink-300" />  عمر الأم؟
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2  rounded bg-gradient-to-r from-yellow-400 to-pink-300 text-white bg-pink-300"
          >
            <option value=""> إختاري عمرك</option>
            {[
              { value: '3', label: '17-24' },
              { value: '4', label: '25-29' },
              { value: '5', label: '30-34' },
              { value: '6', label: '35-39' },
              
            ].map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

          <div className="space-y-2">
  <label className="font-medium items-center text-orange-400">
    <Ruler className="mr-2 ml-2 text-pink-300" /> الطول (بالسنتيمتر)
  </label>
  <input
    type="number"
    name="height"
    value={formData.height}
    onChange={handleChange}
    required
    placeholder="أدخل الطول (سم)"
    className="w-full p-2  rounded bg-gradient-to-r from-yellow-400 to-pink-300 text-white bg-pink-300"
  />
</div>

<div className="space-y-2">
  <label className="font-medium items-center text-orange-400">
    <Weight className="mr-2 ml-2 text-pink-300" /> الوزن (بالكيلوجرام)
  </label>
  <input
    type="number"
    name="weight"
    value={formData.weight}
    onChange={handleChange}
    required
    placeholder="أدخل الوزن (كجم)"
    className="w-full p-2  rounded bg-gradient-to-r from-yellow-400 to-pink-300 text-white bg-pink-300"
  />
</div>


<div className="bg-gradient-to-tr from-yellow-400 to-pink-400 shadow-lg rounded-xl p-8 max-w-md mx-auto">
  <div className="space-y-6">
    <label className="flex items-center text-md font-bold text-white">
      <Activity className="text-yellow-400 ml-2" size={40} />
      هل كان عندك سكر قبل الحمل؟ 
           </label>
    <div className="flex flex-row-reverse justify-center space-x-4 space-x-reverse">
      {[
        { label: 'نعم', value: '1' },
        { label: 'لا', value: '0' }
      ].map((option, index) => (
        <label key={index} className="flex-1">
          <input
            type="radio"
            name="pre_diab"
            value={option.value}
            checked={formData.pre_diab === option.value}
            onChange={handleChange}
            required
            className="sr-only peer"
          />
          <div className="flex items-center justify-center h-12 bg-white border-2 border-pink-400 rounded-full cursor-pointer transition-all duration-200 peer-checked:bg-orange-300 peer-checked:border-pink-600 hover:bg-pink-100">
            <span className="text-lg text-gray-800 peer-checked:text-white font-medium">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  </div>
</div>
        
        
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-600 via-pink-500 to-pink-400 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 relative overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out"></span>
            <span className="relative flex items-center justify-center z-10">
              {loading ? (
                <span>تحميل...</span>
              ) : (
                <>
                  <span className="mr-2"></span>
                  الحصول على النتيجة
                  <span className="ml-2">✨</span>
                </>
              )}
            </span>
          </button>
        </form>

        {loading && (
          <div className="py-4 flex justify-center ">
            <div className="relative flex items-center justify-center w-20 h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-8 border-t-transparent border-blue-500 border-solid rounded-full animate-spin border-t-4"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

{prediction && (
  <motion.div 
    className="mt-6 bg-white p-4 rounded-lg shadow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    key={prediction.risk} // This key prop will force a re-render and restart animations when prediction changes
  >
    {/* Display prediction number above the circle */}
    <motion.div 
      className="flex justify-center mb-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <span
        className={`text-2xl font-semibold text-white px-4 py-2 rounded-2xl shadow-lg 
        ${prediction.risk <= 1 
          ? 'bg-gradient-to-br from-green-400 to-green-600' 
          : prediction.risk <= 3 
          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
          : 'bg-gradient-to-br from-red-400 to-red-600'} 
        `}
        style={{
          boxShadow: `0 4px 15px ${
            prediction.risk <= 1 ? 'rgba(72, 187, 120, 0.8)' 
            : prediction.risk <= 3 ? 'rgba(240, 180, 82, 0.8)' 
            : 'rgba(240, 82, 82, 0.8)'
          }`,
          transition: 'box-shadow 0.3s ease, background 0.3s ease'
        }}
      >
        {prediction.risk}
      </span>
    </motion.div>

    {/* Labels for Low, Medium, High */}
    <div className="flex justify-between mt-2">
      {['0-1 (Low)', '2-3 (Medium)', '4-5 (High)'].map((label, index) => (
        <motion.span 
          key={label}
          className={`text-sm font-medium text-white px-4 py-2 rounded-2xl shadow-lg
            ${index === 0 ? 'bg-gradient-to-br from-green-400 to-green-600' : 
              index === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
              'bg-gradient-to-br from-red-400 to-red-600'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
        >
          {label}
        </motion.span>
      ))}
    </div>

    {/* Circle representing risk with dynamic fill and glowing effect */}
    <div className="flex justify-center">
      <div className="relative w-40 h-40">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="#e0e0e0" />
          {/* Foreground circle with dynamic gradient and glowing effect */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#circleGradient)"
            style={{
              clipPath: `circle(${(prediction.risk / 5) * 50}% at 50% 50%)`, // Adjust the circle size dynamically based on risk
              transition: 'clip-path 0.5s ease',
              filter: `drop-shadow(0 0 15px ${
                prediction.risk <= 2 ? 'rgba(72, 187, 120, 0.8)' // Green glow for low risk
                : prediction.risk <= 5 ? 'rgba(240, 180, 82, 0.8)' // Yellow glow for medium risk
                : 'rgba(240, 82, 82, 0.8)' // Red glow for high risk
              })`
            }}
          />
          <defs>
            <linearGradient id="circleGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor={prediction.risk <= 1 ? "#b3ffb3" : prediction.risk <= 3 ? "#fff5b3" : "#ffb3b3"} /> {/* Lighter Green, Yellow, Red */}
              <stop offset="100%" stopColor={prediction.risk <= 1 ? "#4caf50" : prediction.risk <= 3 ? "#ffcc00" : "#f44336"} /> {/* Darker Green, Yellow, Red */}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>


    
    <defs>
      <linearGradient id="circleGradient" gradientTransform="rotate(90)">
        <stop offset="0%" stopColor={prediction.risk <= 1 ? "#4ade80" : prediction.risk <= 3 ? "#fcd34d" : "#f87171"} />
        <stop offset="100%" stopColor={prediction.risk <= 1 ? "#22c55e" : prediction.risk <= 3 ? "#f59e0b" : "#ef4444"} />
      </linearGradient>
    </defs>
    {prediction.comment && (
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-lg shadow-md">
          <div className="relative">
            <div className="absolute -top-5 right-5 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-800 text-right text-lg leading-relaxed pt-6 font-medium" dir="rtl">{prediction.comment}</p>
          </div>
        </div>
      )}
  </motion.div>
  
)}
      </div>
    </>
  );
};

export default Page;
