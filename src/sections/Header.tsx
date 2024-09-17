"use client"
import React, { useState } from 'react';
import Res from "@/assets/res.svg";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { X } from 'lucide-react';
import './BoxStyle.css'; 
import Link from 'next/link';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header dir="rtl" className="sticky top-0 z-40 bg-white/80 shadow-lg">
  <div className="flex flex-col items-center py-2">
    
    {/* Contact Bar */}
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-pink-500 to-purple-500 py-1 px-10 rounded-full shadow-md max-w-fit mx-auto md:px-20 md:py-5">
      <div className="flex items-center gap-2 ml-3 text-sm">
        <Res className="h-4 w-4 inline-flex justify-center items-center" />
        <p className="font-medium">للحجز و الاستعلام</p>
      </div>
      <div className="flex flex-col md:flex-row gap-1 items-center text-xs">
        <p className="px-2 py-0.5 bg-pink-400 bg-blend-color-burn rounded-lg font-bold shadow-md">01015877170</p>
        <p className="px-2 py-0.5 bg-pink-400 bg-blend-color-burn rounded-lg font-bold shadow-md">01094532374</p>
      </div>
    </div>

    {/* Main Header */}
    <div className="w-full flex items-center justify-between px-4 md:px-8 md:hidden">
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        {isMenuOpen ? (
          <X className="h-7 w-7 mr-3 cursor-pointer text-pink-500 hover:text-pink-700 transition duration-300 " onClick={toggleMenu} />
        ) : (
          <MenuIcon className="h-7 w-7 mr-3 cursor-pointer text-pink-500 hover:text-pink-700 transition duration-300" onClick={toggleMenu} />
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={`
      ${isMenuOpen ? 'open' : ''} 
      header-menu md:flex flex-col md:flex-row items-center justify-center 
      w-full md:w-auto absolute md:relative top-full left-0 
      bg-gradient-to-r from-pink-100 to-blue-100 md:bg-transparent 
      backdrop-blur-md transition duration-300 shadow-lg md:shadow-none 
      rounded-b-2xl md:rounded-none
    `}>
      <div className="flex flex-col md:flex-row gap-6 px-8 py-6 md:py-0 ml-4">
        <a href="/" className="menu-item text-lg font-semibold text-pink-600 hover:text-purple-500 transition duration-300 transform hover:scale-105">الرئيسيه</a>
        <a href="/model1" className="menu-item text-lg font-semibold text-pink-600 hover:text-purple-500 transition duration-300 transform hover:scale-105">توقع نوع الولاده</a>
        <a href="/model2" className="menu-item text-lg font-semibold text-pink-600 hover:text-purple-500 transition duration-300 transform hover:scale-105">تابعي وزنك في الحمل</a>
        <a href="/model3" className="menu-item text-lg font-semibold text-pink-600 hover:text-purple-500 transition duration-300 transform hover:scale-105">خطر الإصابة بسكر الحمل</a>
        <a href="/model4" className="menu-item text-lg font-semibold text-purple-400 hover:text-purple-500 transition duration-300 transform hover:scale-105">خطر الإصابة بضغط الحمل</a>
      </div>
    </nav>

      {/* Logo */}
      <Image
        src={Logo}
        alt="Saas Logo"
        height={60}
        width={60}
        className="px-2 rounded-full bg-white shadow-md"
      />
    </div>
  </div>
</header>


  );
};