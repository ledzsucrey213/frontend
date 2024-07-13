import React, { useContext, useState, useEffect } from 'react';
import { Typography, Button, Container, Box, Grid, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import './home.css';  // Import the CSS file
import image1 from '../images/image1.png'; // Adjust the path as needed

// Fonction pour le cas où l'utilisateur est connecté
function HomeLoggedIn() {
  const { user } = useContext(AuthContext);

  return (
    <Container className="container">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box className="section-box">
            <Typography 
              component="h2"
              sx={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '5px', color: '#000000' }}
            >
              Cours Pass
            </Typography>
            <Typography
              className="section-description"
              sx={{ fontSize: '1.2rem', marginBottom: '20px', color: '#000000' }}
            >
              Explorez une variété de cours !
            </Typography>
            <img
              src="https://static.thenounproject.com/png/797595-200.png"
              alt="Cours médicaux"
              className="section-image"
            />
            <Button
              component={Link}
              to="/matieres-cours"
              variant="contained"
              className="section-button"
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#7c7c7c', // couleur de fond noir au survol
                },
              }}
            >
              Découvrir les cours
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className="section-box">
            <Typography 
              component="h2"
              sx={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '5px', color: '#000000' }}
            >
              Quiz d'entraînement
            </Typography>
            <Typography
              className="section-description"
              sx={{ fontSize: '1.2rem', marginBottom: '20px', color: '#000000' }}
            >
              Entrainez-vous avec nos quiz pour chaque matière !
            </Typography>
            <img
              src="https://cdn-icons-png.freepik.com/512/2490/2490294.png"
              alt="Examens médicaux"
              className="section-image"
            />
            <Button
              component={Link}
              to="/matieres-quiz"
              variant="contained"
              className="section-button"
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#7c7c7c', // couleur de fond noir au survol
                },
              }}
            >
              Voir les quiz
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

// Fonction pour le cas où l'utilisateur est déconnecté
function HomeLoggedOut() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, mt: 12 }}>
        <img src="https://cdn.pixabay.com/photo/2012/04/12/20/46/caduceus-30591_960_720.png" alt="Left Image" style={{ width: '200px', height: '200px', margintTop : '-150px', marginLeft: '-50px' }} />
        <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem', flex: 1, textAlign: 'center'}}>
          Bienvenue sur QCM PASS!
          <Typography variant="body1">
          Pour accéder aux fonctionnalités de QCM PASS, veuillez vous connecter.
          </Typography>
        </Typography>
        <img src="https://qcm-24.webself.net/file/si1296288/qcm-png-5-fi19701331x315.png" alt="Right Image" style={{ width: '200px', height: '200px', margintTop : '150px', marginRight: '-50px' }} />
      </Box>
      <Box > {/* Espacement entre le texte et le bouton */}
        <Button component={Link} to="/login" variant="contained">Se connecter</Button>
      </Box>
    </Container>
  );
}

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (!user) {
        navigate('/login');
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <Box className="flex-grow">
      {loading ? (
        <Box className="fade-in" style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover', height: '100vh', width: '100vw' }}></Box>
      ) : (
        <>
          <Navbar />
          <Toolbar />
          {user ? <HomeLoggedIn /> : <HomeLoggedOut />}
          <Box className="footer">
            <Typography variant="body2" className="text-secondary">
              © QCM PASS {new Date().getFullYear()}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Home;
