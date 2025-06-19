import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import your AuthContext hook

const Profile = () => {
  const { user } = useAuth(); // Get user from context
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Optionally, send a PUT request to update user profile here
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <Typography variant="h5">You are not logged in.</Typography>;
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom>Your Profile</Typography>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
          <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={() => setEditMode(false)}>
            Cancel
          </Button>
        </form>
      ) : (
        <div>
          <Typography variant="h5">Username: {user.username}</Typography>
          <Typography variant="h5">Email: {user.email}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;