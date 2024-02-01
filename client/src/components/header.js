import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from 'axios';


export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const email = localStorage.getItem('email'); // Récupérez l'email de l'utilisateur

    const isAuthenticated = () => {
      return !!localStorage.getItem('token');
  };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
      // Effectuez ici la logique de déconnexion
      localStorage.removeItem('token'); // Supprimez le token de localStorage
      localStorage.removeItem('email'); // Assurez-vous de supprimer l'email
      handleClose(); // Fermez le menu
      // Vous devrez peut-être rediriger l'utilisateur ou forcer une mise à jour de l'application
  };
  
    // À l'intérieur de votre composant Header
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
      const loadWallet = async () => {
        const email = localStorage.getItem('email'); // Assurez-vous que l'email est stocké lors de la connexion
        if (email) {
          try {
            console.log('test');
            const response = await axios.get(`https://192.168.1.50:5001/api/users/wallet/${email}`);
            console.log('Réponse de l\'API:', response.data);
            setWallet(response.data.wallet);
          } catch (error) {
            console.error("Erreur lors de la récupération du solde", error);
          }
        }
      };

      loadWallet();
    }, []);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#dccb80' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color : '#3f576e'}}>
            Summer Market {email && `: ${email}`} - Solde : {wallet} €
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Admin</MenuItem>
                {isAuthenticated() && (<MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>)}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
}