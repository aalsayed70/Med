"use client";


export const ModelNames = () => {
  const texts = [
    "توقع نوع الولاده",
    "زيادة الوزن في الحمل",
    "خطر الإصابه بضغط الحمل",
    "خطر الإصابه بسكر الحمل"
  ];

  // Repeat the texts to ensure a long enough content for seamless scrolling
  const repeatedTexts = [...texts, ...texts, ...texts,...texts, ...texts, ...texts,...texts, ...texts, ...texts,...texts, ...texts, ...texts,...texts, ...texts, ...texts,...texts, ...texts, ...texts];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient mask for smooth fade effect */}
      <div className="" />
      <div className="absolute top--0 left-0 w-full h-1 bg-purple-300 " />
      {/* Scrolling content */}
      <div className="relative flex overflow-hidden pt-4 pb-4">
        <div className="flex animate-scroll">
          {/* Map over repeated texts */}
          {repeatedTexts.map((text, index) => (
            <p key={index} className="mr-6 whitespace-nowrap text-pink-400 text-shadow" >{text}</p>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-300" />      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 200s linear infinite;
        }
          .text-shadow {
        text-shadow: 0 0 4px rgba(255, 200, 147, 0.6), 0 0 8px rgba(255, 20, 150, 0.4);
      }

      `}</style>
    </div>
  );
};

