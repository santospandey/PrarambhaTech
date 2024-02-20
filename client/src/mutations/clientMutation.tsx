import { gql } from '@apollo/client'


const ADD_CLIENT = gql`
    mutation addClient($name: String, $email: String, $phone: String){
        addClient(input: {name: $name, email: $email, phone: $phone}){
            id
            name
            email
            phone
        }
    }
`;

const DELETE_CLIENT = gql`
    mutation deleteClient($id: String){
        deleteClient(id: $id)
    }
`;

export { ADD_CLIENT, DELETE_CLIENT };