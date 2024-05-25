import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import Image1 from "../images/cours.png";
import Image2 from "../images/qcmpass.png";
import Image3 from "../images/qcm.jpg";
import Image4 from "../images/pass.png";

// Fonction pour le cas où l'utilisateur est connecté
function HomeLoggedIn() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cours Pass
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explorez une variété de cours!
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="140"
              image={Image1}
              alt="Cours médicaux"
            />
            <Button component={Link} to="/matieres-cours" variant="contained">Découvrir les cours</Button>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Quiz d'entrainement
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Entrainez-vous avec nos quiz pour chaque matière!
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="140"
              image={Image2}
              alt="Examens médicaux"
            />
            <Button component={Link} to="/matieres-quiz" variant="contained">Voir les quiz</Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// Fonction pour le cas où l'utilisateur est déconnecté
function HomeLoggedOut() {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <img src={Image3} alt="Left Image" style={{ width: '200px', height: '200px', margintTop : '-150px', marginLeft: '-200px' }} />
        <Typography variant="h6" gutterBottom sx={{ fontSize: '2.5rem', flex: 1, textAlign: 'center' }}>
          Bienvenue sur QCM PASS!
        </Typography>
        <img src={Image4} alt="Right Image" style={{ width: '300px', height: '200px', margintTop : '150px', marginRight: '-200px' }} />
      </Box>
      <Typography variant="body1">
        Pour accéder aux fonctionnalités de QCM PASS, veuillez vous connecter.
      </Typography>
      <Box sx={{ mt: 2, textAlign: 'center' }}> {/* Espacement entre le texte et le bouton */}
        <Button component={Link} to="/connexion" variant="contained">Se connecter</Button>
      </Box>
    </Container>
  );
}




function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Toolbar />
      {user ? <HomeLoggedIn /> : <HomeLoggedOut />}
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © QCM PASS {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;















