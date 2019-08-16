import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from './Loading';

import { GET_USERS, DELETE_USER } from '../queries/Queries';

class Users extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            refetch: false
        }
    }

    componentDidMount()
    {
        this.setState({ refetch: true });
    }

    refetchHandler = () => {
        this.setState({ refetch: true });
        this.notify('User deleted');
    }

    notify = (message) => {
        toast.success(message);
    }

    render() {
        return (
            <section className="user-content">
                {
                    (this.props.isLogged) ?
                    <Query
                    query={GET_USERS}
                >
                    {
                        ({ loading, error, data, refetch }) => {
                            if(this.state.refetch) {refetch()}
                            if(loading) return <Loading />
                            if(error) {
                                if(error.message === 'GraphQL error: unauthorize') {
                                    this.props.logout(true);
                                    return <Redirect to="/login" />
                                } else {
                                    return <p>{error.message}</p>
                                }
                            }

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
                                                            <div className="action-btn">
                                                                <Link className="btn btn-info" to={`/edit-user/${user.id}`}>Edytuj</Link>
                                                                <Mutation
                                                                    mutation={DELETE_USER}
                                                                    onCompleted={
                                                                        this.refetchHandler
                                                                    }
                                                                >
                                                                    {(deleteUser, {data}) => {
                                                                        return(
                                                                            <form
                                                                                onSubmit={e => {
                                                                                    e.preventDefault();
                                                                                    if(window.confirm('Czy potwierdzasz?')) {
                                                                                        deleteUser({
                                                                                            variables: {
                                                                                                id: user.id
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <button type="submit" className="btn btn-danger">Usuń</button>
                                                                            </form>
                                                                        )
                                                                    }}
                                                                </Mutation>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    <div>
                                        <Link className="btn btn-primary" to="/add-user">Dodaj</Link>
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
