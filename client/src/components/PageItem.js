import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageItem extends Component {
    render() {
        return (
            <div className="page-item">
                <div className="item-header">
                    <span>Name</span>
                </div>
                <div className="item-content">
                    <img src="https://via.placeholder.com/300" alt="product" />
                    <div className="add-to-cart">
                        <span>add to cart</span>
                    </div>
                </div>
                <div className="item-footer">
                    <div className="item-price">
                        <span>9,99 PLN </span>
                    </div>
                    <div className="item-action">
                        <Link to="/products" className="btn btn-primary" >Więcej</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageItem;
