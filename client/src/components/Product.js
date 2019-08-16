import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Loading from './Loading';

import { GET_PRODUCT } from '../queries/Queries';

class Product extends Component {

    render() {
        return (
            <section className="page-content" >
                <Query
                    query={GET_PRODUCT}
                    variables={{ id: this.props.id }}
                >
                    {({ loading, error, data }) => {
                        if(loading) return <Loading />
                        if(error) return <p>{error.message}</p>

                        const { img, name, desc, price } = data.product

                        return(
                            <div className="single-item">
                                <div>
                                    <img src={img} alt="product"/>
                                </div>
                                <div>
                                    <div>{name}</div>
                                    <p>{desc}</p>
                                    <div>
                                        <span>Cena: {price} PLN</span>
                                        <button className="btn btn-primary">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Query>
            </section>
        )
    }
}

export default Product;
