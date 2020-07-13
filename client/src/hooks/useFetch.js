import {useState, useEffect, useCallback} from 'react'
//import axios from 'axios'

import useLocalStorage from './useLocalStorage'

const useFetch = ()  => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [response,  setResponse] = useState(null)
    const [url, setUrl] = useState('')
    const [token] = useLocalStorage('token')
    const [options, setOptions] = useState({})



    const doFetch = useCallback( (url, options = {}) => {
        setUrl(url);
        setOptions(options);
        setIsLoading(true);
    },[]);

    useEffect(()=>{
        if (!isLoading) {
            return
        }

    const getData = async()=> {

            console.log("опции", options);

            try {

                const headers = options.headers ?
                    { ...options.headers,
                        authorization : token ? `Beaer ${token}` : ''} : {
                        authorization : token ? `Beaer ${token}` : ''
                    }

                const requestOptions = {
                    ...options,
                    ...{
                        headers
                    }
                }
                console.log('in Loading is:', isLoading);
            const response = await fetch(url, requestOptions)

            const data = await response.json()

            if(!response.ok){
                setError(data.message)
                setIsLoading(false)
                return error
            } else {
                setResponse(data);
                setIsLoading(false);
                return data;
            }

        } catch (e) {
            setIsLoading(false)
            setError(e.message);
            throw e
        }

      }
        getData();


        }, [isLoading, options, url, error, token])



   const clearError = useCallback(()=> setError(null), []);

    return [{isLoading, response, error, clearError}, doFetch]
}

export default useFetch;