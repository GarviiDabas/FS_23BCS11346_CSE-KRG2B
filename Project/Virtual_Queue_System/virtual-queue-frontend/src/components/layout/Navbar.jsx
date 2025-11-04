import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Title (links to home) */}
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Virtual Queue System
        </Typography>

        {/* Conditional Buttons */}
        {isAuthenticated ? (
          <Box>
            <Typography variant="body1" component="span" sx={{ marginRight: 2 }}>
              Welcome, {user.name}
            </Typography>
            
            {/* --- THIS IS THE FIX --- */}
            {user.role === 'ROLE_ADMIN' && (
              <Button color="inherit" component={RouterLink} to="/admin/dashboard">
                Admin Dashboard
              </Button>
            )}
            
            {user.role === 'ROLE_CUSTOMER' && (
              <Button color="inherit" component={RouterLink} to="/my-token">
                My Token
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;