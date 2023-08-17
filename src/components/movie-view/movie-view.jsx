// ./components/movie-view
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId);
    setIsFavorite(isFavorited);
  }, [movieId, user.FavoriteMovies]);

  function removeFavorite() {
    fetch(
      `https://young-depths-90911.herokuapp.com/users/${user.username}/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  }

  function addToFavorite() {
    fetch(
      `https://young-depths-90911.herokuapp.com/users/${user.username}/${movieId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  }

  const movie = movies.find((movie) => movie.id === movieId);

  return (
    <div>
      {/*       <div>
        <span>
          <img src={movie.ImagePath} width="30%" />
        </span>
      </div> */}

      <div>
        <span>Title: </span>
        <span> {movie.Title} </span>
      </div>
{/* 
      <div>
        <span>Director: </span>
        <span> {movie.Director.Name} </span>
      </div> */}
      {/* 
      <div>
        <span>Genre: </span>
        <span> {movie.Genre} </span>
      </div> */}

      {/*    <div>
        <span>Director: </span>
        <span> {movie.Director} </span>
      </div> */}

      {/*   <div>
        <span>Featured: </span>
        <span> {movie.Featured} </span>
      </div> */}

      {isFavorite ? (
        <Button onClick={removeFavorite}>Remove from favourite movies</Button>
      ) : (
        <Button onClick={addToFavorite}>Add to my favorite movies</Button>
      )}

      <Link to={`/`}>
        <Button>Back</Button>
      </Link>
    </div>
  );
};
