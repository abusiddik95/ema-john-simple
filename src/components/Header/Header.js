import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import {useAuth} from '../Login/use-auth'
import { Link, Router } from 'react-router-dom';


const Header = () => {
   const auth = useAuth();
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage inventory</a>
                { auth.user &&
                    <span style={{color:'yellow'}}>Welcome {auth.user.name}
                    </span>
                }
                {
                    auth.user ? <a href="/Login">Sign Out</a>: <a href="/Login">Sign In</a>
                }
            </nav>
            
        </div>
    );
};

export default Header;