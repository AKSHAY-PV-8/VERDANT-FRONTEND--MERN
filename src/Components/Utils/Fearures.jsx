import { useRef, useState } from "react";
import BentoCards from "./BentoCars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";

const images = [
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559935384-3b5b2e7a5204?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80"
];

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeX - 0.5) * 10;
    const tiltY = (relativeY - 0.5) * -10;
    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Feature = () => {
  return (
    <section className="w-full min-h-screen bg-black pb-10 pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-10">
          <p className="text-blue-100 text-lg">INTO THE WORLD OF VERDANT</p>
          <p className="text-blue-100 opacity-50 mt-2 max-w-lg">
            Welcome to Verdant – where technology meets agriculture through interactive education and real-time data.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <BentoTilt className="row-span-1 md:row-span-2">
            <BentoCards
              src="https://images.unsplash.com/photo-1692449145311-5c8bbd63f87e?w=600&auto=format&fit=crop&q=60"
              title="Innovative Learning"
            />
          </BentoTilt>

          <BentoTilt>
            <BentoCards
              src="https://images.unsplash.com/photo-1542365775-6e6177a8e296?w=600&auto=format&fit=crop&q=60"
              title="Data Driven"
            />
          </BentoTilt>

          <BentoTilt>
            <BentoCards
              src="https://images.unsplash.com/photo-1622940000668-6c6bd414ec1c?w=600&auto=format&fit=crop&q=60"
              title="Real-World Projects"
            />
          </BentoTilt>
        </div>

        {/* Swiper + Text */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="w-full md:w-1/2 px-4">
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 3000 }}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                      <h3 className="text-white font-semibold">Featured Exam</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-white max-w-lg px-4 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">VERDANT</h2>
            <p className="text-blue-100 opacity-80">
              Verdant is where agriculture meets innovation. We bring the future of farming closer by integrating smart education, real-time analysis, and immersive visuals to empower the next generation of agricultural leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
