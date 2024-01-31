import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate('/Register');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      if (!email || !password) {
          console.log('Veuillez remplir tous les champs.');
          alert('Veuillez remplir tous les champs.');
          return;
      }

      try {
          
          // Utiliser Axios pour envoyer les données au serveur
          console.log(email + password);
          const response = await axios.post('http://10.224.1.68:5001/', {
              email,
              password,
          });

          if (response.data.message === 'User authenticated') {
              console.log('Connexion réussie');
              // Effectuer les actions nécessaires après la connexion réussie
          } else {
              console.error('Échec de la connexion');
              // Gérer les erreurs de connexion ici
          }
      } catch (error) {
          console.error('Une erreur sest produite lors de la connexion', error);
          // Gérer les erreurs de connexion ici
      }
  };

  return (
      <div>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
      >
          <h1>Connexion</h1>
      </Grid>
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '35vh' }}
      >
          <Grid item xs={12} md={6}> 
              <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  size='small'
              />
          </Grid>
          <Grid item xs={12} md={6}>
              <TextField
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  size='small'
              />
          </Grid>
      </Grid>
          
      <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '20vh' }}
      >
          <Grid item xs={12} md={12} container justifyContent="center">
              <Button variant="contained" color="secondary" onClick={handleLogin} style={{ margin: '10px 30px 0px' }}>
                  Connexion
              </Button>
              <Button variant="contained" color="primary" onClick={navigateToRegister} style={{ margin: '10px 30px 0px' }}>
                  Créer un compte
              </Button>
          </Grid>
      </Grid>
      
      </div>
  );
}

export default Login;
