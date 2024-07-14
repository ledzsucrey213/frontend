import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import logo from '../images/LOGO FINAL.webp'; // Import de l'image du logo

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#f9ffff', // Couleur de fond pour toute la page
    },
  },
});

export default function SignUp() {
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    const nom = data.get('lastName');
    const prenom = data.get('firstName');
    const numero = data.get('number');
    const adresse = data.get('adresse');

    if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    setConfirmPasswordError('');

    const success = await signup(username, email, password, nom, prenom, numero, adresse);
    if (success) {
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Box sx={{ p: 4, bgcolor: 'background.default', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Avatar sx={{ m: 1, width: 150, height: 150 }}>
            <img src={logo} alt="logo" style={{ width: '100%', height: '100%' }} />
          </Avatar>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom de famille"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="Numéro de téléphone"
                  type="text"
                  id="number"
                  autoComplete="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Nom d'utilisateur"
                  type="text"
                  id="username"
                  autoComplete="username"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Continuer
            </Button>
            {error && <div className="error" style={{ color: 'red', mt: 2 }}>{error}</div>}
            {confirmPasswordError && <div className="error" style={{ color: 'red', mt: 2 }}>{confirmPasswordError}</div>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Déjà un compte? Connecte-toi!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, pb: 4 }}>
          © {new Date().getFullYear()} QCM PASS. Tous droits réservés.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
