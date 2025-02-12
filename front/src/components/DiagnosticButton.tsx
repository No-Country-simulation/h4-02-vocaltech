import { Button, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const DiagnosticButton = () => {
  return (
    <Box
      sx={{
        maxWidth: '800px',
        width: '100%',
        padding: { xs: '16px', sm: '20px', md: '24px' },
        background: 'linear-gradient(to right, #0A124D, #3C4377)',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        boxShadow: 3,
        textAlign: 'center',
        marginX: 'auto' // Centrado horizontalmente en móviles
      }}
    >
      <Typography
        variant='h6'
        sx={{
          marginBottom: '16px',
          fontSize: { xs: '16px', sm: '18px', md: '20px' } // Tamaño de fuente adaptable
        }}
      >
        Haz tu diagnóstico y lleva tu proyecto al siguiente nivel.
      </Typography>
      <Link to='/diagnostic' style={{ textDecoration: 'none' }}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#CE5805',
            '&:hover': { backgroundColor: '#FF6F00' },
            width: { xs: '100%', sm: '200px' } // Botón ocupa todo el ancho en móviles
          }}
        >
          Diagnóstico
        </Button>
      </Link>
    </Box>
  )
}

export default DiagnosticButton
