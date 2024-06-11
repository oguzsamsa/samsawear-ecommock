import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "SUMMER 2024",
    headline: "NEW COLLECTION",
    description:
      "We know how large objects will act, but things on a small scale.",
    imgSrc: "./../../assets/homepage/homepage-header-mobile-hero.png",
  },
  // Daha fazla slide buraya ekleyebilirsiniz
  {
    id: 2,
    title: "AUTUMN 2024",
    headline: "NEW ARRIVALS",
    description: "Discover the latest trends and styles for the autumn season.",
    imgSrc: "./../../assets/homepage/homepage-header-mobile-hero.png",
  },
];

const HomePageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative max-md:overflow-hidden w-11/12 lg:w-[87%] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] h-[700px] md:h-[619px] mx-auto rounded-xl mt-6 flex flex-col md:flex-row md:items-center pt-12 md:pt-0">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`flex flex-col text-center items-center md:items-start md:text-start md:w-full md:pl-12 md:-mt-16  gap-6 ${
            index === currentSlide ? "block" : "hidden"
          }`}
        >
          <p className="font-bold text-base text-[#2A7CC7]">{slide.title}</p>
          <h1 className="font-bold text-[40px] md:text-[58px] text-[#252B42] md:w-full leading-tight">
            {slide.headline}
          </h1>
          <p className="text-base md:text-xl leading-normal text-[#737373]">
            {slide.description}
          </p>
          <button className="font-bold text-2xl bg-[#23A6F0] text-white px-6 py-3 rounded">
            SHOP NOW
          </button>
        </div>
      ))}
      <img
        src={slides[currentSlide].imgSrc}
        alt=""
        className="w-full absolute -bottom-8 max-md:-left-8 z-10 md:-right-10 lg:-right-20 md:bottom-0 md:w-1/2 lg:w-1/2"
      />
      <div className="w-[47px] h-[47px] md:h-16 md:w-16 lg:w-[80px] lg:h-[80px] rounded-full bg-white absolute max-md:bottom-60 md:bottom-44 md:right-72 lg:top-0 lg:right-[470px]"></div>
      <div className="w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] rounded-full bg-white absolute max-md:bottom-[47px] max-md:left-[37px] md:right-5 md:bottom-10 lg:-right-3 lg:-top-3"></div>
      <div className="w-[18px] h-[18px] lg:w-[31px] md:w-6 md:h-6 lg:h-[31px] rounded-full bg-white absolute max-md:bottom-[160px] max-md:right-[40px] md:-right-4 md:bottom-44 lg:-right-[23px] lg:top-[280px] z-20"></div>
      <div className="w-[9px] lg:w-[15px] lg:h-[15px] h-[9px] md:w-3 md:h-3 rounded-full bg-[#977DF4] absolute max-md:bottom-[259px] max-md:right-[26px] md:right-6 lg:-right-[47px] lg:top-[113px]"></div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#23A6F0] text-white p-2 rounded-full z-20"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#23A6F0] text-white p-2 rounded-full z-20"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-[#23A6F0]" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePageSlider;
