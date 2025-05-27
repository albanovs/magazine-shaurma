import React, { useState, useEffect } from "react";
import Button from "../ui/button";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    {
      title: "НЕПОВТОРИМАЯ ШАУРМА",
      subtitle: "НА УГЛЯХ",
      bgImageDesktop: "/images/snapedit_1747988547002.jpg",
      bgImageMobile: "/images/mobile1.png",
      textColor: "text-white"
    },
    {
      title: "БЕСПЛАТНАЯ ДОСТАВКА",
      subtitle: "ДОСТАВКА ОТ 1500 РУБЛЕЙ",
      bgImageDesktop: "/images/snapedit_1747988738802.jpg",
      bgImageMobile: "/images/snapedit_1747988547002.jpg",
      textColor: "text-white"
    },
    {
      title: "СОЧНОЕ МЯСО",
      subtitle: "НА МАНГАЛЕ",
      bgImageDesktop: "/images/snapedit_1747988642717.jpg",
      bgImageMobile: "/images/mobile2.png",
      textColor: "text-white"
    },
    {
      title: "ПРИНИМАЕМ ЗАКАЗЫ",
      subtitle: "НА ПРАЗДНИКИ И КОРПОРАТИВЫ",
      bgImageDesktop: "/images/snapedit_1747988454367.jpg",
      bgImageMobile: "/images/mobile3.png",
      textColor: "text-white"
    }
  ];

  const currentBgImage = (slide) => (isMobile ? slide.bgImageMobile : slide.bgImageDesktop);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (distance < -50) setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="mb-20">
      <div className="relative h-[400px] md:h-[554px] overflow-hidden rounded-[10px] my-6 mx-4 md:mx-auto md:container">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 relative"
              style={{
                backgroundImage: `url(${currentBgImage(slide)})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full" />
                <div className="absolute top-24 right-10 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full" />
                <div className="absolute bottom-20 left-16 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full" />
                <div className="absolute bottom-24 right-8 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full" />
              </div>
              <div className={`${slide.title === "БЕСПЛАТНАЯ ДОСТАВКА" ? "flex" : "hidden"} container mx-auto px-4 py-12 md:py-16 relative z-10 h-full lg:flex items-center`}>
                <div className="w-full">
                  <div className="max-w-xl">
                    <h1 className={`text-2xl md:text-5xl font-bold ${slide.textColor} mb-3 md:mb-4`}>
                      {slide.title}
                    </h1>
                    <div className="bg-red-500 text-white px-3 md:px-6 py-1.5 md:py-3 rounded-lg inline-block mb-5 md:mb-6 text-xl md:text-4xl font-bold shadow-md">
                      {slide.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-[2px] transition-all ${currentSlide === index
                ? 'bg-yellow-400 w-6 scale-110'
                : 'bg-[#364A5E] bg-opacity-50 hover:bg-opacity-75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
