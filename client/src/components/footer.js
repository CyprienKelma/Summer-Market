import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function Footer() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="app-container"> {/* Ajoutez une div pour encapsuler le contenu */}

      <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0 }} value={value} onChange={handleChange} className="footer">
        <BottomNavigationAction
          label="New Order"
          value="NewOrder"
          icon={<AddCircleOutlineIcon />}
        />
        <BottomNavigationAction
          label="Items"
          value="Items"
          icon={<LocalGroceryStoreIcon />}
        />
        <BottomNavigationAction
          label="Account"
          value="Account"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </div>
  );
}
