import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

function MatieresPageCours() {
  const [matieres, setMatieres] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      // Effectue une requête Axios pour récupérer les matières depuis votre API
      axios.get(`https://qcmbackend.onrender.com/api/matiere/`)
        .then(response => {
          // Trie les matières selon leur nom
          const sortedMatieres = response.data.sort((a, b) => {
            // Extraire le numéro de l'UE à partir du nom de la matière
            const numUE_A = parseInt(a.nom.match(/\d+/)[0]);
            const numUE_B = parseInt(b.nom.match(/\d+/)[0]);
            // Comparer les numéros de l'UE
            return numUE_A - numUE_B;
          });
          setMatieres(sortedMatieres); // Met à jour l'état avec les matières triées
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des matières :', error);
        });
    }
  }, [user]); // Le tableau vide comme dépendance signifie que ce useEffect s'exécute une seule fois après le premier rendu

  if (!user) {
    return null; // ou un spinner de chargement ou tout autre indicateur visuel
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Toolbar /> 
      {/* Titre */}
      <Typography variant="h4" align="center" gutterBottom>
        Matières
      </Typography>
      {/* Grille pour afficher les Matières */}
      <Grid container spacing={3}>
        {matieres.map((matiere) => (
          <Grid item key={matiere._id} xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to={`/chap-cours?matiere=${matiere._id}`} // Redirige vers la page des chapitres avec l'ID de la matière en paramètre d'URL
              sx={{ height: '100px', bgcolor: 'white', color: 'black', borderColor: 'black' }}
            >
              {matiere.nom}
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

export default MatieresPageCours;
