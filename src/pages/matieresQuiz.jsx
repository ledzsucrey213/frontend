import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


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

const MatieresPageQuiz = () => {
  // Données fictives pour les Matièress
  const chapters = [
    { id: 1, title: "Matières 1" },
    { id: 2, title: "Matières 2" },
    { id: 3, title: "Matières 3" },
    { id: 4, title: "Matières 4" },
    { id: 5, title: "Matières 5" },
    { id: 6, title: "Matières 6" },
    { id: 7, title: "Matières 7" },
    { id: 8, title: "Matières 8" },
    { id: 9, title: "Matières 9" }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar>
      </Navbar>
      <Toolbar /> 
      {/* Titre */}
      <Typography variant="h4" align="center" gutterBottom>
        Matières
      </Typography>
      {/* Grille pour afficher les Matièress */}
      <Grid container spacing={3}>
        {chapters.map((chapter) => (
          <Grid item key={chapter.id} xs={12} sm={6} md={4}>
            <Button fullWidth variant="outlined" sx={{ height: '100px', bgcolor: 'white', color: 'black', borderColor: 'black' }}>
              {chapter.title}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
            <Copyright />
        </Typography>
      </Box>
    </Box>
  );
}

export default MatieresPageQuiz;