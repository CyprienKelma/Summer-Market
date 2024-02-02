import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import Header from './header';
import Footer from './footer';
 
const Account = () => {
  const [openForm, setOpenForm] = useState(false);
  const [montant, setMontant] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate pour la navigation
 
  const handleOpenForm = () => {
    setOpenForm(true);
  };
 
  const handleCloseForm = () => {
    setOpenForm(false);
  };
 
  const handleAjouterArgent = () => {
    console.log(`Ajouter ${montant} euros d'argent`);
    handleCloseForm();
  };
 
  const handleHistorique = () => {
    // Naviguer vers la page historique lorsque le bouton est cliquÃ©
    navigate('/historique');
  };
 
  const handleProfil = () => {
    console.log("Afficher le profil");
  };
 
  return (
    <div>
      {/* <Header /> */}
      <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Gestion de l'argent</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: 'auto', marginLeft: 'auto' }}>
          <Button variant="contained" color="primary" onClick={handleOpenForm} style={{ marginTop: '40px' }}>
            Ajouter de l'argent
          </Button>
          <Button variant="contained" color="primary" onClick={handleHistorique} style={{ marginTop: '40px' }}>
            Historique
          </Button>
          <Button variant="contained" color="primary" onClick={handleProfil} style={{ marginTop: '40px' }}>
            Profil
          </Button>
        </div>
      </div>
 
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Ajouter de l'argent</DialogTitle>
        <DialogContent>
          <TextField
            label="Montant (en euros)"
            variant="outlined"
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAjouterArgent}
            style={{ marginTop: '10px' }}
          >
            Ajouter
          </Button>
        </DialogContent>
      </Dialog>
 
      <Footer />
    </div>
  );
};
 
export default Account;