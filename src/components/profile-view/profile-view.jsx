import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import { ModalHeader } from "react-bootstrap";

export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
  // Check if user is defined, otherwise set default values
  const initialUsername = user ? user.username : "";
  const initialEmail = user ? user.Email : "";
  const initialBirthday = user ? user.BirthDate : "";

  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [birthday, setBirthday] = useState(initialBirthday || ""); // Initialize with an empty string
  const [showModal, setShowModal] = useState(false);

  // Conditionally filter favoriteMovies only if user and FavoriteMovies property are defined
  const favoriteMovies =
    user && user.FavoriteMovies
      ? movies.filter((movie) => user.FavoriteMovies.includes(movie.id))
      : [];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit triggered");

    const data = {
      Username: username,
      Password: password,
      Email: email,
      BirthDate: birthday,
    };

    fetch(`https://young-depths-90911.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed.");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        alert("Update successful.");
      });
  };

  const handleDeleteUser = () => {
    fetch(`https://young-depths-90911.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        onLogout();
      } else {
        alert("something went wrong.");
      }
    });
  };

  return (
    <>
      <h1>Profile</h1>
      <Row>
        <Col>
          <div>Username: {user.username}</div>
          <div>Email: {user.Email}</div>
        </Col>
      </Row>
      <Row>
        <h3>Update your profile information here.</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Form>
      </Row>
      <Row>
        <h3>Favorite movies:</h3>
        {favoriteMovies.map((movie) => (
          <Col className="mb-5" key={movie.id} md={4}>
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>
      <Button variant="primary" onClick={handleShowModal}>
        Delete my account
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account permanantly?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
