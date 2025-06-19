import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch book and reviews
  const fetchData = useCallback(async () => {
    try {
      const [bookRes, reviewsRes] = await Promise.all([
        axios.get(`http://localhost:5000/books/${id}`),
        axios.get(`http://localhost:5000/reviews/${id}`)
      ]);
      setBook(bookRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle new review submission
  const handleNewReview = () => {
    fetchData(); // Refresh both book and reviews
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!book) return <Typography>Book not found</Typography>;

  return (
    <Box>
      <Typography variant="h3">{book.title}</Typography>
      <Typography variant="h5">by {book.author}</Typography>
      <Typography>Rating: {book.averageRating || 'Not rated yet'}</Typography>
      <Typography paragraph>{book.description}</Typography>

      <Typography variant="h5" gutterBottom>Reviews</Typography>
      <ReviewForm bookId={id} onReviewSubmit={handleNewReview} />

      {reviews.map((review) => (
        <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">
            {review.userId?.username || 'Anonymous'} - {review.rating}/5
          </Typography>
          <Typography>{review.text}</Typography>
          <Typography variant="caption">
            {new Date(review.createdAt).toLocaleString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default BookDetail;