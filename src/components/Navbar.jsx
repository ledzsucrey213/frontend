import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import useProfile from '../hooks/useProfile';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { profile } = useProfile();

  const handleClick = () => {
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ width: '107%', margin: 0, marginTop: -5, marginLeft: -5, marginRight: 0, bgcolor: '#fff', color: '#333', zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ mr: 2 }}>Accueil</Button>
            </Link>
            {/* Redirige vers /matieres-quiz si user existe, sinon redirige vers /login */}
            {user ? (
              <Link to="/matieres-quiz" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit" sx={{ mr: 2 }}>Quiz</Button>
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Quiz</Button>
              </Link>
            )}
            {/* Redirige vers /matieres-cours si user existe, sinon redirige vers /login */}
            {user ? (
              <Link to="/matieres-cours" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit" sx={{ mr: 2 }}>Cours</Button>
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Cours</Button>
              </Link>
            )}
          </Box>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="body1" color="inherit" sx={{ mr: 2 }}>{profile ? profile.prenom : ''}</Typography>
              <Button onClick={handleClick} color="inherit">Déconnexion</Button>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Connexion</Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



