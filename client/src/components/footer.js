import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


export default function Footer() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
        case 'NewOrder':
            navigate("/order");
            break;
        case 'Items':
            navigate("/items");
            break;
        case 'Account':
          navigate("/account");
          break;
        }
    };

  return (
    <div className="app-container">

      <BottomNavigation
        sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#daab3a' }}
        value={value}
        onChange={handleChange}
        showLabels={false}  // Assure-toi que showLabels est défini sur false pour éviter le chevauchement des labels
        className="footer"
      >
        <BottomNavigationAction
          label="New Order"
          value="NewOrder"
          icon={<AddCircleOutlineIcon sx={{ fontSize: 32 }} />}
          sx={{ '&.Mui-selected': { color: '#2E7D32' } }}  // Change la couleur pour l'onglet actif
        />
        <BottomNavigationAction
          label="Items"
          value="Items"
          icon={<LocalGroceryStoreIcon sx={{ fontSize: 32 }} />}
          sx={{ '&.Mui-selected': { color: '#2E7D32' } }}  // Change la couleur pour l'onglet actif
        />
        <BottomNavigationAction
          label="Account"
          value="Account"
          icon={<AccountCircle sx={{ fontSize: 32 }} />}
          sx={{ '&.Mui-selected': { color: '#2E7D32' } }}  // Change la couleur pour l'onglet actif
        />

      </BottomNavigation>
    </div>
  );
}
