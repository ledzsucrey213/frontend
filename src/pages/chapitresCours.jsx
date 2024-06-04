import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Importez les fichiers PDF directement
import pdf1 from '../pdf/pdf1.pdf';
import pdf2 from '../pdf/pdf2.pdf';
import pdf3 from '../pdf/pdf3.pdf';
import pdf4 from '../pdf/pdf4.pdf';
import pdf5 from '../pdf/pdf5.pdf';

const pdfMapping = {
  '6650945160427ca6b0a056f8': pdf1,
  '6650946260427ca6b0a056fa': pdf2,
  '665094af60427ca6b0a056fc': pdf3,
  '665094d460427ca6b0a056fe': pdf4,
  '665094db60427ca6b0a05700': pdf5,
};

function ChaptersPageCours() {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const matiereId = new URLSearchParams(location.search).get('matiere');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && matiereId) {
      axios.get(`http://qcmbackend.cluster-ig3.igpolytech.fr/api/chapitre/matiere/${matiereId}`)
        .then(response => {
          setChapters(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des chapitres :', error);
        });
    }
  }, [user, matiereId]);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Typography variant="h4" align="center" gutterBottom>
        Chapitres
      </Typography>
      <Grid container spacing={3}>
        {chapters.map((chapter) => (
          <Grid item key={chapter._id} xs={12} sm={6} md={4}>
            <motion.div layout>
              <Card onClick={() => setSelectedChapter(selectedChapter === chapter ? null : chapter)} sx={{ cursor: 'pointer' }}>
                <AnimatePresence>
                  {selectedChapter === chapter ? (
                    <motion.div
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CardContent>
                        <Document
                          file={pdfMapping[chapter._id]}
                          onLoadSuccess={handleDocumentLoadSuccess}
                        >
                          <Page pageNumber={1} width={250} />
                        </Document>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          href={pdfMapping[chapter._id]}
                          target="_blank"
                          sx={{ mt: 2 }}
                        >
                          Ouvrir le PDF
                        </Button>
                      </CardContent>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, rotateY: -180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CardContent>
                        <Typography variant="h6">
                          {chapter.nom}
                        </Typography>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © QCM PASS {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChaptersPageCours;






