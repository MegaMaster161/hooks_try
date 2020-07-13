import React, {useContext, useEffect} from "react";
import './index.css';
import {useState} from 'react';
import useFetch from '../../hooks/useFetch';
import {Redirect} from 'react-router-dom';
import {UserContext} from "../../context/user";
import useLocalStorage from '../../hooks/useLocalStorage'


const Auth = (props) => {
    // Мишура для работы с рендером объектов
    const isLogin = props.match.path === '/login';
    const pageTitle = isLogin ? 'Авторизироваться' : 'Зарегистрироваться';

//    const descriptionLink = isLogin ? '/register' : '/login';
//    const descriptionText = isLogin ? 'Тебе нужен акк?':'У тебя есть акк? Авторизируйся, бро!';
    const apiUrl = isLogin ? '/api/v1/auth/login/' : '/api/v1/auth/reg/';
    const [{isLoading, error, response, clearError}, doFetch] = useFetch();

    //Работа с состоянием приложения
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [, setToken] = useLocalStorage('token')
//    const [, dispatch] = useContext(UserContext)
    const [currentUserState, setCurrentUserState] = useContext(UserContext);

    console.log('currentUserState', currentUserState.isLoggedIn)


    const handlerSumbit = event => {

        event.preventDefault()

       const candidate = isLogin ? { email, password} : {email, password, username};

       let body = JSON.stringify({user: {
               ...candidate
          }});




        console.log(body);

        doFetch(apiUrl, { method: 'post',
                        ...{headers:{
                        "Content-Type" : 'application/json;charset=utf-8'
                            }
                        },
                           body });
        clearError();
     //   console.log('values', email, password)
    }


    useEffect( ()=>{
       if(!response){
           return
       }

       setToken(response.token)
        setCurrentUserState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response
        }))

       console.log('Response', response);


    }, [response, setToken, setCurrentUserState]);

    if (currentUserState.isLoggedIn){
        return <Redirect to='/'/>
    }


    return (
        <main className="login__form">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">{pageTitle}</div>
                            {error && (<p color='red'>{error}</p>)}
                            <div className="card-body">
                                <form encType="application/json" onSubmit={handlerSumbit}>
                                    {!isLogin && (
                                    <div className="form-group row">
                                        <label htmlFor='email_address' className="col-md-4 col-form-label text-md-right">Имя пользователя</label>
                                        <div className="col-md-6">

                                            <input
                                                type="username"
                                                id="username"
                                                className="form-control"
                                                placeholder="Имя пользователя"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>)
                                    }

                                    <div className="form-group row">
                                      <label htmlFor='email_address' className="col-md-4 col-form-label text-md-right">E-Mail</label>
                                        <div className="col-md-6">

                                            <input
                                                type="email"
                                                id="email_address"
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Пароль</label>
                                        <div className="col-md-6">
                                            <input type="password"
                                                   id="password"
                                                   className="form-control"
                                                   placeholder="Password"
                                                   value={password}
                                                   onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    


                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember"/> Запомнить меня
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 offset-md-4">
                                        <button
                                            disabled={isLoading}
                                            type="submit"
                                        >
                                            {pageTitle}
                                        </button>

                                    </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
</div>

</main>

);
}

export default Auth;