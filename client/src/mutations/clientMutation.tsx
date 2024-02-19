import { gql } from '@apollo/client'

const DELETE_CLIENT = gql`
    mutation deleteClient($id: String){
        deleteClient(id: $id)
    }
`;

export { DELETE_CLIENT };