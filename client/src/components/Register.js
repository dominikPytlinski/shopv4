import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/Queries';
import Loading from './Loading';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';

class Register extends Component {

    notify = (message) => {
        toast.success(message);
    }

    render() {
        return (
            <Fragment>
                <Mutation
                    mutation={ADD_USER}
                    onCompleted={data => {
                        this.notify(`user ${data.createUser.id} created`);
                    }}
                >
                    {
                        (createUser, { loading, error }) => {
                            if(loading) return <Loading />
                            if(error) return <p>{error.message}</p>

                            return <RegisterForm createUser={createUser}/>
                        }
                    }
                </Mutation>
            </Fragment>
        )
    }
}

export default Register;
