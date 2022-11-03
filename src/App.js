import logo from './logo.svg';
import pokedexttop from './img/pokedex-01.png'
import pokedextbottom from './img/pokedex-02.png'
import './App.css';
import Pokedex from './components/Pokedex';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="left-container"></div>
      <div className="pokedex-container">
        <div className="top-pokedex">
          <img src={pokedexttop}/>
        </div>
        <div className="screen-pokedex">
          <Pokedex/>
          <Navbar/>
        </div>
        <div className="bottom-pokedex">
          <img src={pokedextbottom}/>
        </div>
      </div>
      <div className="right-container"></div>
    </div>
  );
}

export default App;
