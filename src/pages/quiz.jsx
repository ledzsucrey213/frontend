import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, Box, LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import banner from '../images/qcmpassbanner.png';
import { useAuthContext } from '../hooks/useAuthContext';

function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { user } = useAuthContext();
  const chapitreId = new URLSearchParams(window.location.search).get('chapitre');

  useEffect(() => {
    const fetchRandomQuiz = async (chapitreId) => {
      try {
        const response = await axios.get(`https://qcmbackend.onrender.com/api/quiz/${chapitreId}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du quiz aléatoire :', error);
      }
    };

    fetchRandomQuiz(chapitreId);
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
    if (selectedAnswerIndex === quiz.questions[currentQuestionIndex].answer.charCodeAt(0) - 65) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
    }
    setAnswered(true);
  };

  const postScore = async () => {
    if (quiz && user) {
      const scoreData = {
        score: correctAnswers,
        quiz: quiz.questions.map(q => q._id),
        date: new Date(),
        student: user._id,
        chapitre: chapitreId
      };
      try {
        await axios.post(`https://qcmbackend.onrender.com/api/score/create`, scoreData);
        console.log("Score enregistré");
      } catch (error) {
        console.error('Erreur lors de la soumission du score :', error);
      }
    }
  };

  useEffect(() => {
    if (!loading && currentQuestionIndex === (quiz ? quiz.questions.length : 0)) {
      postScore();
    }
  }, [loading, currentQuestionIndex]);

  const getAnswerLetter = (index) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <img src={banner} alt="QCM PASS Banner" style={{ width: '50%', maxWidth: '300px' }} />
      </Box>

      {currentQuestionIndex < (quiz ? quiz.questions.length : 0) && (
        <React.Fragment>
          <Typography variant="h6" align="center" gutterBottom>
            {currentQuestionIndex + 1}/{quiz ? quiz.questions.length : 0}
          </Typography>
          <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress variant="determinate" value={(quiz ? (((currentQuestionIndex + 1) / quiz.questions.length) * 100) : 0)} />
          </Box>
        </React.Fragment>
      )}

      {!loading && quiz && currentQuestionIndex < quiz.questions.length && (
        <Box>
          <Typography variant="h5" align="center" gutterBottom>
            {quiz.questions[currentQuestionIndex].text}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  mt: 1,
                  width: '70%',
                  borderRadius: '10px',
                  bgcolor: (answered && index === quiz.questions[currentQuestionIndex].answer.charCodeAt(0) - 65) ? '#a5d6a7' : 
                           (answered && index === selectedAnswerIndex) ? '#ef9a9a' :
                           (selectedAnswerIndex === index ? 'grey' : 'white'),
                  color: 'black',
                  '&:hover': {
                    bgcolor: (answered && index === quiz.questions[currentQuestionIndex].answer.charCodeAt(0) - 65) ? '#a5d6a7' : 
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
                Correction : {quiz.questions[currentQuestionIndex].correction}
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
      {!loading && currentQuestionIndex === (quiz ? quiz.questions.length : 0) && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Fin du quiz !
          </Typography>
          <Box sx={{ marginTop: 6, p: 2, bgcolor: 'white', border: 1, borderColor: '#3f51b5', borderRadius: 5, width: 'fit-content', margin: '0 auto', textAlign: 'center' }}>
            <Typography variant="body1" align="center" gutterBottom style={{ color: '#00796b', fontSize: 20 }}>
              Tu as obtenu une note de {correctAnswers}/{quiz ? quiz.questions.length : 0}.
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
