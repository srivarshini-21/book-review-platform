import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Tabs, 
  Tab,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, loading, login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (activeTab === 0) {
        // Login
        await login({
          email: formData.email,
          password: formData.password
        });
        setSuccess('Login successful!');
      } else {
        // Signup
        await signup(formData);
        setSuccess('Signup successful! Please login');
        setActiveTab(0); // Switch to login tab
        setFormData({ email: '', password: '', username: '' }); // Clear form
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Book Review Platform
        </Typography>
  
        <Paper elevation={3} sx={{ p: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
  
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
  
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
  
          <Box component="form" onSubmit={handleSubmit}>
            {activeTab === 1 && (
              <TextField
                name="username"
                label="Username"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            )}
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange}
              required
              inputProps={{ minLength: 6 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {activeTab === 0 ? 'Login' : 'Sign Up'}
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  // If user exists, show the logged-in page
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Book Review Platform
      </Typography>

      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Welcome back, {user.username}!
        </Typography>
        <Typography>
          You can now browse books and submit reviews.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;