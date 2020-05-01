import  {useEffect, useContext} from 'react'


import useFetch from '../hooks/useFetch'
import {UserContext} from '../context/user'
import useLocalStorage from '../hooks/useLocalStorage'

const CurrentUserChecker = ({children}) => {

    const [{response}, doFetch] = useFetch();
    const [, setCurrentUserState] = useContext(UserContext);
    const [token] = useLocalStorage('token')

    useEffect(()=> {
        if (!token){
            setCurrentUserState(state =>(
                {
                    ...state,
                    isLoading: false
                }
            ))
        }
        doFetch('/api/v1/auth/user/',  {
            method: 'get'
        })
        setCurrentUserState(state =>(
                {
                    ...state,
                    isLoading: true
                }
        ))
    }, [token, setCurrentUserState, doFetch])

    useEffect(()=> {
        if (!response){
            return
        }
        setCurrentUserState(state =>({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response
        }))
    },[response, setCurrentUserState])

    return children

}

export default CurrentUserChecker;