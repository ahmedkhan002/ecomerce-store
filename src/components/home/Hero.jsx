import React, { useState } from 'react';
import hero1 from '../../images/home/Hero1.png';
import hero2 from '../../images/home/Hero2.png';

const slides = [
  { img: hero1, heading: 'SUMMER OFFER 2025 COLLECTION' },
  { img: hero2, heading: 'WINTER OFFER 2025 COLLECTION' },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((index + 1) % slides.length);

  return (
    <div className="relative group overflow-hidden">
      {/* Slides */}
      <div className="relative h-[650px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <section className="bg-[#EFE0FF] h-full flex items-center justify-center">
              <div className="grid max-w-screen-xl px-4 h-full mx-auto lg:gap-8 lg:grid-cols-12 w-full text-center lg:text-left select-none">
                <div className="lg:col-span-7 flex flex-col gap-8 items-center lg:items-start lg:ml-5 mx-auto place-self-center">
                  <p className="text-black max-sm:text-lg max-lg:text-xl lg:text-2xl font-semibold">SMART PRODUCTS</p>
                  <h1 className="text-4xl md:text-5xl xl:text-7xl font-semibold tracking-wide leading-[1.2] text-black">
                    {slide.heading}
                  </h1>
                  <button className="text-fuchsia-600 border border-fuchsia-600 hover:bg-fuchsia-600 hover:text-white text-xl py-2.5 px-8 rounded-xl">
                    Default
                  </button>
                </div>
                <div className="lg:col-span-5 flex justify-center max-lg:mt-10 !self-end">
                  <img
                    src={slide.img}
                    alt="hero visual"
                    className="w-full object-contain max-lg:max-h-[400px] max-h-[800px]"
                  />
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute select-none top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer text-fuchsia-600 text-6xl z-20"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute select-none top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer text-fuchsia-600 text-6xl z-20"
      >
        ›
      </button>
    </div>
  );
};

export default Hero;
