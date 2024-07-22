import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import firstImage from '../images/1.png';
import secondImage from '../images/2.png';

const SignupSuccessAnimation = () => {
  const navigate = useNavigate();
  const [showFirstImage, setShowFirstImage] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);

  useEffect(() => {
    const firstTimer = setTimeout(() => setShowFirstImage(true), 500);
    const secondTimer = setTimeout(() => setShowSecondImage(true), 2000);
    const redirectTimer = setTimeout(() => navigate('/'), 5000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#e4eefd', // Couleur de fond spécifique pour ce composant
        p: 4
      }}
    >
      <Box
        component="img"
        src={firstImage}
        alt="First Image"
        sx={{
          width: '100%',
          maxWidth: '500px',
          opacity: showFirstImage ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          mb: 2
        }}
      />
      <Box
        component="img"
        src={secondImage}
        alt="Second Image"
        sx={{
          width: '100%',
          maxWidth: '500px',
          opacity: showSecondImage ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
    </Box>
  );
};

export default SignupSuccessAnimation;
