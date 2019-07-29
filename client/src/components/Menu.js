import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <NavLink to="/" exact activeClassName="selected" >Główna</NavLink>
                <NavLink to="/products" activeClassName="selected" >Producty</NavLink>
                <NavLink to="/login" activeClassName="selected" >Login</NavLink>
            </div>
        )
    }
}

export default Menu;
