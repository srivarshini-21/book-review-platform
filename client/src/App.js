import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} /> {/* Add this line */}
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;