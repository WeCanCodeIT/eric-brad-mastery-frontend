import {useEffect, useState} from 'react'

export const useFetchGet = (url) => {
    const [state, setState] = useState({data: null, loading: true})

    useEffect(() => {
        setState({ data: null, loading: true})
        const fetchRequest = async (url) => {
            const fetchOptions = {method: "GET", headers: {"Accept": "application/json"}}
            // Set mode to 'cors' if backend is local
            if (url.match(/(localhost|127\.0\.0\.1)/i)) { fetchOptions.mode = "cors" }             
            const rawResponse = await fetch(url, fetchOptions)
            const response = await rawResponse.json();
            setState({data: response, loading: false})
        }
        fetchRequest(url);
    }, [url])

    return state;
}