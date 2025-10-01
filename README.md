# Readify - Learning Platform

A fully-featured learning platform built with Node.js, Express, EJS, MongoDB, and Bootstrap.

## Features

- User authentication (register, login, logout)
- Browse library with 10+ categories
- 100+ books across multiple categories
- Book details with descriptions, authors, and cover images
- Like books and leave comments
- Personal dashboard showing reading list
- Track reading progress
- Responsive design with Bootstrap

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Template Engine**: EJS
- **Styling**: Bootstrap 5
- **Authentication**: Express Session with bcrypt

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running locally

3. Seed the database with sample data:
```bash
npm run seed
```

4. Start the server:
```bash
npm start
```

5. Open your browser and visit:
```
http://localhost:3000
```

## Database Structure

### Collections

1. **users**: User accounts with authentication
2. **categories**: 10 book categories
3. **books**: 100+ books with details
4. **comments**: User comments on books
5. **userbooks**: User reading lists

## Usage

1. **Home Page**: View featured categories and platform information
2. **Library**: Browse all categories
3. **Category Page**: View all books in a specific category
4. **Book Page**: See book details, like, comment, and add to reading list
5. **Login/Register**: Create an account or sign in
6. **Dashboard**: View your profile and reading list

## Routes

- `/` - Home page
- `/library` - All categories
- `/library/category/:id` - Books in a category
- `/library/book/:id` - Book details
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (protected)
- `/logout` - Logout

## Categories

1. Programming
2. Business
3. Science
4. History
5. Self-Help
6. Fiction
7. Mathematics
8. Art & Design
9. Psychology
10. Philosophy

Each category contains 10 books with titles, descriptions, authors, and cover images.
