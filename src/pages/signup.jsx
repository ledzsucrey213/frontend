import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import logo from '../images/LOGO FINAL.webp'; // Import de l'image du logo

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        QCM PASS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const { signup, error, isLoading, success } = useSignup();
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img src={logo} alt="logo" style={{ width: '200%', height: '200%' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inscris-toi et entraîne-toi avec nous!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  name="adresse"
                  label="Adresse"
                  type="text"
                  id="adresse"
                  autoComplete="adresse"
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
            {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
            {confirmPasswordError && <div className="error" style={{ color: 'red' }}>{confirmPasswordError}</div>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Déjà un compte? Connecte-toi!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}




