import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const navigateToLogin = () => {
      navigate('/Login');
    }
    
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateEmail = (email) => {
        // Validation d'adresse email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError('Adresse e-mail invalide');
          return false;
        }
        setEmailError('');
        return true;
    };
    
    const validatePassword = (password) => {
        // Validation du mot de passe
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
          setPasswordError('Doit contenir 8 caractères, majuscule et chiffre.');
          return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = (confirmPassword) => {
        // Validation du mot de passe
        if (confirmPassword !== password) {
          setConfirmPasswordError('Le mot de passe doit être identique.');
          return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const handleSignUp = async () => {

        // tmp test :
        console.log('Username:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        
        if (!name || !email || !password || !confirmPassword) {
            console.log('Veuillez remplir tous les champs.');
            alert('Veuillez remplir tous les champs.')
            return;
        }
        if (!validateEmail(email) || !validatePassword(password) || !validateConfirmPassword(confirmPassword)) {
            // Afficher un message d'erreur si la validation échoue
            console.log('Veuillez remplir correctement tous les champs.');
            return;
        }
        console.log('Création de compte en cours... Username:', name, 'Email:', email, 'Password:', password);
        // Mettez ici la logique de création de compte avec les valeurs de `username` et `password`

        try {
            // Utiliser Axios pour envoyer les données au serveur
            const response = await axios.post('https://localhost:5001/api/users', {
                name,
                email,
                password,
            });

            if (response.data.message === 'User created') {
                // Effectuer les actions nécessaires après l'enregistrement réussi
                console.log('Utilisateur enregistré avec succès');
            } else {
                // Gérer les erreurs d'enregistrement ici
                console.error("Échec de l'enregistrement de l'utilisateur");
            }
        } catch (error) {
            // Gérer les erreurs d'enregistrement ici
            console.error("Une erreur s'est produite lors de l'enregistrement", error);
            console.log('Server response:', error.response);
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
            <h1>Créer un compte</h1>
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
                    label="Identifiant"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    size='small'
                />
            </Grid>
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
                    error={!!emailError}
                    helperText={emailError}
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
                    error={!!passwordError}
                    helperText={passwordError}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    label="Confirmation Mot de passe"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    size='small'
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
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
                <Button variant="contained" color="primary" onClick={navigateToLogin} style={{ margin: '10px 30px 0px' }}>
                    Connexion
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSignUp} style={{ margin: '10px 30px 0px' }}>
                    Créer un compte
                </Button>
            </Grid>
        </Grid>
        
        </div>
    );
}

export default Register;