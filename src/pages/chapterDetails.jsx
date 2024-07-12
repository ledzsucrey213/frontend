import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, List, ListItem, ListItemText, Divider, Button, Modal, TextField, IconButton } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import { useAuthContext } from '../hooks/useAuthContext';

function ChapterDetails() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    nom: '',
    questions: Array(10).fill({
      text: '',
      options: ['', '', '', ''],
      answer: '',
      correction: '',
    }),
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`https://qcmbackend.onrender.com/api/quiz/chapitre/${chapterId}`);
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des quiz :', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [chapterId, user, navigate]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (quiz) => {
    setCurrentQuiz(quiz);
    setNewQuiz(quiz);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (quiz) => {
    setCurrentQuiz(quiz);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...newQuiz.questions];
    newQuestions[index][key] = value;
    setNewQuiz((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...newQuiz.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setNewQuiz((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const handleSubmitAdd = async () => {
    try {
      // Create the questions first
      const questions = await Promise.all(newQuiz.questions.map(async (question) => {
        const response = await axios.post('https://qcmbackend.onrender.com/api/questions/create', {
          ...question,
          chapitre: chapterId,
        });
        return response.data._id;
      }));

      // Create the quiz with the questions' IDs
      const quizData = {
        nom: newQuiz.nom,
        questions,
        chapitre: chapterId,
        nombreQuestions: 10,
      };

      const response = await axios.post('https://qcmbackend.onrender.com/api/quiz/create', quizData);
      setQuizzes((prev) => [...prev, response.data]);

      // Reset the form
      setNewQuiz({
        nom: '',
        questions: Array(10).fill({
          text: '',
          options: ['', '', '', ''],
          answer: '',
          correction: '',
        }),
      });
      handleCloseAdd();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du quiz :', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await axios.put(`https://qcmbackend.onrender.com/api/quiz/${currentQuiz._id}`, newQuiz);
      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz._id === currentQuiz._id ? response.data : quiz
        )
      );
      setNewQuiz({
        nom: '',
        questions: Array(10).fill({
          text: '',
          options: ['', '', '', ''],
          answer: '',
          correction: '',
        }),
      });
      handleCloseEdit();
    } catch (error) {
      console.error('Erreur lors de la modification du quiz :', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://qcmbackend.onrender.com/api/quiz/${currentQuiz._id}`);
      setQuizzes((prev) =>
        prev.filter((quiz) => quiz._id !== currentQuiz._id)
      );
      handleCloseDelete();
    } catch (error) {
      console.error('Erreur lors de la suppression du quiz :', error);
    }
  };

  const optionLabel = (index) => String.fromCharCode(65 + index);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          Chargement des quiz...
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
              Quiz du Chapitre
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpenAdd}>
              Ajouter
            </Button>
          </Box>
          <Paper elevation={3}>
            <List>
              {quizzes.map((quiz, index) => (
                <React.Fragment key={quiz._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography variant="h6">{`Quiz ${index + 1}: ${quiz.nom}`}</Typography>}
                      secondary={
                        <Box component="span">
                          <ul>
                            {quiz.questions.map((question, i) => (
                              <li key={i} style={{ marginBottom: '8px' }}>
                                {question.text}
                              </li>
                            ))}
                          </ul>
                        </Box>
                      }
                    />
                    <IconButton onClick={() => handleOpenEdit(quiz)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDelete(quiz)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                  {index < quizzes.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>

      {/* Modal for Adding a Quiz */}
      <Modal open={openAdd} onClose={handleCloseAdd}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: '80vh', overflowY: 'auto', bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Ajouter un quiz
          </Typography>
          <TextField
            label="Nom du quiz"
            name="nom"
            value={newQuiz.nom}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {newQuiz.questions.map((question, qIndex) => (
            <Box key={qIndex} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{`Question ${qIndex + 1}`}</Typography>
              <TextField
                label="Texte de la question"
                name="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                fullWidth
                margin="normal"
              />
              {question.options.map((option, oIndex) => (
                <TextField
                  key={oIndex}
                  label={`Option ${optionLabel(oIndex)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              ))}
              <TextField
                label="Réponse (A, B, C, D)"
                name="answer"
                value={question.answer}
                onChange={(e) => handleQuestionChange(qIndex, 'answer', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Correction"
                name="correction"
                value={question.correction}
                onChange={(e) => handleQuestionChange(qIndex, 'correction', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          ))}
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

      {/* Modal for Editing a Quiz */}
      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: '80vh', overflowY: 'auto', bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Modifier le quiz
          </Typography>
          <TextField
            label="Nom du quiz"
            name="nom"
            value={newQuiz.nom}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {newQuiz.questions.map((question, qIndex) => (
            <Box key={qIndex} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{`Question ${qIndex + 1}`}</Typography>
              <TextField
                label="Texte de la question"
                name="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                fullWidth
                margin="normal"
              />
              {question.options.map((option, oIndex) => (
                <TextField
                  key={oIndex}
                  label={`Option ${optionLabel(oIndex)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              ))}
              <TextField
                label="Réponse (A, B, C, D)"
                name="answer"
                value={question.answer}
                onChange={(e) => handleQuestionChange(qIndex, 'answer', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Correction"
                name="correction"
                value={question.correction}
                onChange={(e) => handleQuestionChange(qIndex, 'correction', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          ))}
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

      {/* Modal for Deleting a Quiz */}
      <Modal open={openDelete} onClose={handleCloseDelete}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Supprimer le quiz
          </Typography>
          <Typography variant="body1" gutterBottom>
            Êtes-vous sûr de vouloir supprimer ce quiz ?
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
