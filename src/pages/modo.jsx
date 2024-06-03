import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, List, ListItem, ListItemText, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar'; 

function Modo() {
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMatieresAndChapters = async () => {
      try {
        const matieresResponse = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/matiere`);
        const matieresData = matieresResponse.data;
        const chaptersResponse = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/chapitre`);
        const chaptersData = chaptersResponse.data;

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

  const handleFileChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleChapterChange = (event) => {
    setSelectedChapter(event.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('chapterId', selectedChapter);

    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/questions/upload-pdf`, formData);
      setGeneratedQuestions(response.data.questions);
      setOpen(false);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier PDF :', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          {/* <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ mt: 2, mb: 2 }}>
            Soumettre un PDF
          </Button> */}
          <Paper elevation={3}>
            <List>
              {matieres.map((matiere) => (
                <React.Fragment key={matiere._id}>
                  <ListItem>
                    <ListItemText primary={<Typography variant="h6">{matiere.nom}</Typography>} />
                  </ListItem>
                  <Divider component="li" />
                  {matiere.chapters.map((chapter) => (
                    <ListItem key={chapter._id} alignItems="flex-start" sx={{ pl: 4 }}>
                      <ListItemText primary={chapter.nom} />
                    </ListItem>
                  ))}
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Soumettre un PDF</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Chapitre</InputLabel>
                <Select value={selectedChapter} onChange={handleChapterChange}>
                  {matieres.map((matiere) => (
                    matiere.chapters.map((chapter) => (
                      <MenuItem key={chapter._id} value={chapter._id}>
                        {chapter.nom}
                      </MenuItem>
                    ))
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Télécharger PDF
                <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
              <Button onClick={handleUpload} color="primary">
                Soumettre
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        {generatedQuestions.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Questions Générées
            </Typography>
            <Paper elevation={3}>
              <List>
                {generatedQuestions.map((question, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={question.text}
                      secondary={
                        <ul>
                          {question.options.map((option, i) => (
                            <li key={i}>{option}</li>
                          ))}
                        </ul>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Modo;
