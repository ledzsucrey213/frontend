import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import banner from '../images/qcmpassbanner.png'; // Import de l'image du banner
import { useAuthContext } from '../hooks/useAuthContext';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { user } = useAuthContext();
  const chapitreId = new URLSearchParams(window.location.search).get('chapitre');

  useEffect(() => {
    const getRandomQuestionFromChapter = async (chapitreId) => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/questions/random/${chapitreId}`);
        const question = response.data;

        if (usedQuestions.has(question._id)) {
          return getRandomQuestionFromChapter(chapitreId);
        }

        return question;
      } catch (error) {
        console.error('Erreur lors de la récupération de la question aléatoire :', error);
        return null;
      }
    };

    const getUniqueQuestions = async () => {
      const uniqueQuestions = [];
      const usedQuestionIds = new Set();

      while (uniqueQuestions.length < 10) {
        const question = await getRandomQuestionFromChapter(chapitreId);
        if (question && !usedQuestionIds.has(question._id)) {
          uniqueQuestions.push(question);
          usedQuestionIds.add(question._id);
        }
      }

      setQuestions(uniqueQuestions);
      setUsedQuestions(usedQuestionIds);
      setLoading(false);
    };

    getUniqueQuestions();
  }, [chapitreId]);

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

  const postScore = async () => {
    if (questions.length > 0 && user) {
      const scoreData = {
        score: correctAnswers,
        quiz: questions.map(q => q._id),
        date: new Date(),
        student: user._id,
        chapitre: chapitreId
      };
      try {
        await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/score/create`, scoreData);
        console.log("Score enregistré");
      } catch (error) {
        console.error('Erreur lors de la soumission du score :', error);
      }
    }
  };

  useEffect(() => {
    if (!loading && currentQuestionIndex === questions.length) {
      postScore();
    }
  }, [loading, currentQuestionIndex]);

  const getAnswerLetter = (index) => {
    return String.fromCharCode(65 + index); // Convertir l'index en lettre (A, B, C, D...)
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <img src={banner} alt="QCM PASS Banner" style={{ width: '50%', maxWidth: '300px' }} />
      </Box>

      {currentQuestionIndex < 10 && (
        <React.Fragment>
          <Typography variant="h6" align="center" gutterBottom>
            {currentQuestionIndex + 1}/{questions.length}
          </Typography>
          <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress variant="determinate" value={(questions.length > 0) ? (((currentQuestionIndex + 1) / questions.length) * 100) : 0} />
          </Box>
        </React.Fragment>
      )}

      {!loading && currentQuestionIndex < questions.length && (
        <Box>
          <Typography variant="h5" align="center" gutterBottom>
            {questions[currentQuestionIndex].text}
          </Typography>
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
                           (selectedAnswerIndex === index ? 'grey' : 'white'),
                  color: 'black',
                  '&:hover': {
                    bgcolor: (answered && index === questions[currentQuestionIndex].answer.charCodeAt(0) - 65) ? '#a5d6a7' : 
                             (answered && index === selectedAnswerIndex) ? '#ef9a9a' :
                             (selectedAnswerIndex === index ? 'grey' : (answered ? 'grey' : 'white')),
                  }
                }}
                onClick={() => handleAnswerSelection(index)}
              >
                {option}
              </Button>
            ))}
          </Box>
          {!answered && selectedAnswerIndex !== null && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={handleCheckAnswer} variant="contained" color="primary">
                Voir la correction
              </Button>
            </Box>
          )}
          {answered && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" align="center">
                Correction : {questions[currentQuestionIndex].correction}
              </Typography>
            </Box>
          )}
          {answered && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={handleNextQuestion} variant="contained" color="primary">
                Question suivante
              </Button>
            </Box>
          )}
        </Box>
      )}
      {!loading && currentQuestionIndex === questions.length && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Fin du quiz !
          </Typography>
          <Box sx={{ marginTop: 6, p: 2, bgcolor: 'white', border: 1, borderColor: '#3f51b5', borderRadius: 5, width: 'fit-content', margin: '0 auto', textAlign: 'center' }}>
            <Typography variant="body1" align="center" gutterBottom style={{ color: '#00796b', fontSize: 20 }}>
              Tu as obtenu une note de {correctAnswers}/10.
            </Typography>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button variant="contained" color="primary" component={Link} to="/matieres-quiz">
              Faire d'autres quiz
            </Button>
          </Box>
        </Box>
      )}
      {loading && (
        <Typography variant="body1" align="center">
          Chargement des questions...
        </Typography>
      )}
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
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
















