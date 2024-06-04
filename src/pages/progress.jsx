import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';

const PAGE_SIZE = 10; // Nombre de scores à afficher par page

function Progress() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchScoresAndChapters = async () => {
      try {
        const response = await axios.get(`http://qcmbackend.cluster-ig3.igpolytech.fr/api/score/student/${user._id}`);
        const fetchedScores = response.data;

        const chapterPromises = fetchedScores.map(score => 
          axios.get(`http://qcmbackend.cluster-ig3.igpolytech.fr/api/chapitre/${score.chapitre}`)
        );

        const chapters = await Promise.all(chapterPromises);
        const scoresWithChapters = fetchedScores.map((score, index) => ({
          ...score,
          chapitreNom: chapters[index].data.nom,
        }));

        setScores(scoresWithChapters);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des scores et chapitres :', error);
        setLoading(false);
      }
    };

    fetchScoresAndChapters();
  }, [user, navigate]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (scoreId) => {
    navigate(`/score/${scoreId}`);
  };

  const paginatedScores = scores.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageCount = Math.ceil(scores.length / PAGE_SIZE);

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Mes Scores
          </Typography>
          {loading ? (
            <Typography variant="body1" align="center">
              Chargement des scores...
            </Typography>
          ) : (
            <React.Fragment>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Score</TableCell>
                      <TableCell align="right">Chapitre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedScores.map((score) => (
                      <TableRow key={score._id} onClick={() => handleRowClick(score._id)} style={{ cursor: 'pointer' }}>
                        <TableCell>{new Date(score.date).toLocaleDateString()}</TableCell>
                        <TableCell align="right">{score.score}</TableCell>
                        <TableCell align="right">{score.chapitreNom}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default Progress;


