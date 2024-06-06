import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfile } from '../hooks/useProfile';
import logo from '../images/LOGO FINAL.webp'; // Import de l'image du logo

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { profile } = useProfile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  console.log('Initial isAdmin:', isAdmin);
  console.log('Initial loading:', loading);
  console.log('Initial user:', user);

  useEffect(() => {
    if (profile) {
      console.log('User available:', profile);
      setIsAdmin(profile.modo);
      setLoading(false);
    } else {
      console.log('No user available');
      setIsAdmin(false);
      setLoading(false);
    }
  }, [profile]);

  const handleClick = () => {
    logout();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Accueil" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component={Link} to="/matieres-quiz">
              <ListItemText primary="Quiz" />
            </ListItem>
            <ListItem button component={Link} to="/matieres-cours">
              <ListItemText primary="Cours" />
            </ListItem>
            {profile && isAdmin && (
              <ListItem button component={Link} to="/modo">
                <ListItemText primary="Administrateur" />
              </ListItem>
            )}
            {profile && (
              <ListItem button component={Link} to="/settings">
                <ListItemText primary={profile.prenom} />
              </ListItem>
            )}
            <ListItem button onClick={handleClick}>
              <ListItemText primary="Déconnexion" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Connexion" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#333', zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="Logo" style={{ height: '60px', marginRight: '16px' }} /> {/* Logo plus grand */}
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
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
              {profile && isAdmin && (
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
        <IconButton
          color="inherit"
          aria-label="menu"
          edge="end"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerList}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
