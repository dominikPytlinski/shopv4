import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PageItem extends Component {
    render() {

        const { id, name, price, img } = this.props.product;

        return (
            <div className="page-item">
                <div className="item-header">
                    <span>{name}</span>
                </div>
                <div className="item-content">
                    <img src={img} alt="product" />
                    <div className="add-to-cart">
                        <span>add to cart</span>
                    </div>
                </div>
                <div className="item-footer">
                    <div className="item-price">
                        <span>{price} PLN </span>
                    </div>
                    <div className="item-action">
                        <Link to={`/product/${id}`} className="btn btn-primary" >Więcej</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageItem;
