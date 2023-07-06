import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { MovieCard } from "./components/movie-card/movie-card";

// Import statement to indicate that you need to bundle `./index.scss`
import Container from 'react-bootstrap/Container';
import "./index.scss";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
 };
 
 const container = document.querySelector("#root");
 const root = createRoot(container);
 root.render(<App />);