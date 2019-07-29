import React, { Component } from 'react';
import LoginFrom from './LoginFrom';
import Mutation from 'react-apollo/Mutation';
import { Redirect } from 'react-router-dom';

import Loading from './Loading';

import { LOGIN_MUTATION } from '../queries/Queries';

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            isLogged: this.props.isLogged
        }
        
    }

    render() {
        return (
            <div>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    onCompleted={(data) => {
                        this.props.login(true);
                        this.setState({ isLogged: true });
                    }}
                >
                    {
                        (login, {loading, error, data}) => {
                            if(loading) return <Loading />
                            if(error) return <p>{error.message}</p>

                            return (!this.state.isLogged) ? <LoginFrom login={login}/> : <Redirect to="/" />;
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default Login;
