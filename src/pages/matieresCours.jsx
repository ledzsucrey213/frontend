import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function MatieresPageCours() {
  const [matieres, setMatieres] = useState([]);

  useEffect(() => {
    // Effectue une requête Axios pour récupérer les matières depuis votre API
    axios.get('http://localhost:3000/api/matiere/')
      .then(response => {
        setMatieres(response.data); // Met à jour l'état avec les matières récupérées depuis l'API
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des matières :', error);
      });
  }, []); // Le tableau vide comme dépendance signifie que ce useEffect s'exécute une seule fois après le premier rendu

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
              to={`/chap-quiz?matiere=${matiere._id}`} // Redirige vers la page des chapitres avec l'ID de la matière en paramètre d'URL
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