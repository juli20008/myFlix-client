import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
  let { movieId } = useParams();
  let [ isFavorite, setIsFavorite ] = useState(false);

  useEffect(() => {
     const isFavorited = user.FavoriteMovies.includes(movieId)
     setIsFavorite(isFavorited)
    }, [movieId, user.FavoriteMovies]);

  function removeFavorite () {
      fetch(`https://young-depths-90911.herokuapp.com/users/${user.username}/${movieId}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      }).then((response) => {
          if (response.ok) {
              return response.json()
          }
      }).then((data) => {
          setIsFavorite(false);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
      })
  };

  function addToFavorite () {
      fetch(`https://young-depths-90911.herokuapp.com/users/${user.username}/${movieId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      }).then((response) => {
          if (response.ok) {
              return response.json()
          }
      }).then((data) => {
          setIsFavorite(true);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
      })
  }

  let movie = movies.find((m) => m.id === movieId);

  return (
     <div>
             {isFavorite ? (
              <Button onClick={removeFavorite}>Remove from favorites</Button>
          ) : (
              <Button onClick={addToFavorite}>Add to favorites</Button>
          )}

          <Link to={"/"}>
          <Button>Back</Button>
          </Link>
      </div>
  )
}