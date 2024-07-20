import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

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
        backgroundColor: '#f9ffff',
        p: 4
      }}
    >
      <Box
        component="img"
        src="../images/1.png" // Remplacez par le chemin de votre première image
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
        src="../images/2.png" // Remplacez par le chemin de votre deuxième image
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
