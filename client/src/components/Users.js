import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import Loading from './Loading';

import { GET_USERS } from '../queries/Queries';

class Users extends Component {
    render() {
        return (
            <section className="user-content">
                {
                    (this.props.isLogged) ?
                    <Query
                    query={GET_USERS}
                >
                    {
                        ({ loading, error, data }) => {
                            if(loading) return <Loading />
                            if(error) return <p>{error.message}</p>

                            return(
                                <Fragment>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>ID</th>
                                                <th>Email</th>
                                                <th>Uprawnienia</th>
                                                <th>Akcja</th>
                                            </tr>
                                            {data.users.map(user => {
                                                return (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role.role}</td>
                                                        <td>
                                                            <button className="btn btn-info">Edytuj</button>
                                                            <button className="btn btn-danger">Usuń</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div>
                                        <button className="btn btn-primary">Dodaj</button>
                                    </div>
                                </Fragment>
                            )
                        }
                    }
                </Query> :
                <Redirect to="/login" />
                }
            </section>
        )
    }
}

export default Users;
