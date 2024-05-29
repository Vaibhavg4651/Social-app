## Social App Project ( You can access the live website here: https://stunning-tiramisu-06eb8c.netlify.app/)

This Social app project is a full-featured social media application that replicates the core functionalities of Twitter. It is built using modern web development technologies and demonstrates how to create a scalable and robust application with features like pagination, liking posts, and JWT authentication.

Features:

User Authentication and Authorization:
JWT Authentication: Secure login and registration using JSON Web Tokens (JWT) to ensure only authenticated users can access certain features.
User Registration: New users can create an account by providing necessary details.
User Login: Existing users can log in using their credentials to access the platform.

User Profiles:
Profile Management: Users can view and update their profile information including profile picture and bio.
Follow/Unfollow: Users can follow or unfollow other users to see their posts in the feed.

Posts:
Create Posts: Authenticated users can create new posts.
Like Posts: Users can like posts. The like count is updated in real-time.
Post Pagination: Posts are paginated with infinite Scrolling for improved performance and user experience, loading more posts as the user scrolls down.

Feed:
User Feed: Users can view posts from people they follow in a chronological order.
Infinite Scroll: Implemented pagination with infinite scroll to load more posts as the user reaches the bottom of the page.


Technologies Used:

Frontend:

React.js: For building the user interface.
Redux: For state management.
React Router: For client-side routing.
Axios: For making HTTP requests.
Tailwind: For writing CSS
DaisyUI: For using ready-made tailwind components

Backend:

Node.js: For the server-side runtime environment.
Express.js: For building the RESTful API.
MongoDB: As the database to store user and post data.
Mongoose: For object data modeling (ODM) with MongoDB.

Authentication:

JWT: For secure authentication and authorization

## Prerequisites
## FRONTEND
[![React](https://img.shields.io/badge/React-%5E17.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%5E14.0.0-green)](https://nodejs.org/)

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/vaibhavg4651/Social-app
cd Client
npm install
npm start
```

## BACKEND
## Setting Environment Variables
* Place the .env file in the root folder in Server.
* change the environament variable values according to the above database settings.

## Environment Variables
set these environment variables in the .env file
```bash
PORT=
SECRET_KEY=
MONGO_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Setting Project
```bash
cd Server
npm install
npm start
```
## Some Major Routes

## Register user

```bash
    route: http://127.0.0.1:8001/v1/api/register
    request : {
        
        "name":"Vabhav",
        "user_email":"vai465@gmail.com",
        "user_password":"12376564",
        "user_name":"vaibhavg"

        }

    response: {
    "success": true,
    "message": {
        "name": "Vaibhav",
        "user_email": "vaibhavg4651@gmail.com",
        "user_password": "$2a$10$pNJQuv7k.qVF7LEMJxo0EuGd1bDnHWDNdLpFZidsl.HuQJPmVb9Ca",
        "user_name": "vaibhavg4651",
        "user_photo_url":"googleimages@photo_url",
        "user_bio":"Hey vaibhav this side",
        "user_followers": [],
        "user_following": [],
        "post_ids": [],
        "_id": "883ec7fb-4c5d-435a-b7ed-b4fddfe96b05",
        "created_on": "2024-05-23T09:35:16.373Z",
        "__v": 0
    }
```
## Login

```bash
    route: http://127.0.0.1:8001/v1/api/login
    request : {
        "email":"vaibhavg4651@gmail.com",
        "password":"your password"
    }

    response: {
        "success": true,
        "message": {
            "_id": "883ec7fb-4c5d-435a-b7ed-b4fddfe96b05",
            "name": "Vaibhav",
            "user_email": "vaibhavg4651@gmail.com",
            "user_password": "$2a$10$pNJQuv7k.qVF7LEMJxo0EuGd1bDnHWDNdLpFZidsl.HuQJPmVb9Ca",
            "user_name": "vaibhavg4651",
            "user_photo_url": "iushdiuhiauh",
            "user_bio": "hasdiuhaishdiuhiuahiduh",
            "user_followers": [],
            "user_following": [],
            "post_ids": [],
            "created_on": "2024-05-23T09:35:16.373Z",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4ODNlYzdmYi00YzVkLTQzNWEtYjdlZC1iNGZkZGZlOTZiMDUiLCJpYXQiOjE3MTY0NTc2MTAsImV4cCI6MTcxNjQ2MTIxMH0.Wlrp0sNEfHekKySttHUec8gw91y4bJlF23rco1z4fBA"
    }
```

## Add Post

```bash
    route: http://127.0.0.1:8001/v1/api/post
    request : {
            "user_id":"883ec7fb-4c5d-435a-b7ed-b4fddfe96b05" , 
            "name":"vaibhav", 
            "user_name":"vaibhavg4651", 
            "user_photo_url":"iushdiuhiauh" , 
            "description":"This is my first post"
        }

    response: {
        "success": true,
        "message": {
        "user_id": "883ec7fb-4c5d-435a-b7ed-b4fddfe96b05",
        "name": "vaibhav",
        "user_name": "vaibhavg4651",
        "user_photo_url": "iushdiuhiauh",
        "description": "This is my first post",
        "likes": 0,
        "count_comments": 0,
        "_id": "9eb81a02-b685-4d91-9f2e-15bcbbdd41e8",
        "created_on": "2024-05-25T05:34:36.760Z",
        "__v": 0
    }
}
```