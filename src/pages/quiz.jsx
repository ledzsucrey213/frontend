import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    // Récupérer l'ID du chapitre à partir de l'URL
    const chapitreId = new URLSearchParams(window.location.search).get('chapitre');

    // Fonction pour récupérer une question aléatoire d'un chapitre spécifique
    const getRandomQuestionFromChapter = async (chapitreId) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/questions/random/${chapitreId}`);
        const question = response.data;

        // Vérifier si la question est déjà utilisée
        if (usedQuestions.includes(question._id)) {
          // Récupérer une autre question si celle-ci est déjà utilisée
          return getRandomQuestionFromChapter(chapitreId);
        }

        return question;
      } catch (error) {
        console.error('Erreur lors de la récupération de la question aléatoire :', error);
        return null;
      }
    };

    // Fonction pour obtenir 10 questions uniques
    const getUniqueQuestions = async () => {
      const uniqueQuestions = [];
      while (uniqueQuestions.length < 10) {
        const question = await getRandomQuestionFromChapter(chapitreId);
        if (question) {
          uniqueQuestions.push(question);
          setUsedQuestions(prevUsedQuestions => [...prevUsedQuestions, question._id]);
        }
      }
      setQuestions(uniqueQuestions);
      setLoading(false);
    };

    // Appeler la fonction pour obtenir les questions uniques
    getUniqueQuestions();
  }, []);

  const handleAnswerSelection = (index) => {
    if (!answered) {
      setSelectedAnswerIndex(index);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setSelectedAnswerIndex(null);
    setAnswered(false);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswerIndex === questions[currentQuestionIndex].answer.charCodeAt(0) - 65) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
    }
    setAnswered(true);
  };

  const getAnswerLetter = (index) => {
    return String.fromCharCode(65 + index); // Convertir l'index en lettre (A, B, C, D...)
  };

  return (
    <Container maxWidth="md">
      {/* Titre */}
      <Typography variant="h4" align="center" gutterBottom>
        QCM PASS
      </Typography>

      {/* Espacement en haut */}
      <Box sx={{ mb: 4 }} />

      {currentQuestionIndex < 10 && (
        <React.Fragment>
          {/* Numéro de la question */}
          <Typography variant="h6" align="center" gutterBottom>
            {currentQuestionIndex + 1}/{questions.length}
          </Typography>

          {/* Jauge de progression */}
          <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress variant="determinate" value={(questions.length > 0) ? (((currentQuestionIndex + 1) / questions.length) * 100) : 0} />
          </Box>
        </React.Fragment>
      )}

      {/* Affichage de la question */}
      {!loading && currentQuestionIndex < questions.length && (
        <Box>
          {/* Question */}
          <Typography variant="h5" align="center" gutterBottom>
            {questions[currentQuestionIndex].text}
          </Typography>

          {/* Réponses */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  mt: 1,
                  width: '70%',
                  borderRadius: '10px',
                  bgcolor: (answered && index === questions[currentQuestionIndex].answer.charCodeAt(0) - 65) ? '#a5d6a7' : 
                           (answered && index === selectedAnswerIndex) ? '#ef9a9a' :
                           (selectedAnswerIndex === index ? 'grey' : 'white'), // Vert clair, Rouge clair, Gris ou blanc
                  color: 'black', // Texte en noir
                  '&:hover': {
                    bgcolor: (answered && index === questions[currentQuestionIndex].answer.charCodeAt(0) - 65) ? '#a5d6a7' : 
                             (answered && index === selectedAnswerIndex) ? '#ef9a9a' :
                             (selectedAnswerIndex === index ? 'grey' : (answered ? 'grey' : 'white')), // Vert clair, Rouge clair, Gris ou blanc
                  }
                }}
                onClick={() => handleAnswerSelection(index)}
              >
                {option}
              </Button>
            ))}
          </Box>

          {/* Bouton "Vérifier la réponse" */}
          {!answered && selectedAnswerIndex !== null && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={handleCheckAnswer} variant="contained" color="primary">
                Voir la correction
              </Button>
            </Box>
          )}

          {/* Affichage de la correction */}
          {answered && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" align="center">
                Correction : {questions[currentQuestionIndex].correction}
              </Typography>
            </Box>
          )}

          {/* Bouton "Question suivante" */}
          {answered && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={handleNextQuestion} variant="contained" color="primary">
                Question suivante
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Affichage de la fin du quiz */}
      {!loading && currentQuestionIndex === questions.length && (
        <Box sx={{ mt: 4 }}>
          {/* Fin du quiz */}
          <Typography variant="h5" align="center" gutterBottom>
            Fin du quiz !
          </Typography>

          {/* Nombre de bonnes réponses */}
          <Box sx={{ marginTop: 6, p: 2, bgcolor: 'white', border: 1, borderColor: '#3f51b5', borderRadius: 5, width: 'fit-content', margin: '0 auto', textAlign: 'center' }}>
            <Typography variant="body1" align="center" gutterBottom style={{ color: '#00796b', fontSize: 20 }}>
              Tu as obtenu une note de {correctAnswers}/10.
            </Typography>
          </Box>

          {/* Bouton "Faire d'autres quiz" */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button variant="contained" color="primary" component={Link} to="/matieres-quiz">
              Faire d'autres quiz
            </Button>
          </Box>
        </Box>
      )}

      {/* Affichage pendant le chargement */}
      {loading && (
        <Typography variant="body1" align="center">
          Chargement des questions...
        </Typography>
      )}

      {/* Pied de page */}
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              QCM PASS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
}

export default Quiz;










