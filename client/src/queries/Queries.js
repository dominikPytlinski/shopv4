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

export const ADD_PRODUCT_MUTATION = gql`
    mutation($name: String!, $desc: String!, $price: Float!, $img: String!, $categoryId: ID!){
        addProduct(name: $name, desc: $desc, price: $price, img: $img, categoryId: $categoryId){
            id
            name
        }
    }
`;

export const GET_PRODUCTS = gql`
    query{
        products{
            id
            name
            price
            img
        }
    }
`;

export const GET_PRODUCT = gql`
    query($id: ID!){
        product(id: $id){
            id
            name
            price
            img
            desc
            category{
                name
                id
            }
        }
    }
`;

export const GET_USERS = gql`
    query{
        users{
            id
            email
            role{
                id
                role
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation($email: String!, $password: String!, $roleId: ID!){
        createUser(email: $email, password: $password, roleId: $roleId){
            id
            email
            role{
                id
                role
            }
        }
    }
`;

export const GET_ROLES = gql`
    query{
        roles{
            id
            role
        }
    }
`;

export const DELETE_USER = gql`
    mutation($id: ID!){
        deleteUser(id: $id){
            message
        }
    }
`;

export const GET_USER = gql`
    query($id: ID!){
        user(id: $id){
            id
            email
            role{
                id
                role
            }
        }
    }
`;

export const EDIT_USER = gql`
    mutation($id: ID!, $email: String!, $password: String, $roleId: ID!){
        editUser(id: $id, email: $email, password: $password, roleId: $roleId){
            id
            email
            role{
                id
                role
            }
        }
    }
`;