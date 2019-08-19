import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import Loading from './Loading';
import EditUserForm from './EditUserForm';
import { GET_USER, EDIT_USER } from '../queries/Queries';
import { toast } from 'react-toastify';

class EditUser extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            refetch: false
        }
    }

    notify = (message) => {
        toast.success(message);
        this.setState({ refetch: true });
    }

    render() {
        return (
            <Fragment>
                <Query
                    query={GET_USER}
                    variables={{ id: this.props.id }}
                >
                    {
                        ({ loading, error, data, refetch }) => {
                            if(this.state.refetch) {refetch()}
                            if(loading) return <Loading />
                            if(error) return <p>{error.message}</p>

                            return(
                                <Mutation
                                    mutation={EDIT_USER}
                                    onCompleted={data => {
                                        this.notify(`User ${data.editUser.id} updated`);
                                    }}
                                >
                                    {
                                        (editUser, { loading, error }) => {
                                            if(loading) return <Loading />
                                            if(error) return <p>{error.message}</p>

                                            return <EditUserForm
                                                        id={data.user.id}
                                                        email={data.user.email}
                                                        roleId={data.user.role.id}
                                                        editUser={editUser}
                                                    />
                                        }
                                    }
                                </Mutation>
                            )
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default EditUser;
