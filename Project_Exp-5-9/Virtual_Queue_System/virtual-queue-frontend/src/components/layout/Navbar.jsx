import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* App Title with Icon */}
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: 32, mr: 1.5 }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(to right, #ffffff 0%, #f0f0f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Virtual Queue
            </Typography>
          </Box>

          {/* Navigation Buttons */}
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* User Info */}
              <Box 
                sx={{ 
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  px: 2,
                  py: 0.5,
                  mr: 1,
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    mr: 1,
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 500,
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
              
              {/* Admin Dashboard Button */}
              {user.role === 'ROLE_ADMIN' && (
                <Button 
                  component={RouterLink} 
                  to="/admin/dashboard"
                  startIcon={<DashboardIcon />}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    px: 2.5,
                    py: 0.8,
                    fontWeight: 600,
                    textTransform: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  Dashboard
                </Button>
              )}
              
              {/* My Token Button */}
              {user.role === 'ROLE_CUSTOMER' && (
                <Button 
                  component={RouterLink} 
                  to="/my-token"
                  startIcon={<ConfirmationNumberIcon />}
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    px: 2.5,
                    py: 0.8,
                    fontWeight: 600,
                    textTransform: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }
                  }}
                >
                  My Token
                </Button>
              )}

              {/* Logout Button */}
              <Button 
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  px: 2.5,
                  py: 0.8,
                  fontWeight: 600,
                  textTransform: 'none',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(239, 68, 68, 0.35)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button 
              component={RouterLink} 
              to="/login"
              startIcon={<LoginIcon />}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;