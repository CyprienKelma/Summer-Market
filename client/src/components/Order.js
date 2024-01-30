import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const buttonWidth = '200px'; // Vous pouvez ajuster cette valeur selon vos besoins

export default function Order() {
  return (
    <Box
      sx={{
        position: 'absolute', // ou 'fixed' si le footer est fixe
        bottom: '70px', // ajustez ceci à la hauteur de votre footer
        left: 0,
        right: 0,
        width: '100%', // La box prendra toute la largeur
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1, // marge autour de chaque bouton
        },
      }}
    >
      {/* Ajout de la propriété variant pour avoir des bordures */}
      <Button variant="outlined" sx={{ width: buttonWidth, mb: 2 }}>Scan article</Button>
      <Button variant="outlined" sx={{ width: buttonWidth }}>Payer panier</Button>
    </Box>
  );
}