import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={book.coverImage}
        alt={book.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography color="textSecondary">
          by {book.author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" sx={{ mt: 1 }}>
          {book.description?.substring(0, 100)}...
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Rating: {book.averageRating || 'Not rated yet'}
        </Typography>
      </CardContent>
      <Button
        component={Link}
        to={`/books/${book._id}`}
        size="small"
        color="primary"
        sx={{ mb: 1 }}
      >
        View Details
      </Button>
    </Card>
  );
};

export default BookCard;