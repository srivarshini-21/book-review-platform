const mongoose = require('mongoose');
const Book = require('./models/Book');
const Review = require('./models/Review');

mongoose.connect('mongodb://localhost:27017/book-review');

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream.",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A powerful story of racial injustice and moral growth.",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg"
  }
];

const seedDB = async () => {
  await Book.deleteMany({});
  await Book.insertMany(sampleBooks);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();