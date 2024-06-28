import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/UserContext/AuthContext';
import LogoAlMedin from '../../images/LogoAlMedin.png';

export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate(); // Utiliza useNavigate para redirigir

  const { logout } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al usuario a la página de login
  };

  const handleCartillaMedica = () => {
    navigate('/DoctorList'); // Navega a la ruta de Cartilla Medica
  };

  const handleTurnos = () => {
    navigate('/AppointmentList'); // Navega a la ruta de Turnos
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={LogoAlMedin} alt="Logo" style={{ height: 80, marginRight: 10 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Aquí puedes agregar el título o nombre de la aplicación */}
          </Typography>
          <Button color="inherit" onClick={handleCartillaMedica}>Cartilla Medica</Button>
          <Button color="inherit" onClick={handleTurnos}>Turnos</Button>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
