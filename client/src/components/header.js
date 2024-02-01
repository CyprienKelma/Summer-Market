import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const email = localStorage.getItem('email'); // Récupérez l'email de l'utilisateur
    const navigate = useNavigate();
  
    const isAuthenticated = () => {
      return !!localStorage.getItem('token');
  };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAdmin = () => {
      navigate("/admin");
      handleClose();
    };
  
    const handleLogout = () => {
      // Effectuez ici la logique de déconnexion
      localStorage.removeItem('token'); // Supprimez le token de localStorage
      localStorage.removeItem('email'); // Assurez-vous de supprimer l'email
      handleClose(); // Fermez le menu
      // Vous devrez peut-être rediriger l'utilisateur ou forcer une mise à jour de l'application
    };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#dccb80' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color : '#3f576e'}}>
              Summer Market {email && `: ${email}`}
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
                <MenuItem onClick={handleAdmin}>Admin</MenuItem>
                {isAuthenticated() && (<MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>)}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
}