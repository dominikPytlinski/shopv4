import React, { Component } from 'react';

class RegisterForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '',
            roleId: '5d25d1cb1c4b0b3dbe407084'
        }
    }

    submitHandler = () => {
        const { email, password, roleId } = this.state;
        
        this.props.createUser({
            variables: {
                email,
                password,
                roleId
            }
        });
    }

    render() {
        return (
            <div className="add-form">
                <form onSubmit={this.submitHandler}>
                    <div className="form-control">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}  />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Hasło: </label>
                        <input type="text" id="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary">Zapisz</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterForm;
