import React, { Component, Fragment } from 'react';

class EditUser extends Component {
    render() {
        return (
            <Fragment>
                <section className="page-content" >
                    {this.props.id}
                </section>
            </Fragment>
        )
    }
}

export default EditUser;
