import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert, Link, InputAdornment, IconButton } from '@mui/material';
import { registerUser } from '../services/api';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const registerRequest = { name, email, password, contactNumber };
      await registerUser(registerRequest);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }
      }}
    >
      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={0}
          sx={{ 
            padding: 5,
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            animation: 'scaleIn 0.5s ease-out',
          }}
        >
          {/* Icon and Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box 
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                boxShadow: '0 10px 30px rgba(240, 147, 251, 0.4)',
                mb: 2,
              }}
            >
              <HowToRegIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Create Account
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b',
                fontWeight: 400,
              }}
            >
              Join us and start managing queues efficiently
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: '12px',
                  animation: 'slideInLeft 0.3s ease-out',
                }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: '12px',
                  animation: 'slideInLeft 0.3s ease-out',
                }}
              >
                {success}
              </Alert>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#f093fb' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#f093fb',
                      borderWidth: '2px',
                    }
                  }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#f093fb' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#f093fb',
                      borderWidth: '2px',
                    }
                  }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#f093fb' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#f093fb',
                      borderWidth: '2px',
                    }
                  }
                }
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="contact"
              label="Contact Number"
              type="text"
              id="contact"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: '#f093fb' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#f8fafc',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    '& fieldset': {
                      borderColor: '#f093fb',
                      borderWidth: '2px',
                    }
                  }
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<HowToRegIcon />}
              sx={{
                mt: 4,
                mb: 3,
                py: 1.5,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(240, 147, 251, 0.4)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
                  boxShadow: '0 6px 20px rgba(240, 147, 251, 0.6)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Register
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/login"
                  sx={{
                    color: '#f093fb',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#e082ea',
                    }
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;