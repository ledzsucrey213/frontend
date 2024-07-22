import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import logo from '../images/LOGO FINAL.webp'; // Import de l'image du logo

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#f9ffff', // Couleur de fond pour toute la page
    },
  },
});

export default function SignIn() {
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    console.log({ email, password });

    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh', 
          padding: 2 
        }}
      >
        <Box 
          sx={{ 
            p: 4, 
            bgcolor: '#f9ffff', 
            borderRadius: 10, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%',
            // Responsive padding
            '@media (max-width:600px)': {
              p: 2,
            }
          }}
        >
          <Avatar 
            sx={{ 
              m: 1, 
              width: 120, 
              height: 120,
              // Responsive size
              '@media (max-width:600px)': {
                width: 100,
                height: 100,
              }
            }}
          >
            <img src={logo} alt="logo" style={{ width: '100%', height: '100%' }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Je me connecte
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={isLoading}
            >
              Connexion
            </Button>
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="/reset-password" variant="body2">
                  {"Mot de passe oublié?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Inscription"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} QCM PASS. Tous droits réservés.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
