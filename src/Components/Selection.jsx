import React from 'react';
import '../styles/styles.css';



const Selection = ({itemArray, valueName, textProperty, valueProperty, type, callback=null, callbackName, apiUrl=null}) => {
    

    return (
        <select className="selection" onChange={callback ? callback : ""} name={callbackName}>
            <option name={valueName} value={null}>{`Select ${type}`}</option>
            {itemArray.map((item, index) =>
                <option key={index} value={item[valueProperty]}>{item[textProperty]}</option>
            )}
        </select>
    )
}

export default Selection;