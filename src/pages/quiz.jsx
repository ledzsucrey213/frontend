import React from 'react';
import { Typography, Button, Container, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          QCM PASS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const Quiz = () => {
  // Éléments fictifs pour l'exemple
  const question = "Quel est la capitale de la France ?";
  const answers = ["Paris", "Londres", "Berlin", "Madrid"];

  return (
    <Container maxWidth="md">
      {/* Titre */}
      <Typography variant="h4" align="center" gutterBottom>
        QCM PASS
      </Typography>

      {/* Espacement en haut */}
      <Box sx={{ mb: 4 }} />

      {/* Numéro de la question */}
      <Typography variant="h6" align="center" gutterBottom>
        1/12
      </Typography>

      {/* Jauge de progression */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <LinearProgress variant="determinate" value={8.3} />
      </Box>

      {/* Question */}
      <Typography variant="h5" align="center" gutterBottom>
        {question}
      </Typography>

      {/* Espacement entre la question et les réponses */}
      <Box sx={{ mb: 4 }} />

      {/* Réponses */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        {answers.map((answer, index) => (
          <Button key={index} variant="outlined" sx={{ mt: 1, width: '70%', borderRadius: '10px' }}>
            {answer}
          </Button>
        ))}
      </Box>

      {/* Bouton "ENCORE 10 QUESTIONS" */}
      <Typography variant="body1" align="center" sx={{ mb: 2, fontSize: '12px' }}>
        ENCORE 10 QUESTIONS
      </Typography>
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
            <Copyright />
        </Typography>
      </Box>
    </Container>
  );
}

export default Quiz;
