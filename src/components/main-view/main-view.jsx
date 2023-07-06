import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

const onLogout = () => {
  setUser(null);
  setToken(null);
  localStorage.clear();
}

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://young-depths-90911.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie.id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name
            },
            Director: {
              Name: movie.Director.Name
            },
            Featured: movie.Featured.toString()
          };
        });
        setMovies(moviesFromApi);
      });

  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clearing token and other user data from localStorage
  };


return (
  <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center"> 
        <Routes>
         <Route
            path="/signup"
            element={
              <>
              {!user ? (
              <Navigate to="/" />
              ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                 )}
                 </>
   
               }
             />
              <Route
               path="/login"
               element={
                 <>
                   {user ? (
                     <Navigate to="/" />
                   ) : (
                      <Col md={5}>
                        <LoginView
                          onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                          }}
                          onLogout={onLogout} // Corrected prop name
                          />
                          </Col>
                         )}
                         </>
           
                       }
                     />
                       <Route
                            path="/movies/:movieId"
                            element={
                              <>
                                {!user ? (
                                  <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                  <Col>The list is empty!</Col>
                                ) : (
                                  <Col md={8}>
                                    <MovieView movies={movies} />
                                  </Col>
                                )}
                              </>
                            }
                          />   
                        <Route
                          path="/"
                          element={
                            <>
                              {!user ? (
                                <Navigate to="/login" replace />
                              ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                              ) : (
                                <>
                                  {movies.map((movie) => (
                                    <Col className="mb-4" key={movie.id} md={3}>
                                      <MovieCard movie={movie} />
                                    </Col>
                                  ))}
                                </>
                              )}
                            </>
                          }
                        />
                      </Routes>
                      {user && (
                          <Col md={1}>
                              <Button
                                  variant="secondary"
                                  onClick={onLogout}
                              >
                                  Logout
                              </Button>
                          </Col>
                   )}
                    </Row>
                  </BrowserRouter>
                );
              };