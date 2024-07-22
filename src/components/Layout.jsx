// src/components/Layout.jsx
import React from 'react';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 2, sm: 4, md: 6 },
          width: '100%', // Assure que le conteneur utilise toute la largeur
          maxWidth: '100%', // Empêche le dépassement de la largeur
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
