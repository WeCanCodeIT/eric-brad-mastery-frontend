import React, {useState, useEffect} from 'react';
import {useFetchGet} from '../utils/useFetch';
// Styles
import '../styles/styles.css';
// Images
import singleCard from '../img/single_player.png';
import doubleCard from '../img/deuce.png';
import tripleCard from '../img/three_players.png';
import fourCard from '../img/four_players.png';
import manyCard from '../img/many_players.png';

function CardGame({props}) {
  const cardAttr = {
    single: [singleCard, "Single-Player Games"],
    double: [doubleCard, "Two-Player Games"],
    triple: [tripleCard, "Three-Player Games"],
    four: [fourCard, "Four-Player Games"],
    many: [manyCard, "Several-Player Games"]
  }

  return (
    <div className="cardgame-card">
      <img 
        className="cardgame-img" 
        src={cardAttr[props.players][0]}
        alt={cardAttr[props.players][1]}
      ></img>
      <h2 className="cardgame-title">
        {cardAttr[props.players][1]}
      </h2>
    </div>
  )

}



// Card Game component
function CardGames({cardUrl}) {
    const [allGames, setCardGames] = useState({games: "", isFetching: true});
    const {data, loading} = useFetchGet(cardUrl);
    
  
    // useEffect(() => {
    //   // setCardGames({games: allGames.games, isFetching: true})
    //   // const getUrl = API_URL + `cardgame/all?reqId=${reqCount}`
    //   const getCardGames = async () => {
    //     setCardGames({games: data, isFetching: loading})
    //   }
    //   getCardGames();
    // }, [cardUrl])
  
  
    return (
      <div className="cardgames-wrapper">
        <h2 className="main-subtitle">Card Games</h2>
        { !data ? "Fetching data..." :
          data.cardGames && data.cardGames.map((item, index) =>
            <CardGame props={item} key={index}/>)}
      </div>
    )
  }

  export default CardGames