import React from "react";
import {Switch, Route} from 'react-router-dom';

import Home from "./pages/home";
import Article from "./pages/article";
import Auth from "./pages/auth";
import AddArticle from "./pages/add-article";


const Routes = () => {
    return (
      <Switch>
          <Route path ='/' component={Home} exact />
          <Route path = '/article/:id' component={Article}/>
          <Route path = '/add/article' component={AddArticle}/>
          <Route path = '/login' component={Auth}/>
          <Route path = '/register' component={Auth}/>
      </Switch>
    );
}
export default Routes;