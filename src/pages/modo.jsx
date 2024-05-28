import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assurez-vous que le chemin est correct pour votre projet

function Modo() {
  const [matieres, setMatieres] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatieresAndChapters = async () => {
      try {
        // Récupérer les matières
        const matieresResponse = await axios.get(`http://localhost:3000/api/matiere`);
        const matieresData = matieresResponse.data;

        // Récupérer les chapitres
        const chaptersResponse = await axios.get(`http://localhost:3000/api/chapitre`);
        const chaptersData = chaptersResponse.data;

        // Regrouper les chapitres par matière
        const matieresWithChapters = matieresData.map(matiere => ({
          ...matiere,
          chapters: chaptersData.filter(chapter => chapter.matiere === matiere._id),
        }));

        setMatieres(matieresWithChapters);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des matières et chapitres :', error);
        setLoading(false);
      }
    };

    fetchMatieresAndChapters();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          Chargement des matières et chapitres...
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Modération
          </Typography>
          <Paper elevation={3}>
            <List>
              {matieres.map((matiere) => (
                <React.Fragment key={matiere._id}>
                  <ListItem>
                    <ListItemText
                      primary={<Typography variant="h6">{matiere.nom}</Typography>}
                    />
                  </ListItem>
                  <Divider component="li" />
                  {matiere.chapters.map((chapter) => (
                    <ListItem
                      key={chapter._id}
                      alignItems="flex-start"
                      button
                      component={Link}
                      to={`/chapitre/${chapter._id}`}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText
                        primary={chapter.nom}
                      />
                    </ListItem>
                  ))}
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default Modo;
