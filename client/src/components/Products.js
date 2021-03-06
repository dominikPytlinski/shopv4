import React, { Component } from 'react';
import { Query } from 'react-apollo';

import PageItem from './PageItem';
import Loading from './Loading';

import { GET_PRODUCTS } from '../queries/Queries';

class Products extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            refetch: false
        }
    }

    componentDidMount()
    {
        this.setState({ refetch: true });
    }

    render() {
        return (
            <section className="page-content" >
                <Query
                    query={GET_PRODUCTS}
                >
                    {
                        ({ loading, error, data, refetch }) => {
                            if(this.state.refetch) {refetch()}
                            if(loading) return <Loading />
                            if(error) return <p>{error.message}</p>

                            if(data) {
                                return(
                                    data.products.map(product => {
                                        return <PageItem key={product.id} product={product} />
                                    })
                                );
                            }
                        }
                    }
                </Query>
            </section>
        )
    }
}

export default Products;
