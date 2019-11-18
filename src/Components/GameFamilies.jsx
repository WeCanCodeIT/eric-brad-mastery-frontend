import React, {useState, useEffect} from 'react';
import {useFetchGet} from '../utils/useFetch';
import '../styles/styles.css';
import Button from './Button';
import Selection from './Selection';

const API_URL = "http://localhost:3001/";

const GameFamilyCard = ({family}) => {
    return (
        <div className="family-card">
            <h4 className="family-card--title">{family.name}</h4>
            {family.games.length === 0 ? 
                `No variants currently exist for ${family.name}` : 
                <ul className="family-card--games">
                {family.games.map((game, index) => 
                    <li className="family-card--games-item">
                        {game.name}
                    </li>
                )}
                </ul>
            }
        </div>
    )
}

const GameFamilyCards = ({game}) => {
    
    const [content, setContent] = useState(null);
 
    return (
        <div className="family-wrapper">
            {game.family.length === 0 ? 
                <p className="main-message">Sorry, no families exist yet for '{game.players}' game types...</p> :
                game.family.map((family, index) => 
                    <GameFamilyCard key={index} family={family}/>
                )
            }
        </div>
    )
}

const GameFamilies = ({props}) => {
    const [selection, setSelection] = useState(null);
    const {data, loading} = useFetchGet(props.cardGameUrl);
    
    const handleSelect = (event) => {
        let getFamiliesUrl = `${API_URL}cardgame/${event.target.value}`;
        setSelection(<GameFamilyCards url={getFamiliesUrl}/>)
    }

    return (
        <div >
            {!data ? "Loading..." : data.cardGame &&
                <div className="families">
                    <h2 className="main-subtitle">{cardAttr[data.cardGame.players]}</h2>
                    <GameFamilyCards game={data.cardGame}/>
                </div>
            }
        </div>
    )
}

const cardAttr = {
    single: "Single-Player Games",
    double: "Two-Player Games",
    triple: "Three-Player Games",
    four: "Four-Player Games",
    many:"Several-Player Games"
  }

export default GameFamilies;


    // Old Format for building card families from nav
    //*
    // const GameFamilies = ({props}) => {
    //     const [selection, setSelection] = useState(null);
    //     const {data, loading} = useFetchGet(props.cardGameUrl);
        
    //     const handleSelect = (event) => {
    //         let getFamiliesUrl = `${API_URL}cardgame/${event.target.value}`;
    //         setSelection(<GameFamilyCards url={getFamiliesUrl}/>)
    //     }
    
    //     return (
    //         <div className="gameFamilies">
    //             <form>
    //                 { !data ? "Fetching data..." :
    //                     data.cardGames && <PlayerSelection props={{playerArray: data.cardGames, onchange: handleSelect}}/>
    //                 }
    //             </form>
    //             {selection}
    //         </div>
    //     )
    // }

    // const GameFamilyCards = ({url}) => {
    
    //     const [content, setContent] = useState(null);
    //     const {data, loading} = useFetchGet(url);
     
    //     return (
    //         <div className="family-cards--wrapper">
    //             { !data ? "Loading..." : 
    //                 data.cardGame && data.cardGame.family && data.cardGame.family[0] &&
    //                     data.cardGame.family.map((fam, index) => 
    //                         <div key={index} className="family-card">
    //                             <h3 className="family-card--name">{fam.name}</h3>
    //                             {fam.games.length > 0 ?
    //                                 <div className="family-card--variants">
    //                                     <h4 className="family-card--">Game Variants</h4>
    //                                     <ul className="family-card--list">
    //                                         {fam.games.map((game, i) => 
    //                                             <li className="family-card--list-item" key={i}>{game.name}</li>
    //                                         )}
    //                                     </ul>
    //                                 </div> :
    //                             <p>No Game variants defined yet!</p> 
    //                             }
    //                         </div>)
    //             }
    //         </div>
    //     )
    // }

    // const PlayerSelection = ({props}) => {
    //     const {playerArray, onchange} = props
    //     return (
    //         <select
    //             onChange={onchange}
    //         >
    //             {playerArray.map((item, index) =>
    //                 <option 
    //                     key={index} 
    //                     value={item._id}
    //                 > 
    //                     {item.players}
    //                 </option>
    //             )}
    //         </select>
    //     )
    // }

 