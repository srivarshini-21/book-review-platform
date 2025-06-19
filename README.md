# Book Review Platform

A full-stack book review application built with React, Node.js, Express, and MongoDB.

Book Review Platform Screenshots <br>
Login/Signup Page <br>
<img src="https://github.com/user-attachments/assets/47d43f5f-e064-48bb-b157-9be09d807f91" alt="Login" width="400" height="300">

Books Page <br>
<img src="https://github.com/user-attachments/assets/48f74e73-7092-4853-930a-3ee0282524e2" alt="Books" width="400" height="300">

Reviews Page <br>
<img src="https://github.com/user-attachments/assets/53725109-6cd1-42dc-8dfb-a1518c088c2a" alt="Reviews" width="400" height="300">

Profile page <br>
<img src="https://github.com/user-attachments/assets/5cb01893-39e8-439f-92fd-dcdfafce65b1" alt="Profile" width="400" height="300">


## Features

- **Browse Books**: View all available books with cover images
- **Book Details**: See complete information about each book
- **Reviews System**: Read and write reviews with star ratings
- **User Profiles**: View and edit user information
- **Search Functionality**: Find books by title or author
- **Responsive Design**: Works on mobile, tablet, and desktop

## Technologies Used

- **Frontend**: React, Material-UI, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: RESTful design

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or higher) installed
- MongoDB (local or Atlas cluster) set up
- Git installed

## Installation

Follow these steps to set up the development environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-review-platform.git
   cd book-review-platform
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

## Configuration

1. Create a `.env` file in the `server` directory with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/book-review
   PORT=5000
   ```

2. For production, use a proper MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/book-review?retryWrites=true&w=majority
   ```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm start
   ```

3. Open your browser to [http://localhost:3000](http://localhost:3000)


## API Endpoints

| Method | Endpoint         | Description                         |
|--------|------------------|-------------------------------------|
| GET    | `/api/books`     | Get all books                       |
| GET    | `/api/books/:id` | Get a single book                   |
| POST   | `/api/books`     | Add a new book (admin only)         |
| GET    | `/api/reviews/:id` | Get reviews for a book            |
| POST   | `/api/reviews`   | Add a new review                    |
| GET    | `/api/users/:id` | Get user profile                    |
| PUT    | `/api/users/:id` | Update user profile                 |

## Project Structure

```
book-review-platform/
├── client/                  # React Frontend
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
├── server/                  # Node.js Backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   └── index.js            # Server entry point
└── README.md                # This file
```

## Deployment

### Option 1: Full Stack Deployment (Recommended)

1. **Backend**: Deploy to [Render](https://render.com) or [Heroku](https://heroku.com)
2. **Frontend**: Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. **Database**: Use [MongoDB Atlas](https://www.mongodb.com/atlas/database)

### Option 2: All-in-One Deployment

1. Build the frontend (`npm run build` in client directory)
2. Serve the frontend from the backend (see Production Build section)
3. Deploy the entire project to:
   - [Render](https://render.com)
   - [Heroku](https://heroku.com)
   - [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)

## Environment Variables

For security, don't commit your `.env` file. Here are the variables you need:

- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: For authentication (if implementing auth)

## Contact

For questions or support, please contact:

Srivarshini R S - srivarshini0402@gmail.com  
Project Link: [https://github.com/srivarshini-21/book-review-platform](https://github.com/srivarshini-21/book-review-platform)
