import React, {useState, useEffect} from 'react';
import {useFetchGet} from '../utils/useFetch';

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

  export default Button;