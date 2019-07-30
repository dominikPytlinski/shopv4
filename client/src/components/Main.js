import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <section className="page-header">
                <div>
                    <h2>Hasło</h2>
                    <p>Lorem ipsum dolor sit amet</p>
                    <Link to="/products" className="btn btn-primary" >Produkty</Link>
                </div>
            </section>
        )
    }
}

export default Main;
