import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import NavBar from "./components/navbar";
import {UserProvider} from "./context/user";
import Routes from "./routes";
import CurrentUserChecker from "./service/currentUserChecker";


const App = () => {


  return (
      <UserProvider>
          <CurrentUserChecker>
          <Router>
                 <NavBar/>
                 <Routes/>
              </Router>
          </CurrentUserChecker>
      </UserProvider>

  )
}

export default App;
