import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Footer from '../components/Footer'

const Questions = () => {
  return (
    <div>
      <div className='flex flex-col bg-white text-primary_400 justify-center items-center md:py-10 lg:py-20'>
        <h2 className='text-4xl  font-bold mb-20 mt-2'>Preguntas frecuentes</h2>
        <div className='w-full max-w-4xl px-4 drop-shadow-2xl'>
          <Accordion className='mb-4 rounded-lg '>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              className='rounded-t-lg'
            >
              <Typography className='text-primary_400'>
                ¿Qué es VocalTech?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                Vocaltech es una empresa que combina comunicación y tecnología
                para ayudar a emprendedores y empresas a alcanzar el éxito.
                Ofrecemos servicios personalizados como entrenamiento vocal,
                desarrollo de MVPs, y apoyo en la integración de equipos
                digitales.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿Cómo pueden ayudarme con mi negocio?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                Analizamos tus necesidades a través de diagnósticos específicos
                y te ofrecemos soluciones adaptadas. Esto incluye mejorar tu
                comunicación, desarrollar un producto mínimo viable (MVP), o
                integrar tecnología para optimizar tus operaciones.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg '>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿Qué es un MVP y por qué es importante?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                Un MVP es un Producto Mínimo Viable que permite validar ideas y
                obtener retroalimentación temprana para mejorar el producto
                final.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel4a-content'
              id='panel4a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿A quiénes están dirigidos sus servicios?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                Nuestros servicios están dirigidos a emprendedores, startups y
                empresas que buscan mejorar su comunicación y adoptar tecnología
                para optimizar sus procesos.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel5a-content'
              id='panel5a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿Cómo funciona el entrenamiento vocal?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                El entrenamiento vocal incluye técnicas específicas para mejorar
                tu tono, dicción y proyección, ayudándote a transmitir tu
                mensaje de manera clara y efectiva.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel6a-content'
              id='panel6a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿Qué tipo de diagnósticos ofrecen?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                Ofrecemos diagnósticos personalizados para evaluar tus
                habilidades de comunicación, tus necesidades tecnológicas y las
                áreas clave que pueden optimizarse en tu negocio.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel7a-content'
              id='panel7a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿Cuánto tiempo toma desarrollar un MVP con Vocaltech?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                El tiempo puede variar según la complejidad del proyecto, pero
                generalmente entregamos un MVP en un rango de 4 a 12 semanas.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className='mb-4 rounded-lg'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel8a-content'
              id='panel8a-header'
            >
              <Typography className='font-medium text-primary_400'>
                ¿Qué significa “comunicación con propósito”?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='text-primary_400'>
                Significa desarrollar una estrategia de comunicación clara y
                efectiva que conecte con tus objetivos empresariales y alcance a
                tu audiencia de manera significativa.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Questions
