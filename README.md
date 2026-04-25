# Movie App 

## About

This is a full stack movie application built using React, Node.js, Express, and MongoDB.

The app allows users to manage movies, create users, and add reviews linked to both movies and users. It demonstrates how to build a complete system with relational data using MongoDB.

This application solves the problem of managing and organizing movie collections with user reviews in a structured way.

---

## Features

###  Movies

* Add a new movie
* View all movies
* Update a movie
* Delete a movie
* ⭐ Filter movies by genre

###  Users

* Add users
* View users

###  Reviews

* Add reviews linked to movies and users
* View reviews with populated movie and user data
* Get reviews by user
* Delete reviews

###  UI

* Loading and error handling
* Auto refresh every few seconds

---

## Technologies Used

* React (Vite)
* Node.js
* Express
* MongoDB Atlas
* Mongoose

---

## Database Design

The application uses three collections:

* **Movies**
* **Users**
* **Reviews**

### Relationships:

* Each review references a movie and a user using `ObjectId`
* Data is linked between collections
* `populate()` is used to retrieve related data (movie title, user name, etc.)

---

## API Endpoints

### Movies

* `GET /api/movies`
* `GET /api/movies?genre=Action` ⭐ (filter by genre)
* `POST /api/movies`
* `PUT /api/movies/:id`
* `DELETE /api/movies/:id`

### Users

* `GET /api/users`
* `POST /api/users`

### Reviews

* `GET /api/reviews`
* `POST /api/reviews`
* `GET /api/reviews/user/:userId`
* `DELETE /api/reviews/:id`

---

## How to Run the Project

### 1. Clone the project

```bash
git clone <your-repo-link>
cd movie-app
```

### 2. Install dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Run the project

```bash
npm run dev
```

---

## Project Structure

The backend follows a structured pattern:

* routes → controllers → models
* Routes handle API endpoints
* Controllers contain business logic
* Models define database schemas

---

## Notes

This project helped me understand:

* How frontend and backend communicate using APIs
* How to structure a backend using controllers
* How to use MongoDB with Mongoose
* How to create relationships between collections using ObjectId
* How to use `populate()` to fetch related data
