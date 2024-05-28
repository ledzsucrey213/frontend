import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfile } from '../hooks/useProfile';
import logo from '../images/LOGO FINAL.webp'; // Import de l'image du logo

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ width: '107%', margin: 0, marginTop: -5, marginLeft: -5, marginRight: 0, bgcolor: '#fff', color: '#333', zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '16px' }} /> {/* Logo plus grand */}
            </Link>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" sx={{ mr: 2 }}>Accueil</Button>
            </Link>
            {user ? (
              <>
                <Link to="/matieres-quiz" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit" sx={{ mr: 2 }}>Quiz</Button>
                </Link>
                <Link to="/matieres-cours" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit" sx={{ mr: 2 }}>Cours</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit">Quiz</Button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit">Cours</Button>
                </Link>
              </>
            )}
          </Box>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              {profile && profile.modo === 1 && (
                <Button
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate('/modo')}
                >
                  Administrateur
                </Button>
              )}
              {profile && (
                <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Button color="inherit" sx={{ mr: 2 }}>
                    {profile.prenom}
                  </Button>
                </Link>
              )}
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



