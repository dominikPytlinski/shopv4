import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                {
                    (this.props.isLogged) ?
                    <Fragment>
                        <NavLink to="/" exact activeClassName="selected" >Główna</NavLink>
                        <NavLink to="/users" activeClassName="selected" >Użytkownicy</NavLink>
                        <NavLink to="/products" activeClassName="selected" >Produkty</NavLink>
                        <NavLink to="/add-product" activeClassName="selected" >Dodaj Produkt</NavLink>
                        <NavLink to="/logout" activeClassName="selected" >Wyloguj</NavLink>
                    </Fragment> :
                    <Fragment>
                        <NavLink to="/" exact activeClassName="selected" >Główna</NavLink>
                        <NavLink to="/products" activeClassName="selected" >Produkty</NavLink>
                        <NavLink to="/login" activeClassName="selected" >Zaloguj</NavLink>
                    </Fragment>
                }
            </div>
        )
    }
}

export default Menu;
