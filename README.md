#  Movie App

##  About

This is a full stack movie application built using **React, Node.js, Express, and MongoDB**.

The application allows users to manage movies, create users, and add reviews linked to both movies and users. It demonstrates how to build a complete system with relational data using MongoDB.

This project solves the problem of organizing movie collections and associating them with user-generated reviews in a structured and scalable way.

---

##  Features

###  Movies

Add a new movie
*View all movies
*Update a movie
*Delete a movie
*Filter movies by genre

###  Users

Add users
View users

###  Reviews

Add reviews linked to movies and users
View reviews with populated movie and user data
Get reviews by user
Delete reviews

###  UI

Clean and simple user interface
Loading and error handling
Auto refresh every few seconds

###  Architecture

Clean backend structure using **MVC pattern**
Separation of concerns:

Routes → handle endpoints
Controllers → handle logic
Models → define schemas

---

##  Technologies Used

React (Vite)
Node.js
Express
MongoDB Atlas
Mongoose

---

##  Database Design

The application uses three main collections:

Movies
Users
Reviews

###  Relationships

Each review references a movie and a user using `ObjectId`
Data is linked between collections
populate()` is used to retrieve related data (movie title, user name, etc.)

---

##  API Endpoints

###  Movies

`GET /api/movies`
`GET /api/movies?genre=Action` (filter by genre)
`POST /api/movies`
`PUT /api/movies/:id`
`DELETE /api/movies/:id`

###  Users

`GET /api/users`
`POST /api/users`

###  Reviews

`GET /api/reviews`
`POST /api/reviews`
`GET /api/reviews/user/:userId`
`DELETE /api/reviews/:id`

---

##  Seed Data

The project includes a seed script to populate the database with sample data (movies, users, and reviews).

To run the seed:

```bash
cd server
node seed.js
```

---

##  How to Run the Project

### 1️ Clone the project

```bash
git clone <your-repo-link>
cd movie-app
```

### 2️ Install dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 3️ Run the project

```bash
npm run dev
```

---


## Environment Setup

Create a `.env` file inside the `server` folder and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Example:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/movie-app
PORT=5000
---

##  Project Structure

The backend follows a clean structure:

```
routes → controllers → models
```

Routes handle API endpoints
Controllers contain business logic
Models define database schemas

---

##  Notes

This project helped me understand:

How frontend and backend communicate using APIs
How to structure a backend using controllers
How to use MongoDB with Mongoose
How to create relationships between collections using ObjectId
How to use `populate()` to fetch related data

---

##  Conclusion

This project demonstrates a complete full stack application with clean architecture, working API, and connected frontend and backend. It highlights best practices in structuring a scalable and maintainable system.
