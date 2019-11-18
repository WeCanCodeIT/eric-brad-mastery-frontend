import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/styles.css';
import {useFetchGet} from './utils/useFetch';
import CardGames from './Components/CardGames';
import Button from './Components/Button';
import GameFamilies from './Components/GameFamilies';
import CreateForm from './Components/CreateForm';

// Global Vars
const API_URL = "http://localhost:3001/";

function App() {
  // Count to create unique url calls 
  const [count, setCount] = useState(0)
  // Main Content state
  const [state, setState] = useState("")

  const handleNavClick = (event) => {
    setCount(i => i + 1)
    let getApiUrl = API_URL + `cardgame/all?reqId=${count}`
    const navTypes = {
      "cardgame": <CardGames props={{cardUrl: getApiUrl, callback: handleCardGameClick}} />,
      "create": <CreateForm cardGameUrl={getApiUrl} />,
      "gamefamily": <GameFamilies props={{cardGameUrl: getApiUrl}}/>,
      "variant": <p>Variant</p>
    }
    event.preventDefault();
    setState(navTypes[event.target.value])
  }

  // const handleFormSubmit = (event) => {

  // }

  const handleCardGameClick = (event) => {
    event.preventDefault();
    let apiUrl = `${API_URL}cardgame/${event.currentTarget.getAttribute('value')}`;
    setState(<GameFamilies props={{cardGameUrl: apiUrl}}/>)
  }

  const navBarButtons = [
    {
      onclick: handleNavClick,
      value: "cardgame",
      name: "Cardgames"
    },
    {
      onclick: handleNavClick,
      value: "create",
      name: "Create"
    },
    {
      onclick: handleNavClick,
      value: "gamefamily",
      name: "Game Families"
    },
    {
      onclick: handleNavClick,
      value: "variant",
      name: "Game Variants"
    }
  ]

  return (
    <div className="App">
      <header className="App-header">
          <h1 className="App-header__title">Card Games Database</h1>
          <div className="App-header__nav">
            { navBarButtons.map((button, index) => <Button key={index} props={button}/>)}
          </div>
      </header>
      <div className="main-wrapper">
        {state}
      </div>
    </div>
  );
}

export default App;
