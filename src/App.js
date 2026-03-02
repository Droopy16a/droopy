import './App.css';
import Main from './Main';
import CursorPosition from './CursorPosition';

function App() {
  var cursor = CursorPosition();
  const gradientX = cursor.x == null ? "50%" : `${cursor.x}px`;
  const gradientY = cursor.y == null ? "50%" : `${cursor.y}px`;
  return (
    <div className="App" style={{ background: `radial-gradient(circle at ${gradientX} ${gradientY},rgba(9, 21, 54, 1) 0%, rgba(2, 7, 24, 1) 60%)` }}>
      <Main />
    </div>
  );
}

export default App;
