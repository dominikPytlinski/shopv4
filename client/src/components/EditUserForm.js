import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Loading from './Loading';

import { GET_ROLES } from '../queries/Queries';

class EditUserForm extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id: this.props.id,
            email: this.props.email,
            password: '',
            roleId: this.props.roleId
        }
    }

    submitHandler = (e) => {
        e.preventDefault();

        const { id, email, password, roleId } = this.state;
        
        this.props.editUser({
            variables: {
                id,
                email,
                password,
                roleId
            }
        })
    }

    render() {
        return (
            <div className="add-form">
                <form onSubmit={this.submitHandler} >
                    <div className="form-control">
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}  />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Hasło: </label>
                        <input type="text" id="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="role">Uprawnienia: </label>
                        <select value={this.state.roleId} id="role" onChange={e => this.setState({ roleId: e.target.value })} >
                            <option>Wybierz</option>
                            <Query
                                query={GET_ROLES}
                            >
                                {
                                    ({ loading, error, data }) => {
                                        if(loading) return <option><Loading /></option>
                                        if(error) return <option>{error.message}</option>

                                        return(
                                            data.roles.map(role => {
                                                return <option key={role.id} value={role.id} >{role.role}</option>
                                            })
                                        )
                                    }
                                }
                            </Query>
                        </select>
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary">Zapisz</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditUserForm;
