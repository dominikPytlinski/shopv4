import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Mutation from 'react-apollo/Mutation';
import { toast } from 'react-toastify';

import AddProductForm from './AddProductForm';
import Loading from './Loading';

import { ADD_PRODUCT_MUTATION } from '../queries/Queries';

import 'react-toastify/dist/ReactToastify.css';

class AddProduct extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isAdded: false
        }
    }

    notify = (name) => {
        toast.success(`Product ${name} was added successfuly`);
    }

    render()
    {
        return(
            <Fragment>
                {
                    (this.props.isLogged) ?
                        <Mutation
                            mutation={ADD_PRODUCT_MUTATION}
                            onCompleted={data => {
                                this.setState({ isAdded: true });
                                this.notify(data.addProduct.name);
                            }}
                        >
                            {
                                (addProduct, { loading, error, data }) => {
                                    if(loading) return <Loading />
                                    if(error) return <p>{error.message}</p>

                                    return(
                                        <AddProductForm addProduct={addProduct}/>
                                    )
                                }
                            }  
                        </Mutation> :
                        <Redirect to="/login" />
                }
            </Fragment>
        )
    }
}

export default AddProduct;
