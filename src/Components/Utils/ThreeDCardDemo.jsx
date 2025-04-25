import Spline from '@splinetool/react-spline';

const Agri3DScene = () => {
  return (
    <div className="w-full h-[80vh] md:h-[100vh] mt-16 rounded-2xl overflow-hidden shadow-xl">
      <Spline scene="https://prod.spline.design/0ZLmnX8x3YfUz1kL/scene.splinecode" />
    </div>
  );
};

export default Agri3DScene;
