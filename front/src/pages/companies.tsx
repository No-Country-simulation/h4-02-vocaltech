import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Reviews from "./reviews";
import CTA from "../components/CTA";

const Companies = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100 rounded-lg md:rounded-l-none md:rounded-r-none shadow-lg h-auto md:h-[400px] overflow-hidden">
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-primary_400 lg:text-3xl">
            Transformá la Comunicación y Liderazgo empresarial con{" "}
            <span className="text-secondary_600"> VocalTech</span>
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Las empresas enfrentan desafíos que frenan su crecimiento:
            comunicación deficiente, liderazgo débil y presentaciones sin
            impacto. Las familiares carecen de cohesión, mientras que las
            innovadoras enfrentan costos altos y procesos ineficientes. La falta
            de talento validado y motivación afecta la productividad, el
            liderazgo y la proyección de marca.
          </p>
          <p className="text-md font-bold text text-primary_400 mt-2">
            Haz tu diagnóstico y lleva tu proyecto al siguiente nivel.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/diagnostic"
              className="inline-block mt-4 px-6 py-3 text-white bg-secondary_600 rounded-lg shadow"
            >
              Diagnóstico
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="/empresas.jpeg"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <section className="bg-white py-12 px-4 sm:px-12 md:px-20 lg:px-32">
        <div className="text-center mb-8">
          <h3 className="text-3xl py-6 md:text-4xl font-bold text-primary_400 mb-4">
            Nuestra solución
          </h3>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            Descubre cómo VocalTech puede transformar la comunicación y
            liderazgo empresarial con sus servicios especializados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <Card
            title="Liderar a través de la voz"
            text="Curso para empresas y profesionales de todas las jerarquías.
            Transforma la comunicación y el liderazgo a través del poder de la voz."
            className="bg-primary_400"
          />
          <Card
            title="Capacitaciones para empresas"
            text="Programas diseñados para mejorar la comunicación interna y externa. Fortalece el liderazgo en equipos y el impacto en reuniones o presentaciones."
            className="bg-primary_400"
          />
          <Card
            title="Fortalecer la voz de la empresa"
            text="Programa para empresas familiares. Mejora la cohesión y comunicación interna, alineando visión y valores para reflejar unidad y liderazgo."
            className="bg-primary_400"
          />
          <Card
            title="Charlas inspiradoras"
            text="Programas diseñados para mejorar la comunicación interna y externa. Fortalece el liderazgo en equipos y el impacto en reuniones o presentaciones."
            className="bg-primary_400"
          />
          <Card
            title="Validación de Mercado"
            text="Prueba y ajusta tus ideas en una comunidad activa de más de 30,000 miembros."
            className="bg-primary_400"
          />
          <Card
            title="Equipos Tech Validados"
            text="Equipos junior productivos validados mediante simulaciones laborales. Ideal para reducir costos y asegurar la calidad en desarrollos tecnológicos."
            className="bg-primary_400"
          />
          <Card
            title="Reducción de Riesgos"
            text="Optimiza costos, tiempos de desarrollo y riesgos asociados con la creación de MVPs."
            className="bg-primary_400"
          />
          <Card
            title="Talento Liberado"
            text="Talento validado culturalmente listo para contratación después del MVP."
            className="bg-primary_400"
          />
        </div>
      </section>

      <section className="bg-white py-12 px-4 sm:px-12 md:px-20 lg:px-32">
        <div className="text-center mb-8">
          <h3 className="text-3xl py-6 md:text-5xl font-bold text-black mb-4">
            Testimonios de Clientes Satisfechos
          </h3>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            Descubre lo que nuestros clientes tienen que decir sobre cómo
            VocalTech ha transformado sus empresas y liderazgo empresarial.
          </p>
        </div>
        <Reviews title="" />
      </section>

      <section className="bg-white py-12 px-4 sm:px-12 md:px-20 lg:px-32">
        <CTA
          title="¡Potenciá tu emprendimiento con VocalTech!"
          button="Registrarse"
        />
      </section>

      <div className="bg-primary_400 flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Companies;
