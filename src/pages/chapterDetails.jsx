import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, List, ListItem, ListItemText, Divider, Button, Modal, TextField, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar'; // Assurez-vous que le chemin est correct pour votre projet

function ChapterDetails() {
  const { chapterId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    answer: '',
    correction: '',
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/questions?chapter=${chapterId}`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des questions :', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [chapterId]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (question) => {
    setCurrentQuestion(question);
    setNewQuestion(question);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (question) => {
    setCurrentQuestion(question);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleSubmitAdd = async () => {
    try {
      const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/questions/create`, {
        ...newQuestion,
        chapitre: chapterId,
      });
      setQuestions((prev) => [...prev, response.data]);
      setNewQuestion({
        text: '',
        options: ['', '', '', ''],
        answer: '',
        correction: '',
      });
      handleCloseAdd();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la question :', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.REACT_APP_BACKEND_URL}/api/questions/${currentQuestion._id}`, newQuestion);
      setQuestions((prev) =>
        prev.map((question) =>
          question._id === currentQuestion._id ? response.data : question
        )
      );
      setNewQuestion({
        text: '',
        options: ['', '', '', ''],
        answer: '',
        correction: '',
      });
      handleCloseEdit();
    } catch (error) {
      console.error('Erreur lors de la modification de la question :', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.REACT_APP_BACKEND_URL}/api/questions/${currentQuestion._id}`);
      setQuestions((prev) =>
        prev.filter((question) => question._id !== currentQuestion._id)
      );
      handleCloseDelete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la question :', error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          Chargement des questions...
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" align="center" gutterBottom>
              Questions du Chapitre
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenAdd}>
              Ajouter
            </Button>
          </Box>
          <Paper elevation={3}>
            <List>
              {questions.map((question, index) => (
                <React.Fragment key={question._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography variant="h6">{`Question ${index + 1}: ${question.text}`}</Typography>}
                      secondary={
                        <Box component="span">
                          <ul>
                            {question.options.map((option, i) => (
                              <li key={i} style={{ marginBottom: '8px' }}>
                                {option}
                              </li>
                            ))}
                          </ul>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Réponse :</strong> {String.fromCharCode(65 + question.answer.charCodeAt(0) - 65)}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Correction :</strong> {question.correction}
                          </Typography>
                        </Box>
                      }
                    />
                    <IconButton onClick={() => handleOpenEdit(question)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDelete(question)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  {index < questions.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>

      {/* Modal for Adding a Question */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 500, overflowY: 'auto', bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Ajouter une question
          </Typography>
          <TextField
            label="Texte de la question"
            name="text"
            value={newQuestion.text}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {newQuestion.options.map((option, index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <TextField
            label="Réponse"
            name="answer"
            value={newQuestion.answer}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correction"
            name="correction"
            value={newQuestion.correction}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSubmitAdd}>
              Ajouter
            </Button>
            <Button variant="contained" onClick={handleCloseAdd}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Editing a Question */}
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 500, overflowY: 'auto', bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Modifier la question
          </Typography>
          <TextField
            label="Texte de la question"
            name="text"
            value={newQuestion.text}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {newQuestion.options.map((option, index) => (
            <TextField
              key={index}
              label={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <TextField
            label="Réponse"
            name="answer"
            value={newQuestion.answer}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correction"
            name="correction"
            value={newQuestion.correction}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSubmitEdit}>
              Modifier
            </Button>
            <Button variant="contained" onClick={handleCloseEdit}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for Deleting a Question */}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Supprimer la question
          </Typography>
          <Typography variant="body1" gutterBottom>
            Êtes-vous sûr de vouloir supprimer cette question ?
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Confirmer
            </Button>
            <Button variant="contained" onClick={handleCloseDelete}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default ChapterDetails;

