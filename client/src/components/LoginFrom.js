import React, { Component } from 'react'

class LoginFrom extends Component {
    render() {
        return (
            <div className="login-form">
                <form>
                    <div className="form-control">
                        <label htmlFor="email">
                            Email: 
                        </label>
                        <input type="text" id="email" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">
                            Hasło: 
                        </label>
                        <input type="password" id="password" />
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
