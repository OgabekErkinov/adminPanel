import {
  Category,
  Dashboard,
  LocalOffer,
  LocationCity,
  FmdGood,
  DirectionsCar,
  MenuOutlined,
  ExitToApp,
} from '@mui/icons-material';
import { IoLogoModelS } from 'react-icons/io';
import { Box, IconButton, Stack, Typography, Avatar, Drawer, Tooltip } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const MenuBar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleExit = () => {
      localStorage.removeItem('token');
      navigate('/login');
  };

  const menuItems = [
      { name: 'categories', icon: <Category /> },
      { name: 'brands', icon: <LocalOffer /> },
      { name: 'cities', icon: <LocationCity /> },
      { name: 'locations', icon: <FmdGood /> },
      { name: 'cars', icon: <DirectionsCar /> },
      { name: 'models', icon: <IoLogoModelS /> },
  ];

  return (
      <>
          <Box height="100vh" width={open ? '250px' : '60px'} bgcolor="#272727"
              sx={{ transition: 'width 0.3s ease', display: 'flex'}}
          >
              <Stack height="100%" width="100%" justifyContent="space-between" alignItems="center" py="12px">

                  <Stack gap="12px" width="100%">
                      {menuItems.map((item, idx) => (
                          <NavLink to={`/${item.name}`} key={idx} style={{ textDecoration: 'none', width: '100%' }}>
                              <Stack direction="row" alignItems="center" gap="6px" width="100%" p={1} bgcolor={pathname === `/${item.name}` ? '#fff' : 'transparent'}>
                                  {item.icon}
                                  {open && <Typography fontSize="18px" fontWeight="600" color={pathname === `/${item.name}` ? '#272727' : '#fff'}>{item.name}</Typography>}
                              </Stack>
                          </NavLink>
                      ))}
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent={open ? 'flex-start' : 'center'} p={1} width="100%">
                      <Avatar sx={{ bgcolor: '#FFFFFF' }} />
                      {open && <Typography fontSize="18px" fontWeight="600" color="#FFFFFF">Account</Typography>}
                  </Stack>

                  <Stack direction="row" alignItems="center" justifyContent="center" p={1} width="100%">
                      <Tooltip title="Exit" arrow>
                          <IconButton onClick={handleExit} sx={{ color: '#FFFFFF' }}>
                              <ExitToApp sx={{ height: '24px' }} />
                          </IconButton>
                      </Tooltip>
                      {open && <Typography fontSize="18px" fontWeight="600" ml={1} color="#FFFFFF">Exit</Typography>}
                  </Stack>
              </Stack>
          </Box>
      </>
  );
};

export default MenuBar;
