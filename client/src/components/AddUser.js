import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from './Loading';
import AddUserForm from './AddUserForm';

import { ADD_USER } from '../queries/Queries';

class AddUser extends Component {

    notify = (message) => {
        toast.success(message);
    }

    render() {
        return (
            <Fragment>
                {
                    (this.props.isLogged) ?
                    <Mutation
                        mutation={ADD_USER}
                        onCompleted={data => {
                            this.notify(`User ${data.createUser.id} created`);
                        }}
                    >
                        {
                            (createUser, { loading, error }) => {
                                if(loading) return <Loading />
                                if(error) return this.notify('error', error.message)

                                return(
                                    <AddUserForm createUser={createUser}/>
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

export default AddUser;
