import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} style={{ width: '100%' }} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div> 
        <div>
          <span>Author: </span>
          <span>{movie.author}</span>
        </div>
        <button
          onClick={onBackClick}
          className="back-button"
          style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    );
  };

