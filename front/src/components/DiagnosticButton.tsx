import { Button, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const DiagnosticButton = () => {
  return (
    <Box
      sx={{
        width: '800px',
        padding: '20px',
        background: 'linear-gradient(to right, #0A124D, #3D42DF)',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        boxShadow: 3
      }}
    >
      <Typography
        variant='h6'
        sx={{ marginBottom: '20px', textAlign: 'center' }}
      >
        Haz tu diagnóstico y lleva tu proyecto al siguiente nivel.
      </Typography>
      <Link to='./diagnostic'>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#E26105',
            '&:hover': {
              backgroundColor: '#FF6F00'
            },
            width: '200px'
          }}
        >
          Diagnóstico
        </Button>
      </Link>
    </Box>
  )
}

export default DiagnosticButton
