import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { registerUser } from '../services/api'; // We will add this function next

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const registerRequest = { name, email, password, contactNumber };
      await registerUser(registerRequest);
      setSuccess("Registration successful! You can now log in.");
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register Customer
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          
          <TextField
            margin="normal" required fullWidth id="name" label="Full Name"
            name="name" autoComplete="name" autoFocus
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address"
            name="email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
  margin="normal" required fullWidth name="password" label="Password"
  type="password" id="password"
  value={password} onChange={(e) => setPassword(e.target.value)}
/>
          <TextField
            margin="normal" required fullWidth name="contact" label="Contact Number"
            type="text" id="contact"
            value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}
          />
          <Button
            type="submit" fullWidth variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;