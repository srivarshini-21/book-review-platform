const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate user and get userId from token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get reviews for a book
router.get('/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('userId', 'username'); // This will include username in userId
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new review
router.post('/', authMiddleware, async (req, res) => {
  // Validate request body
  if (!req.body.bookId || !req.body.rating || !req.body.text) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      required: ['bookId', 'rating', 'text']
    });
  }

  // Validate ID formats
  if (!mongoose.Types.ObjectId.isValid(req.body.bookId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // Validate rating range
  if (req.body.rating < 1 || req.body.rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Validate text length
  if (req.body.text.trim().length < 10) {
    return res.status(400).json({ message: 'Review text must be at least 10 characters' });
  }

  try {
    const review = new Review({
      bookId: req.body.bookId,
      userId: req.userId, // Set from token
      rating: req.body.rating,
      text: req.body.text.trim()
    });

    const newReview = await review.save();
    
    // Update book's average rating
    const bookReviews = await Review.find({ bookId: req.body.bookId });
    const averageRating = bookReviews.reduce((sum, review) => sum + review.rating, 0) / bookReviews.length;
    await Book.findByIdAndUpdate(req.body.bookId, { averageRating });
    
    res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview,
      averageRating: parseFloat(averageRating.toFixed(1))
    });
  } catch (err) {
    console.error('Review submission error:', err);
    res.status(400).json({ 
      message: 'Validation failed',
      details: err.errors || err.message 
    });
  }
});

// Add this DELETE endpoint
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Recalculate average rating
    const bookReviews = await Review.find({ bookId: review.bookId });
    const averageRating = bookReviews.length > 0 
      ? bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
      : 0;

    await Book.findByIdAndUpdate(review.bookId, { averageRating });

    res.json({ 
      message: 'Review deleted',
      newAverage: averageRating 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;