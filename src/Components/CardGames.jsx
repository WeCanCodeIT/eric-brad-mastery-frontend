import React, {useState, useEffect} from 'react';
import {useFetchGet} from '../utils/useFetch';
// Styles
import '../styles/styles.css';
// Images
import singleCard from '../img/new/cardImagesPNG/AS.png';
import doubleCard from '../img/new/cardImagesPNG/2H.png';
import tripleCard from '../img/new/cardImagesPNG/3D.png';
import fourCard from '../img/new/cardImagesPNG/4C.png';
import manyCard from '../img/new/cardImagesPNG/honor_heart-14.png';

function CardGame({props}) {
  const cardAttr = {
    single: [singleCard, "Single-Player Games"],
    double: [doubleCard, "Two-Player Games"],
    triple: [tripleCard, "Three-Player Games"],
    four: [fourCard, "Four-Player Games"],
    many: [manyCard, "Several-Player Games"]
  }

  return (
    <div className="cardgame-wrapper">
      <a href={`#${props.item.players}`} 
        value={props.value}
        onClick={props.onclick}
      >
        <img 
          className="cardgame-img" 
          src={cardAttr[props.item.players][0]}
          alt={cardAttr[props.item.players][1]}
          value={props.value}
          ></img>
      </a>
      <a href={`#${props.item.players}`} 
        value={props.value}
        onClick={props.onclick}
      >
        <h2 className="cardgame-title" value={props.value}>
          {cardAttr[props.item.players][1]}
        </h2>
      </a>
      </div>
  )

}

function CardGames({props}) {
  const callback = props.callback;
    const [allGames, setCardGames] = useState({games: "", isFetching: true});
    const {data} = useFetchGet(props.cardUrl);
   
    return (
      <div>
        <h2 className="main-subtitle">Card Games</h2>
        <div className="cardgames-wrapper">
          { !data ? "Fetching data..." :
            data.cardGames && data.cardGames.map((item, index) =>
              // console.log(item)
              <CardGame props={{onclick: callback, item: item, value: item._id}} key={index}/>
            )}
        </div>

      </div>
    )
  }

  export default CardGames