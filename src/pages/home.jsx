import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        QCM PASS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar>
      </Navbar>
      <Toolbar />
        <Container maxWidth="lg">
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', mt: 2 }}>
              Hello User 👋
            </Typography>
        </Container>
        <Box sx={{ p: 2, bgcolor: 'background.default', position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
              <Copyright />
          </Typography>
        </Box>
    </Box>
  );
}






