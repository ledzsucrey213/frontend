import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

function ChaptersPageQuiz() {
  const [chapters, setChapters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const matiereId = new URLSearchParams(location.search).get('matiere');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && matiereId) {
      // Effectue une requête Axios pour récupérer les chapitres de la matière sélectionnée depuis votre API
      axios.get(`https://qcmbackend.onrender.com/api/chapitre/matiere/${matiereId}`)
        .then(response => {
          setChapters(response.data); // Met à jour l'état avec les chapitres récupérés depuis l'API
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des chapitres :', error);
        });
    }
  }, [user, matiereId]); // Mettez à jour les chapitres lorsque l'identifiant de la matière change

  if (!user) {
    return null; // ou un spinner de chargement ou tout autre indicateur visuel
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Toolbar /> 
      {/* Titre */}
      <Typography variant="h4" align="center" gutterBottom>
        Chapitres
      </Typography>
      {/* Grille pour afficher les chapitres */}
      <Grid container spacing={3}>
        {chapters.map((chapter) => (
          <Grid item key={chapter._id} xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to={`/quiz?chapitre=${chapter._id}`} // Redirige vers la page du quiz avec l'ID du chapitre en paramètre d'URL
              sx={{ height: '100px', bgcolor: 'white', color: 'black', borderColor: 'black' }}
            >
              {chapter.nom}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © QCM PASS {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChaptersPageQuiz;






