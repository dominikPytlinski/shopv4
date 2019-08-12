import React, { Component } from 'react'

class Product extends Component {

    render() {
        return (
            <div>
               {console.log(this.props.match.params.id)}
            </div>
        )
    }
}

export default Product;
