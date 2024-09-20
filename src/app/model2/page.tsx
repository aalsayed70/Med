'use client'
import React, { useState } from 'react';
import { UserCheck, Ruler, Weight, Activity } from 'lucide-react';
import { Header } from "@/sections/Header"; 
import axios from 'axios';
import { TypeAnimation } from 'react-type-animation';
import Footer from '@/sections/Footer';
interface FormData {
  height_cm: string;
  weight_before_kg: string;
  current_weight_kg: string;
  week_of_pregnancy: number;
  is_twins: string;
}

interface Prediction {
  weeks: string[];
  upper_bounds: number[];
  lower_bounds: number[];
  comment: string;
}

const Model2: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    height_cm: '',
    weight_before_kg: '',
    current_weight_kg: '',
    week_of_pregnancy: NaN,
    is_twins: 'no'
  });
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
  
    // Convert string values to numbers
    const formDataToSend = {
      ...formData,
      height_cm: parseFloat(formData.height_cm),
      weight_before_kg: parseFloat(formData.weight_before_kg),
      current_weight_kg: parseFloat(formData.current_weight_kg),
      week_of_pregnancy: formData.week_of_pregnancy,
      is_twins: formData.is_twins
    };
  
    try {
      setLoading(true);
      const response = await axios.post('https://drnasserfarahat.com/predict2', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
  
      setTimeout(() => {
        setPrediction({
          weeks: data.weeks,
          upper_bounds: data.upper_bound,
          lower_bounds: data.lower_bound,
          comment: data.comment
        });
        setLoading(false); // End loading after showing the result
      }, 3000); // Adjust the delay time as per your needs
    } catch (err) {
      setError('حدث خطأ أثناء معالجة الطلب. حاول مرة أخرى.');
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };
  
  

  return (
    <>
    <div >
      <Header />
      <div className="container mx-auto p-8 bg-gray-100 rounded-3xl shadow-md mt-8 max-w-4xl" dir="rtl">
        <h2 className="text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-500 via-pink-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide py-8 px-6 text-center">
          تابعي وزنك في الحمل
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="font-medium text-pink-400 flex items-center text-lg">
                <Ruler className="ml-3 text-yellow-400" /> الطول (سم)
              </label>
              <input
                type="number"
                name="height_cm"
                value={formData.height_cm}
                onChange={handleChange}
                className="w-full text-pink-400 placeholder-pink-400 p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-pink-300 to-yellow-200 text-lg"
                placeholder="أدخل الطول بالسنتمتر"
                required
                min="0"
              />
            </div>
  
            <div className="space-y-4">
              <label className="font-medium text-pink-400 flex items-center text-lg">
                <Weight className="ml-3 text-yellow-400" /> الوزن قبل الحمل (كغ)
              </label>
              <input
                type="number"
                name="weight_before_kg"
                value={formData.weight_before_kg}
                onChange={handleChange}
                placeholder="أدخل الوزن قبل الحمل"
                className="w-full text-pink-400 placeholder-pink-400 p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-pink-300 to-yellow-200 text-lg"
                required
                min="0"
                step="0.01"
              />
            </div>
  
            <div className="space-y-4">
              <label className="font-medium text-pink-400 flex items-center text-lg">
                <Weight className="ml-3 text-yellow-400" /> وزنك الحالي (كغ)
              </label>
              <input
                type="number"
                name="current_weight_kg"
                value={formData.current_weight_kg}
                onChange={handleChange}
                placeholder="أدخل وزنك الحالي"
                className="w-full text-pink-400 placeholder-pink-400 p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-pink-300 to-yellow-200 text-lg"
                required
                min="0"
                step="0.01"
              />
            </div>
  
            <div className="space-y-4">
              <label className="font-medium text-pink-400 flex items-center text-lg">
                <UserCheck className="ml-3 text-yellow-400" /> انت حامل في الأسبوع الكام؟
              </label>
              <input
                type="number"
                name="week_of_pregnancy"
                value={formData.week_of_pregnancy}
                onChange={handleChange}
                placeholder="أدخلي أسبوع الحمل الحالي"
                className="w-full text-pink-400 placeholder-pink-400 p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-pink-300 to-yellow-200 text-lg"
                required
                min="0"
                max="40"
              />
            </div>
          </div>
  
          <div className="bg-gradient-to-r from-pink-300 to-yellow-200 shadow-md rounded-lg p-8 max-w-lg mx-auto">
            <div className="space-y-6">
              <label className="flex items-center text-xl font-semibold text-pink-400">
                <Activity className="text-yellow-500 ml-3" size={28} />
                توأم؟
              </label>
              <div className="flex items-center justify-center space-x-12 rtl:space-x-reverse">
                <label className="flex items-center cursor-pointer space-x-3 rtl:space-x-reverse">
                  <input
                    type="radio"
                    name="is_twins"
                    value="1"
                    checked={formData.is_twins === "1"}
                    onChange={handleChange}
                    required
                    className="sr-only"
                  />
                  <div className="w-10 h-10 border-2 border-pink-400 rounded-full flex items-center justify-center">
                    {formData.is_twins === "1" && (
                      <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 text-lg">نعم</span>
                </label>
                <label className="flex items-center cursor-pointer space-x-3 rtl:space-x-reverse">
                  <input
                    type="radio"
                    name="is_twins"
                    value="0"
                    checked={formData.is_twins === "0"}
                    onChange={handleChange}
                    required
                    className="sr-only"
                  />
                  <div className="w-10 h-10 border-2 border-pink-400 rounded-full flex items-center justify-center">
                    {formData.is_twins === "0" && (
                      <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700 text-lg">لا</span>
                </label>
              </div>
            </div>
          </div>
  
          <button
  type="submit"
  className="w-full bg-gradient-to-r from-yellow-500 via-pink-400 to-pink-300 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 relative overflow-hidden group"
>
  <span className="absolute inset-0 w-full h-full bg-white mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out"></span>
  <span className="relative flex items-center justify-center z-10">
    {loading ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-8 animate-bounce"
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
          <div className="py-6">
            <p className="text-red-500 font-bold text-center text-lg">{error}</p>
          </div>
        )}
        {loading && (
          <div className="py-6 flex justify-center">
            <div className="relative flex items-center justify-center w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-8 border-t-transparent border-yellow-500 border-solid rounded-full animate-spin border-t-4"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
{prediction && prediction.lower_bounds && prediction.upper_bounds && (
  <div className="py-6 px-4 bg-white rounded-lg shadow-md mt-5">
    <h3 className="text-2xl font-semibold text-pink-600 mb-6 text-center">النطاق الصحي للوزن</h3>
    <div className="flex flex-col items-center">
      {/* Range bar */}
      <div className="relative w-full h-4 rounded-full bg-gradient-to-r from-green-300 to-green-500 mb-4 ">
        {/* Conditional marker */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full ${parseFloat(formData.current_weight_kg) <= prediction.upper_bounds[formData.week_of_pregnancy] && 
              parseFloat(formData.current_weight_kg) >= prediction.lower_bounds[formData.week_of_pregnancy] ? 'bg-green-600' : 'bg-red-600'}`} 
          style={{
            left: `${
              Math.max(Math.min(
                (-parseFloat(formData.current_weight_kg) + prediction.upper_bounds[formData.week_of_pregnancy]) / 
                (prediction.upper_bounds[formData.week_of_pregnancy] - prediction.lower_bounds[formData.week_of_pregnancy]) * 100, 
                98
              ),0)
            }%`,
          }}
        />
      </div>
      <div className="flex justify-between w-full text-gray-800 mb-5">
        <p className="text-sm font-medium">
          {prediction.lower_bounds[formData.week_of_pregnancy]} كغ
        </p>
        <p className="text-sm font-medium">
          {prediction.upper_bounds[formData.week_of_pregnancy]} كغ
        </p>
      </div>

      {parseFloat(formData.current_weight_kg) < prediction.lower_bounds[formData.week_of_pregnancy] || parseFloat(formData.current_weight_kg) > prediction.upper_bounds[formData.week_of_pregnancy] ? (
          <p className="font-semibold text-pink-600 text-center mb-3">
           مدى ابتعاد وزنك الحالي عن الوزن الصحي
         </p>
      ) : null}
      {parseFloat(formData.current_weight_kg) < prediction.lower_bounds[formData.week_of_pregnancy] || parseFloat(formData.current_weight_kg) > prediction.upper_bounds[formData.week_of_pregnancy] ? (
        <div className="relative w-full h-4 rounded-full bg-red-200 mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
            style={{
              width: `${
                Math.min(
                  100 * (1 - Math.exp(-0.15 * Math.abs(parseFloat(formData.current_weight_kg) - 
                    (parseFloat(formData.current_weight_kg) > prediction.upper_bounds[formData.week_of_pregnancy] 
                      ? prediction.upper_bounds[formData.week_of_pregnancy] 
                      : prediction.lower_bounds[formData.week_of_pregnancy])
                  ))), 99) // Cap at 99% to ensure it never reaches 100%
              }%`,
            }}
          />
        </div>
      ) : null}
{prediction.comment && (
        <div className="p-4 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
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
      </div>
      <div className='mt-24'>
      <Footer/>
      </div>
    </>
  );
};

export default Model2;
