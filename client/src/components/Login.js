import React, { Component, Fragment } from 'react';
import Mutation from 'react-apollo/Mutation';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from './Loading';
import LoginFrom from './LoginFrom';

import { LOGIN_MUTATION } from '../queries/Queries';

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLogged: this.props.isLogged
        }
        
    }

    notify = (message) => {
        toast.error(message);
    }

    render() {
        return (
            <Fragment>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    onCompleted={(data) => {
                        this.props.login(true);
                        this.setState({ isLogged: true });
                        sessionStorage.setItem('auth', JSON.stringify({
                            name: 'auth',
                            data: {
                                token: data.login.token,
                                role: data.login.role.role
                            }
                        }));
                    }}
                >
                    {
                        (login, {loading, error}) => {
                            if(loading) return <Loading />
                            if(error) this.notify(error.message);

                            return (!this.state.isLogged) ? <LoginFrom login={login}/> : <Redirect to="/" />;
                        }
                    }
                </Mutation>
            </Fragment>
        )
    }
}

export default Login;
