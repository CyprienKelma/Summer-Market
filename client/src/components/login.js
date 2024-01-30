import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Login() {
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate('/Register');
  }
  const handleLogin = () => {
    console.log('Connexion en cours...');
    // Mettez ici la logique de connexion avec les valeurs de `username` et `password`
  };
  return (
    <div>
      <h1>Bienvenue sur notre page d'accueil</h1>
      // Ajoutez ici plus de contenu pour votre page d'accueil
    
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Connexion
      </Button>
      <Button variant="contained" color="secondary" onClick={navigateToRegister}>
        Créer un compte
      </Button>
    </div>
  );
}

export default Login;
