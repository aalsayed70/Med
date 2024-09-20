'use client';
import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import { Header } from "@/sections/Header"; 
import { AlignJustify, Baby, UserCheck, Activity, Heart, Ruler, Weight } from 'lucide-react';
import Footer from '@/sections/Footer';
import { TypeAnimation } from 'react-type-animation';

interface FormData {
  age: string;
  prePregDiabetes: string;
  prePregHypertension: string;
  numPrevCesarean: string;
  height: string;
  weight: string;
}

interface Prediction {
  normal_delivery_percentage: number;
  c_section_percentage: number;
  comment: string
}

const Mode1: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    prePregDiabetes: '',
    prePregHypertension: '',
    numPrevCesarean: '',
    height: '',
    weight: ''
  });
 const [prediction, setPrediction] = useState<Prediction | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
  
const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prevData => ({ ...prevData, [name]: value }));
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setPrediction(null);

  setTimeout(async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        age: formData.age,
        prePregDiabetes: formData.prePregDiabetes,
        prePregHypertension: formData.prePregHypertension,
        numPrevCesarean: formData.numPrevCesarean,
        heightClass: formData.height,
        weightClass: formData.weight,
      }, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      setPrediction(response.data);
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  }, 3000);
};



  return (
    <>
    <Header/>
    <div className="container mx-auto p-4 bg-gray-100 rounded-3xl shadow-md mt-6" dir="rtl">
    <h2 className="text-xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide py-6 px-4 text-center">
  توقعي نوع الولادة بالذكاء الإصطناعي
</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
          <label className="font-medium items-center text-pink-400">
            <UserCheck className="mr-2 ml-2 text-blue-400" />  عمر الأم؟
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2  rounded bg-gradient-to-r from-blue-400 to-pink-300 text-white bg-pink-300"
          >
            <option value=""> إختاري عمرك</option>
            {[
              { value: '3', label: '17-24' },
              { value: '4', label: '25-29' },
              { value: '5', label: '30-34' },
              { value: '6', label: '35-39' },
              { value: '7', label: '40-44' },
              { value: '8', label: '45-49' },
            ].map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="bg-gradient-to-tr from-purple-400 to-pink-300 shadow-lg rounded-xl p-8 max-w-md mx-auto">
  <div className="space-y-6">
    <label className="flex items-center text-md font-bold text-white">
      <Activity className="text-purple-400 ml-2" size={40} />
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
            name="prePregDiabetes"
            value={option.value}
            checked={formData.prePregDiabetes === option.value}
            onChange={handleChange}
            required
            className="sr-only peer"
          />
          <div className="flex items-center justify-center h-12 bg-white border-2 border-pink-400 rounded-full cursor-pointer transition-all duration-200 peer-checked:bg-purple-400 peer-checked:border-pink-600 hover:bg-pink-100">
            <span className="text-lg text-gray-800 peer-checked:text-white font-medium">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  </div>
</div>
    <div className="bg-gradient-to-tr from-purple-400 to-pink-300 shadow-lg rounded-xl p-8 max-w-md mx-auto">
  <div className="space-y-6">
    <label className="flex items-center text-md font-bold text-white">
      <Activity className="text-purple-400 ml-2" size={40} />
      هل كان عندك إرتفاع في ضغط الدم قبل الحمل؟
      </label>
    <div className="flex flex-row-reverse justify-center space-x-4 space-x-reverse">
      {[
        { label: 'نعم', value: '1' },
        { label: 'لا', value: '0' }
      ].map((option, index) => (
        <label key={index} className="flex-1">
          <input
            type="radio"
            name="prePregHypertension"
            value={option.value}
            checked={formData.prePregHypertension === option.value}
            onChange={handleChange}
            required
            className="sr-only peer"
          />
          <div className="flex items-center justify-center h-12 bg-white border-2 border-pink-400 rounded-full cursor-pointer transition-all duration-200 peer-checked:bg-purple-400 peer-checked:border-pink-600 hover:bg-pink-100">
            <span className="text-lg text-gray-800 peer-checked:text-white font-medium">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  </div>
</div>
        <div className="space-y-2">
          <label className="font-medium items-center text-pink-400">
            <UserCheck className="mr-2 ml-2 text-blue-400" />  عدد القيصريات السابقه
          </label>
          <select
            name="numPrevCesarean"
            value={formData.numPrevCesarean}
            onChange={handleChange}
            required
            className="w-full p-2   rounded bg-gradient-to-r from-blue-400 to-pink-300 text-white bg-pink-300"
          >
            <option value="">إختاري العدد</option>
            {[
              { value: '0', label: '0' },
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              
            ].map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}server/server
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-medium items-center text-pink-400">
            <Ruler className="mr-2 ml-2 text-blue-400" /> فئة الطول
          </label>
          <select
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            className="w-full p-2   rounded bg-gradient-to-r from-blue-400 to-pink-300 text-white bg-pink-300"
          >
            <option value="">اختر فئة الطول</option>
            {[
              { value: '1', label: '130-150 سم' },
              { value: '2', label: '151-180 سم' },
              { value: '3', label: 'أكثر من 180 سم' },
            ].map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className=" font-medium items-center text-pink-400">
            <Weight className="mr-2 ml-2 text-blue-400" /> فئة الوزن
          </label>
          <select
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full p-2   rounded bg-gradient-to-r from-blue-400 to-pink-300 text-white bg-pink-300"
          >
            <option value="">اختر فئة الوزن</option>
            {[
              { value: '1', label: '30-50 كجم' },
              { value: '2', label: '51-70 كجم' },
              { value: '3', label: '71-90 كجم' },
              { value: '4', label: 'أكثر من 90 كجم' },
            ].map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button
  type="submit"
  className="w-full bg-gradient-to-r from-pink-500 via-pink-300 to-blue-300 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 relative overflow-hidden group"
>
  <span className="absolute inset-0 w-full h-full bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out"></span>
  <span className="relative flex items-center justify-center z-10">
    {loading ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
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
{error && (
          <div className="py-4">
            <p className="text-red-500 font-bold text-center">{error}</p>
          </div>
        )}
      {loading && (
        <div className="py-4 flex justify-center ">
          <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-8 border-t-transparent border-blue-300 border-solid rounded-full animate-spin border-t-4"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12  bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}



{prediction && (
  <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-200">
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">الولادة الطبيعية</span>
          <span className="text-sm font-semibold text-purple-700">{prediction.normal_delivery_percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-300 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${prediction.normal_delivery_percentage}%` }}
          ></div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">الولادة القيصرية</span>
          <span className="text-sm font-semibold text-pink-700">{prediction.c_section_percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-red-500 to-red-300 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${prediction.c_section_percentage}%` }}
          ></div>
        </div>
      </div>

      {prediction.comment && (
        <div className="mt-4 p-4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <svg
              className="w-8 h-8 text-pink-400 ml-64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="w-full max-w-2xl">
              <TypeAnimation
                sequence={[
                  prediction.comment,
                  1000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={0}
                speed={70}
                className="text-gray-800 text-right text-lg leading-relaxed font-medium block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)}
    </div>
    <Footer/>
    </>
  );
};

export default Mode1;
