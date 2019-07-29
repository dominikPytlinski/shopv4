import React, { Component } from 'react'
import Menu from './Menu';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="brand">
                    <span>Company Name</span>
                </div>
                <Menu isLogged={this.props.isLogged}/>
            </header>
        )
    }
}

export default Header;
