import React from 'react';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 2, // Ajoutez du padding autour du contenu
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.default',
          borderRadius: 10,
          width: '100%',
          maxWidth: 'sm', // Largeur maximale pour les grands écrans
          boxShadow: 3, // Ajoute une ombre pour plus de profondeur
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
