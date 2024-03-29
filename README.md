# myFlix-Client

## Objective

Using React, build the client-side for an app called myFlix based on its
existing server-side code (REST API and database).
![img1920](https://github.com/juli20008/myFlix-client/blob/d9ade107bb2e38f877ed44302467680672515aff/MyFlix.PNG)

## Demo

The deployed app can be viewed [here.](https://mysuperflix.netlify.app/)

## Description
This is a React application that allows users to browse and interact with a collection of movies. Users can search for movies, view movie details, add movies to their favorites, and discover similar movies.

### Key Features

_Main View_

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

_Single Movie View_

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

_Login View_

- Allows users to log in with a username and password

_Signup View_

- Allows new users to register (username, password, email, date of birth)

_Profile View_

- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Getting Started

### Tech Stack

- React
- JSX
- Bootstrap
- Parcel as the build tool

### Development Environment

- npm install -g parcel
- npm install -save react react-dom
- create a src folder in project directory with three files: index.jsx, index.scss, index.html
- run parcel src/index.html in terminal to begin parcel build
