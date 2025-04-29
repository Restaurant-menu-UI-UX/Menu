import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Badge,
  Box,
  Container,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  alpha,
  useScrollTrigger,
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Restaurant as RestaurantIcon,
  LocalOffer as OffersIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Helper component for navbar scroll behavior
const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'background.paper' : 'transparent',
      borderBottom: trigger ? 'none' : '1px solid',
      borderColor: trigger ? 'transparent' : 'divider',
      transition: '0.3s',
    },
  });
};

const Layout = ({ cartItemsCount }) => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { text: 'Menu', icon: <RestaurantIcon />, path: '/' },
    { text: 'Special Offers', icon: <OffersIcon />, path: '/offers' },
    { text: 'Contact', icon: <PhoneIcon />, path: '/contact' },
  ];

  const restaurantInfo = [
    { icon: <TimeIcon />, text: 'Open: 11:00 - 23:00' },
    { icon: <PhoneIcon />, text: '(555) 123-4567' },
    { icon: <LocationIcon />, text: '123 Pizza Street' },
  ];

  return (
    <>
      <ElevationScroll>
        <AppBar 
          position="fixed" 
          color="inherit"
          sx={{
            backgroundColor: isScrolled ? 'background.paper' : 'transparent',
          }}
        >
          {/* Top Info Bar */}
          <Box 
            sx={{ 
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              py: 1,
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Container maxWidth="xl">
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Box sx={{ display: 'flex', gap: 4 }}>
                  {restaurantInfo.map((info, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        fontSize: '0.875rem'
                      }}
                    >
                      {info.icon}
                      {info.text}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    color="inherit" 
                    size="small"
                    startIcon={<PhoneIcon />}
                  >
                    Order by Phone
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>

          {/* Main Navbar */}
          <Container maxWidth="xl">
            <Toolbar sx={{ py: 1 }}>
              {/* Mobile Menu Icon */}
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Button
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  textTransform: 'none',
                  color: 'primary.main',
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                <RestaurantIcon sx={{ fontSize: 32 }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Pizza Paradise
                </Typography>
              </Button>

              {/* Desktop Navigation */}
              <Box sx={{ 
                ml: 4,
                display: { xs: 'none', md: 'flex' },
                gap: 2,
                flexGrow: 1
              }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: 'text.primary',
                      borderRadius: 2,
                      px: 2,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: 2,
                        bgcolor: 'primary.main',
                        transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                        transition: '0.3s',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              {/* Right Side Actions */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/cart"
                  variant="contained"
                  startIcon={
                    <Badge badgeContent={cartItemsCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Cart
                  </Box>
                </Button>

                <IconButton
                  onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                  sx={{ 
                    ml: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <PersonIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: 280 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            Pizza Paradise
          </Typography>
          <Divider />
          <List>
            {navigationItems.map((item) => (
              <ListItem 
                key={item.text}
                component={RouterLink}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: location.pathname === item.path ? 
                    alpha(theme.palette.primary.main, 0.1) : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            {restaurantInfo.map((info, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 2,
                  color: 'text.secondary'
                }}
              >
                {info.icon}
                <Typography variant="body2">
                  {info.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        PaperProps={{
          sx: { width: 200, mt: 1.5 }
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LocationIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Addresses</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Toolbar spacer */}
      <Toolbar />
      <Box sx={{ height: { xs: 0, md: 40 } }} />
    </>
  );
};

export default Layout; 