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

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransform);
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
    <div>
      <section className="min-h-screen w-screen bg-black pb-10">
        <div className="container mx-auto px-3 md:px-10">
          <div className="px-10 pt-40 pb-10">
            <p className="font-circular-web text-lg text-blue-100">INTO THE WORLD OF VERDANT</p>
            <p className="max-w-md font-circular-web text-lg text-blue-100 opacity-50 mt-2">
              jdhfksldfjlvicjkn,zdnv lklaksfjl kfjjlsdkncmcvkldvnlkscm lkfsdk nlkasjn kjsajfkasdlk jdnflakfdbd fkalfjkfnlaskfjsfjsdhfgkds kdsf jkh ksf hkfhdsfdh k
            </p>
          </div>

          <div className="grid h-[150vh] grid-cols-2 grid-rows-3 gap-7">
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 z-10">
              <BentoCards
                src="https://images.unsplash.com/photo-1692449145311-5c8bbd63f87e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFncmljdWx0dXJlJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww"
                title={<>jdskjmdfv</>}
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
              <BentoCards
                src="https://images.unsplash.com/photo-1542365775-6e6177a8e296?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFncmljdWx0dXJlJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww"
                title={<>jdskjmdfv</>}
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
              <BentoCards
                src="https://images.unsplash.com/photo-1622940000668-6c6bd414ec1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFncmljdWx0dXJlJTIwZWR1Y2F0aW9ufGVufDB8fDB8fHww"
                title={<>jdskjmdfv</>}
              />
            </BentoTilt>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-4 md:px-10">
  {/* Swiper Slider Section */}
  <div className="w-full flex justify-center">
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      autoplay={{ delay: 3000 }}
      className="w-full max-w-md"
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

  {/* Paragraph/Content Section */}
  <div className="text-white space-y-4 px-4 max-w-xl">
    <h2 className="text-3xl font-bold">VERDANT</h2>
    <p className="text-blue-100 opacity-80">
      Verdant is where agriculture meets innovation. We bring the future of farming closer by integrating smart education, real-time analysis, and immersive visuals to empower the next generation of agricultural leaders.
    </p>
    <p className="text-blue-100 opacity-60">
      
    </p>
  </div>
</div>
          </div>
          
        </div>
        
      </section>
    </div>
  );
};

export default Feature;
