import React, { Component } from 'react'

class LoginFrom extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.login({
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        })

    }

    render()
    {
        return (
            <div className="login-form">
                <form onSubmit={this.submitHandler}>
                    <div className="form-control">
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input 
                            type="text" 
                            id="email"
                            value={this.state.login}
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">
                            Hasło: 
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <button className="btn btn-primary" type="submit">Zaloguj</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginFrom;
