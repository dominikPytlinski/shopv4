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