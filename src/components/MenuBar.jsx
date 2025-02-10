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
import { Box, Button, Stack, Typography, Avatar, Drawer, IconButton, Tooltip } from '@mui/material';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

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
          {/* Menu button for small screens (fixed to top) */}
          <IconButton
              onClick={() => setOpen(true)}
              sx={{
                  position: 'fixed',
                  top: 16,
                  left: 16,
                  zIndex: 1300,
                  color: '#FFFFFF',
                  display: { xs: 'block', md: 'none' },
              }}
          >
              <MenuOutlined />
          </IconButton>

          {/* Sidebar for large screens */}
          <Box
              height="100vh"
              width={open ? '250px' : '60px'}
              bgcolor="rgb(95, 94, 94)"
              sx={{ transition: 'width 0.3s ease', display: { xs: 'none', md: 'flex' } }}
          >
              <Stack height="100%" width="100%" justifyContent="space-between" alignItems="center" py="12px">
                  <Stack width="100%" alignItems="center">
                      <Link to="/dashboard" style={{ textDecoration: 'none', width: '100%' }}>
                          <Stack
                              direction="row"
                              justifyContent="center"
                              alignItems="center"
                              gap="6px"
                              width="100%"
                              p={1}
                              bgcolor={pathname === `/dashboard` ? 'white' : 'transparent'}
                          >
                              <Dashboard sx={{ color: pathname === `/dashboard` ? 'rgb(95, 94, 94)' : '#ffffff' }} />
                              {open && (
                                  <Typography fontSize="20px" fontWeight="600" color={pathname === `/dashboard` ? 'rgb(95, 94, 94)' : '#ffffff'}>
                                      Dashboard
                                  </Typography>
                              )}
                          </Stack>
                      </Link>
                  </Stack>

                  <Stack gap="12px" width="100%">
                      {menuItems.map((item, idx) => (
                          <NavLink to={`/${item.name}`} key={idx} style={{ textDecoration: 'none', width: '100%' }}>
                              <Stack
                                  direction="row"
                                  justifyContent={open ? 'flex-start' : 'center'}
                                  alignItems="center"
                                  width="100%"
                                  p={1}
                                  bgcolor={pathname === `/${item.name}` ? 'white' : 'transparent'}
                              >
                                  {item.icon}
                                  {open && (
                                      <Typography fontSize="18px" fontWeight="600" color={pathname === `/${item.name}` ? 'rgb(95, 94, 94)' : '#ffffff'}>
                                          {item.name}
                                      </Typography>
                                  )}
                              </Stack>
                          </NavLink>
                      ))}
                  </Stack>

                  <Stack direction="row" width="100%" alignItems="center" justifyContent={open ? 'flex-start' : 'center'} p={1}>
                      <Avatar sx={{ bgcolor: '#FFFFFF' }} />
                      {open && <Typography fontSize="18px" fontWeight="600" color="#FFFFFF">Account</Typography>}
                  </Stack>

                  {/* Exit button with tooltip for small screens */}
                  <Stack direction="row" width="100%" alignItems="center" justifyContent="center" p={1}>
                      <Tooltip title="Exit" arrow>
                          <IconButton onClick={handleExit} sx={{ color: '#FFFFFF' }}>
                              <ExitToApp sx={{ height: '24px' }} />
                          </IconButton>
                      </Tooltip>
                      {open && <Typography fontSize="18px" fontWeight="600" ml={1} color="#FFFFFF">Exit</Typography>}
                  </Stack>
              </Stack>
          </Box>

          {/* Drawer for small screens */}
          <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{ display: { xs: 'block', md: 'none' } }}>
              <Box width="250px" height="100vh" bgcolor="rgb(95, 94, 94)" p={2}>
                  <Stack gap={2}>
                      <IconButton onClick={() => setOpen(false)}>
                          <MenuOutlined sx={{ color: '#FFFFFF' }} />
                      </IconButton>

                      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                          <Stack direction="row" alignItems="center" gap={1} bgcolor={pathname === `/dashboard` ? 'white' : 'transparent'} p={1}>
                              <Dashboard sx={{ color: pathname === `/dashboard` ? 'rgb(95, 94, 94)' : '#ffffff' }} />
                              <Typography fontSize="20px" fontWeight="600" color={pathname === `/dashboard` ? 'rgb(95, 94, 94)' : '#ffffff'}>
                                  Dashboard
                              </Typography>
                          </Stack>
                      </Link>

                      {menuItems.map((item, idx) => (
                          <NavLink to={`/${item.name}`} key={idx} style={{ textDecoration: 'none' }}>
                              <Stack direction="row" alignItems="center" gap={1} bgcolor={pathname === `/${item.name}` ? 'white' : 'transparent'} p={1}>
                                  {item.icon}
                                  <Typography fontSize="18px" fontWeight="600" color={pathname === `/${item.name}` ? 'rgb(95, 94, 94)' : '#ffffff'}>
                                      {item.name}
                                  </Typography>
                              </Stack>
                          </NavLink>
                      ))}

                      <Stack direction="row" alignItems="center" gap={1} p={1}>
                          <Avatar sx={{ bgcolor: '#FFFFFF' }} />
                          <Typography fontSize="18px" fontWeight="600" color="#FFFFFF">Account</Typography>
                      </Stack>

                      <Button onClick={handleExit} sx={{ color: '#FFFFFF' }}>
                          <ExitToApp sx={{ height: '24px' }} />
                          <Typography fontSize="18px" fontWeight="600" ml={1}>Exit</Typography>
                      </Button>
                  </Stack>
              </Box>
          </Drawer>
      </>
  );
};

export default MenuBar;
