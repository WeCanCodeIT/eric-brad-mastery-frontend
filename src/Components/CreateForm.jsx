import React, {useState} from 'react';
import Selection from './Selection';
import '../styles/styles.css';
import {useFetchGet} from '../utils/useFetch';

// Global Vars
const API_URL = "http://localhost:3001/";

async function getMoreData(url, method="GET") {
    const response = await fetch(url, {
        method: method || "GET",
        headers: {"Accept": "application/json"}
    })
    const data = await response.json();
    return data;
}

const formChildProps = {
    cardgame: {
        resName: "cardGame",
        valueName: "cardGameId",
        textProperty: "name",
        valueProperty: "_id",
        type: "Card Game",
        childArray: "family"
    },
    gamefamily: {
        resName: "gameFamily",
        valueName: "familyId",
        textProperty: "name",
        valueProperty: "_id",
        type: "Game Family",
        childArray: "games"
    },
    gamevariant: {
        valueName: "variantId",
        textProperty: "name",
        valueProperty: "_id",
        type: "Game Variant",
        childArray: "reviews"
    },
    review: {

    }
}

function CreateForm ({cardGameUrl}) {
    const [subSelection, setSubSelection] = useState("");

    const {data} = useFetchGet(cardGameUrl);

    const handleSelection = (event) => {
        const val = event.target.value;
        const name = event.target.name;
        const apiUrl = `${API_URL}${name}/${val}`;
        getMoreData(apiUrl)
        .then(res => {
            const itemProps = formChildProps[name]
            console.log(itemProps);
            const data = res[itemProps.resName]
            setSubSelection(
                <Selection
                    itemArray={data[itemProps.childArray]}
                    valueName="familyId"
                    textProperty="name"
                    valueProperty="_id"
                    type={itemProps.type}
                    callback={handleSelection}
                    callbackName="cardfamily"
                />
            )
        })
    }
    
    return (
        <div>
            {!data ? "Loading..." : 
                <div className="create-form">
                    <form id="create">
                    </form>
                    <Selection 
                        itemArray={data.cardGames}
                        valueName="cardGameId"
                        textProperty="players"
                        valueProperty="_id"
                        type="Card Game"
                        callback={handleSelection}
                        callbackName="cardgame"
                    />
                    {subSelection}
                </div>
            }
        </div>
    )
}

export default CreateForm;