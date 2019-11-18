import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/styles.css';
import {useFetchGet} from './utils/useFetch';
import CardGames from './Components/CardGames';
import Button from './Components/Button';
import GameFamilies from './Components/GameFamilies';

// Global Vars
const API_URL = "http://localhost:3001/";

function App() {
  // Count to create unique url calls 
  const [count, setCount] = useState(0)
  // Main Content state
  const [state, setState] = useState("")

  const handleClick = (event) => {
    setCount(i => i + 1)
    let getApiUrl = API_URL + `cardgame/all?reqId=${count}`
    const navTypes = {
      "cardgame": <CardGames cardUrl={getApiUrl} />,
      "review": <p>Review</p>,
      "gamefamily": <GameFamilies props={{cardGameUrl: getApiUrl}}/>,
      "variant": <p>Variant</p>
    }
    event.preventDefault();
    setState(navTypes[event.target.value])
  }

  const navBarButtons = [
    {
      onclick: handleClick,
      value: "cardgame",
      name: "Cardgames"
    },
    {
      onclick: handleClick,
      value: "review",
      name: "Reviews"
    },
    {
      onclick: handleClick,
      value: "gamefamily",
      name: "Game Families"
    },
    {
      onclick: handleClick,
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
