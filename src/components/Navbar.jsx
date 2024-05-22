import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, left: 0, right: 0, bgcolor: '#fff', color: '#333', zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/accueil" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ mr: 2 }}>Accueil</Button>
            </Link>
            <Link to="/matieres-cours" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ mr: 2 }}>Cours</Button>
            </Link>
            <Link to="/matieres-quiz" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ mr: 2 }}>Quiz</Button>
            </Link>
          </Box>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit">Utilisateur</Button>
          <Button onClick={handleClick} color="inherit">Déconnexion</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
