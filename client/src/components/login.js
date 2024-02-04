import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';
const config = require('../ipconfig');

function Login() {
    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate('/Register');
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSignIn = async () => {
        if (!email || !password) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await axios.post(`https://${config.ipServer}:${config.port}/login`, {
                email,
                password,
            });
            console.log("AHHHHhhh");
            console.log(response.data.message); 
            if (response.data.message === 'Login successful') {
                // Stocker le token dans localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', email); // Stockez l'email
                localStorage.setItem('userId', response.data.user._id); // Stockez l'ID de l'utilisateur
                // Perform the necessary actions after successful login
                console.log('Connexion réussie');
                // Redirect to home page or dashboard
                navigate('/Home');
            } else {
                // Handle login errors here
                setLoginError(response.data.message);
            }
        } catch (error) {
            // Handle login errors here
            console.error("Une erreur s'est produite lors de la connexion", error);
            setLoginError(error.response.data.message || "Une erreur s'est produite");
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
                        error={!!loginError}
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
                        error={!!loginError}
                        helperText={loginError}
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
                    <Button variant="contained" color="primary" onClick={handleSignIn} style={{ margin: '10px 30px 0px' }}>
                        Connexion
                    </Button>
                    <Button variant="contained" color="secondary" onClick={navigateToRegister} style={{ margin: '10px 30px 0px' }}>
                        Créer un compte
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
