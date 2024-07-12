import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Assurez-vous que le chemin est correct pour votre projet

function ScoreDetails() {
  const { scoreId } = useParams();
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chapterName, setChapterName] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchScoreDetails = async () => {
      try {
        const scoreResponse = await axios.get(`https://qcmbackend.onrender.com/api/score/${scoreId}`);
        const fetchedScore = scoreResponse.data;
        
        const chapterResponse = await axios.get(`https://qcmbackend.onrender.com/api/chapitre/${fetchedScore.chapitre}`);
        const chapterName = chapterResponse.data.nom;

        const questionPromises = fetchedScore.quiz.map(questionId => 
          axios.get(`https://qcmbackend.onrender.com/api/questions/${questionId}`)
        );
        
        const questions = await Promise.all(questionPromises);
        const detailedQuestions = questions.map(q => q.data);

        setScore(fetchedScore);
        setChapterName(chapterName);
        setQuestions(detailedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du score :', error);
        setLoading(false);
      }
    };

    fetchScoreDetails();
  }, [scoreId]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          Chargement des détails du score...
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
            Détails du Score
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Chapitre: {chapterName}
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            Score: {score.score}
          </Typography>
          <Paper elevation={3}>
            <List>
              {questions.map((question, index) => (
                <React.Fragment key={index}>
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
                  </ListItem>
                  {index < questions.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default ScoreDetails;



