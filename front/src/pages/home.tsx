import "../index.css";
import Review from "../pages/reviews";
import Footer from "../components/Footer";
import Ready from "../components/Ready";
import CTA from "../components/CTA";
import Brands from "../components/Brands";
import Carrousel from "../components/Carrousel";

const Home = () => {
  return (
    <div className="bg-blanco_300">
      <div className="relative w-full mx-auto min-h-[400px]">
        <Carrousel />
      </div>
      <section id="ready">
        <Ready />
      </section>
      <section id="brands">
        <Brands />
      </section>
      <section id="reviews">
        <Review />
      </section>
      <section id="cta">
        <CTA />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
