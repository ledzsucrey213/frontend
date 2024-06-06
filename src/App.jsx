import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
