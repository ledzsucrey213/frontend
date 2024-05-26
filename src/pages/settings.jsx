import React, { useEffect } from 'react';
import { Container, Typography, Box, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { profile } = useProfile();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!profile) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Paramètres du compte
          </Typography>
          <Box sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Nom d'utilisateur"
              name="username"
              value={profile.username}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              value={profile.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="password"
              label="Mot de passe"
              name="password"
              value="********"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="prenom"
              label="Prénom"
              name="prenom"
              value={profile.prenom}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="nom"
              label="Nom"
              name="nom"
              value={profile.nom}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="adresse"
              label="Adresse"
              name="adresse"
              value={profile.adresse}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="numero"
              label="Numéro"
              name="numero"
              value={profile.numero}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Settings;


