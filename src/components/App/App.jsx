import Dashboard from '../Dashboard/Dashboard';
import Grid from '../Grid/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      This is an interactive pathfinder
      <div className="content-container">
        <Dashboard />
        <Grid />
      </div>
    </div>
  );
}

export default App;
