import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Storefront from '@mui/icons-material/Storefront';
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
        //   break;
        // case 'Account':
        //   navigate("/account");
           break;
        case 'Market-Place':
          navigate("/marketplace");
          break;
        }
    };

  return (
    <div className="app-container"> {/* Ajoutez une div pour encapsuler le contenu */}

      <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0}} value={value} onChange={handleChange} className="footer">
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
        <BottomNavigationAction
          label="Market-Place"
          value="Market-Place"
          icon={<Storefront />}
        />
      </BottomNavigation>
    </div>
  );
}
