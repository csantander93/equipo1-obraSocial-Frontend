import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import DoctorList from '../medicalRecord/DoctorList';
import AppointmentList from '../Appointments/AppointmentsList';
import { useAuth } from '../../contexts/UserContext/AuthContext';

export default function MenuAppBar() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDoctorList, setShowDoctorList] = React.useState(false); // Estado para controlar la visibilidad de DoctorList
  const [showTurnos, setShowTurnos] = React.useState(false); // Estado para controlar la visibilidad de TurnosComponent

  const { logout } = useAuth(); // Utiliza useAuth para obtener la función logout
  const navigate = useNavigate(); // Utiliza useNavigate para redirigir


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
    setShowDoctorList(!showDoctorList); // Alterna la visibilidad de DoctorList
    setShowTurnos(false); // Oculta TurnosComponent si se muestra DoctorList
  };

  const handleTurnos = () => {
    setShowTurnos(!showTurnos); // Alterna la visibilidad de TurnosComponent
    setShowDoctorList(false); // Oculta DoctorList si se muestra TurnosComponent
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {/* Aquí puedes agregar el título o nombre de la aplicación */}
            </Typography>
            <Button color="inherit">Recetas</Button>
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
        {showDoctorList && <DoctorList />} {/* Muestra DoctorList si showDoctorList es true */}
        {showTurnos && <AppointmentList />} {/* Muestra TurnosComponent si showTurnos es true */}
      </Box>
  );
}
