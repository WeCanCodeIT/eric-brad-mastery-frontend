import React, {useState, useEffect} from 'react';
import './App.css';
import './styles/styles.css';
const API_URL = "http://localhost:3001/"

// Card Game component
function CardGames() {
  const [allGames, setCardGames] = useState({games: "", isFetching: true});

  useEffect(() => {
    // setCardGames({games: allGames.games, isFetching: true})
    const getCardGames = async () => {
      const response = await fetch(API_URL + "cardgame/all", {
        method: "GET",
        mode: "cors",
        headers: {"Accept": "application/json"}
      })
      const cardGames = await response.json();
      setCardGames({games: cardGames, isFetching: false})
    }
    getCardGames();
  }, [])


  return (
    <div className="main--cardgame-wrapper">
      <h2 className="main-subtitle">Card Games</h2>
      {console.log(allGames.games)}
      { allGames.games.length === 0 ? allGames.games.cardGames && allGames.games.cardGames.map((game, i) => <p key={i}>{game.players}</p>) : "nuthin"}
    </div>
  )
}

function Button({props}) {
  const content = props.name;
  return (
    <button 
      className="navbutton"
      type="button"
      onClick={props.onclick}
      value={props.value}
      key={props.key}
    >
      {content}
    </button>
  )
}

function App() {

  const handleClick = (event) => {
    const navTypes = {
      "cardgame": <CardGames />,
      "review": <p>Review</p>,
      "gamefamily": <p>Game Family</p>,
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

  // State
  const [state, setState] = useState("")

  return (
    <div className="App">
      <header className="App-header">
          <h1 className="App-header__title">Card Games Database (title pending)</h1>
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
