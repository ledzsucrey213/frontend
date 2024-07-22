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
import LinearProgress from '@mui/material/LinearProgress';
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

const evaluatePassword = (password) => {
  const criteria = [
    { regex: /.{8,}/, message: 'Il faut au moins 8 caractères' },
    { regex: /[A-Z]/, message: 'Il manque une majuscule' },
    { regex: /[0-9]/, message: 'Il faut des numéros' },
    { regex: /[^A-Za-z0-9]/, message: 'Il manque un caractère spécial' },
  ];

  const messages = criteria
    .filter((criterion) => !criterion.regex.test(password))
    .map((criterion) => criterion.message);

  return {
    strength: criteria.length - messages.length,
    messages,
  };
};

const getPasswordStrengthColor = (strength) => {
  switch (strength) {
    case 0:
    case 1:
    case 2:
      return 'red';
    case 3:
      return 'orange';
    case 4:
      return 'green';
    default:
      return 'red';
  }
};

export default function SignUp() {
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrengthValue, setPasswordStrengthValue] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);

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
      navigate('/signup-success');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    const { strength, messages } = evaluatePassword(newPassword);
    setPasswordStrengthValue(strength);
    setPasswordErrors(messages);
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
          padding: 2,
        }}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: 'background.default',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 'xs', // S'assure que le conteneur ne dépasse pas la largeur maximale définie
          }}
        >
          <Avatar sx={{ m: 1, width: 100, height: 100 }}>
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
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <LinearProgress
                  variant="determinate"
                  value={(passwordStrengthValue / 4) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getPasswordStrengthColor(passwordStrengthValue),
                    },
                  }}
                />
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {passwordErrors.slice(0, 2).map((error, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    </Grid>
                  ))}
                  {passwordErrors.slice(2).map((error, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmer le mot de passe"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
            {confirmPasswordError && <Typography color="error" sx={{ mt: 2 }}>{confirmPasswordError}</Typography>}
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
