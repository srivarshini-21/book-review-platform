import React, { useState } from 'react';
import { TextField, Button, Rating, Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  // Form state
  const [rating, setRating] = useState(3);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!text.trim() || text.trim().length < 10) {
      setAlert({
        open: true,
        message: 'Review must be at least 10 characters',
        severity: 'error'
      });
      return;
    }

    setSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token'); // <-- Use actual token

      if (!token) {
        setAlert({
          open: true,
          message: 'You must be logged in to submit a review.',
          severity: 'error'
        });
        setSubmitting(false);
        return;
      }

      await axios.post(
        'http://localhost:5000/reviews',
        {
          bookId,
          rating,
          text: text.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Reset form
      setText('');
      setRating(3);
      setAlert({
        open: true,
        message: 'Review submitted successfully!',
        severity: 'success'
      });

      // Trigger parent to refresh reviews
      if (onReviewSubmit) onReviewSubmit();

    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Failed to submit review',
        severity: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography component="legend">Your Rating</Typography>
      <Rating
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        precision={0.5}
      />
      <TextField
        label="Your Review"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={submitting}
        sx={{ mt: 2 }}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </Button>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReviewForm;