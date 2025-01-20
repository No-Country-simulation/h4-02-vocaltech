import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Questions = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="text-5xl text-white mb-10">Preguntas frecuentes</h2>
      <div className="w-full max-w-4xl px-4">
        
        <Accordion className="mb-4 rounded-lg ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="rounded-t-lg"
          >
            <Typography className="font-medium font-bold text-black">¿Qué es VocalTech?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              Vocaltech es una empresa que combina comunicación y tecnología
              para ayudar a emprendedores y empresas a alcanzar el éxito.
              Ofrecemos servicios personalizados como entrenamiento vocal,
              desarrollo de MVPs, y apoyo en la integración de equipos
              digitales.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="font-medium text-black">
              ¿Cómo pueden ayudarme con mi negocio?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              Analizamos tus necesidades a través de diagnósticos específicos y
              te ofrecemos soluciones adaptadas. Esto incluye mejorar tu
              comunicación, desarrollar un producto mínimo viable (MVP), o
              integrar tecnología para optimizar tus operaciones.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className="font-medium text-black">
              ¿Qué es un MVP y por qué es importante?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              Un MVP es un Producto Mínimo Viable que permite validar ideas y
              obtener retroalimentación temprana para mejorar el producto final.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography className="font-medium text-black">
              ¿A quiénes están dirigidos sus servicios?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              Nuestros servicios están dirigidos a emprendedores, startups y
              empresas que buscan mejorar su comunicación y adoptar tecnología
              para optimizar sus procesos.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
          >
            <Typography className="font-medium text-black">
              ¿Cómo funciona el entrenamiento vocal?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              El entrenamiento vocal incluye técnicas específicas para mejorar
              tu tono, dicción y proyección, ayudándote a transmitir tu mensaje
              de manera clara y efectiva.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
          >
            <Typography className="font-medium text-black">
              ¿Qué tipo de diagnósticos ofrecen?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              Ofrecemos diagnósticos personalizados para evaluar tus habilidades
              de comunicación, tus necesidades tecnológicas y las áreas clave
              que pueden optimizarse en tu negocio.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7a-content"
            id="panel7a-header"
          >
            <Typography className="font-medium text-black">
              ¿Cuánto tiempo toma desarrollar un MVP con Vocaltech?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              El tiempo puede variar según la complejidad del proyecto, pero
              generalmente entregamos un MVP en un rango de 4 a 12 semanas.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4 rounded-lg">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8a-content"
            id="panel8a-header"
          >
            <Typography className="font-medium text-black">
              ¿Qué significa “comunicación con propósito”?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="text-black">
              Significa desarrollar una estrategia de comunicación clara y
              efectiva que conecte con tus objetivos empresariales y alcance a
              tu audiencia de manera significativa.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Questions;
