'use client'

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const GoogleMapEmbed = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 p-8 text-white rounded-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg p-8 mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">موقعنا</h2>
        <p className="text-xl text-center mb-6 leading-relaxed">
          المنوفية - بركة السبع - الشارع الرئيسي
          <br />
          شارع فرحات المقابل لمقلة الجابري
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-3xl overflow-hidden shadow-lg mb-12"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3432.9756077220736!2d31.085579!3d30.634645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM4JzA0LjciTiAzMcKwMDUnMDguMSJF!5e0!3m2!1sen!2seg!4v1726225949838!5m2!1sen!2seg"
          width="370"
          height="350"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>

      {/* Button forwarding to Google Maps destination */}
      <motion.a
        href="https://www.google.com/maps/dir/?api=1&destination=30.634645,31.085579"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-12"
      >
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-300 transform hover:scale-105 flex items-center"
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white mr-2" />
        الموقع على الخريطة
      </motion.button>

      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg p-8 mb-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">مواعيد المركز</h2>
        <p className="text-xl text-center mb-6 leading-relaxed">
          يوميا ما عدا يوم الثلاثاء والجمعة من بعد العصر بساعة حتى أذان العشاء
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="max-w-2xl w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">صفحة المركز على فيسبوك</h2>
        <p className="text-xl text-center mb-6 leading-relaxed">
          <a
            href="https://shorturl.at/rczt7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300 hover:underline"
          >
            تابعونا على فيسبوك
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default GoogleMapEmbed;
