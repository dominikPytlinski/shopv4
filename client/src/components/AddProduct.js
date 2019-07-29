import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Mutation from 'react-apollo/Mutation';

import AddProductForm from './AddProductForm';

class AddProduct extends Component {
    render()
    {
        return(
            <Fragment>
                {
                    (this.props.isLogged) ?
                        <AddProductForm /> :
                        <Redirect to="/login" />
                }
            </Fragment>
        )
    }
}

export default AddProduct;
