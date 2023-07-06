// Here you import the PropTypes library
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

  // Here is where we define all the props constraints for the BookCard
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  };