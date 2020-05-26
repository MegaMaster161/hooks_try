import React, {useContext, Fragment} from "react";
import {Link} from "react-router-dom";
import './index.css';
import {UserContext} from "../../context/user";



const NavBar = () => {

    const [currentUserState] = useContext(UserContext);


    const {isLoggedIn} = currentUserState
    console.log('isLoggedIn', isLoggedIn)
    return (
    <header className='navbar__header'>
      <figure className='navbar__logo'>
          <img src='/img/logo2.svg' alt='logo'/>
      </figure>
      <nav className='navbar__links'>
          <div className='container-fluid'>
              <ul className='navbar__list'>
                  <li className='navbar__list-item'>
                      <Link to='/article/1'>Статья</Link>
                  </li>
                  {
                    isLoggedIn === false && (
                        <Fragment>
                            <li className='navbar__list-item'>
                                <Link to='/login'>Авторизация</Link>
                            </li>
                            <li className='navbar__list-item'>
                                <Link to='/register'>Регистрация</Link>
                            </li>
                        </Fragment>
                    )
                  }

                  <li className='navbar__list-item'>
                      <Link to='/'>Домой</Link>
                  </li>
              </ul>
          </div>
      </nav>
        <nav className='navbar__main'>
        Menu
        </nav>
    </header>
    );
};
export default NavBar;