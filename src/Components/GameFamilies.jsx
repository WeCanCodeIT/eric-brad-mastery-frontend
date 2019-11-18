import React, {useState, useEffect} from 'react';
import {useFetchGet} from '../utils/useFetch';
import '../styles/styles.css';
import Button from './Button';

const API_URL = "http://localhost:3001/";

const PlayerSelection = ({props}) => {
    const {playerArray, onchange} = props
    return (
        <select
            onChange={onchange}
        >
            {playerArray.map((item, index) =>
                <option 
                    key={index} 
                    value={item._id}
                > 
                    {item.players}
                </option>
            )}
        </select>
    )
}

const GameFamilyCards = ({url}) => {
    
    const [content, setContent] = useState(null);
    const {data, loading} = useFetchGet(url);
    
    
    
    return (
        <div className="family-cards--wrapper">
            { !data ? "Loading..." : 
                data.cardGame && data.cardGame.family && data.cardGame.family[0] &&
                    data.cardGame.family.map((fam, index) => 
                        <div key={index} className="family-card">
                            <h3 className="family-card--name">{fam.name}</h3>
                            {fam.games.length > 0 ?
                                <div className="family-card--variants">
                                    <h4 className="family-card--">Game Variants</h4>
                                    <ul className="family-card--list">
                                        {fam.games.map((game, i) => 
                                            <li className="family-card--list-item" key={i}>{game.name}</li>
                                        )}
                                    </ul>
                                </div> :
                            <p>No Game variants defined yet!</p> 
                            }
                        </div>)
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
        <div className="gameFamilies">
            <form>
                { !data ? "Fetching data..." :
                    data.cardGames && <PlayerSelection props={{playerArray: data.cardGames, onchange: handleSelect}}/>
                }
            </form>
            {selection}
        </div>
    )
}

export default GameFamilies;