import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
    mutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            userId
            token
            role{
                id
                role
            }
        }
    }
`;

export const GET_CATEGORIES_QUERY = gql`
    query{
        categories{
            id
            name
        }
    }
`;