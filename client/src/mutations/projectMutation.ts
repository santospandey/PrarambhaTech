import { gql } from '@apollo/client'

const ADD_PROJECT = gql`
    mutation addProject($name: String, $description: String, $status: String, $clientId: String){
        addProject(input: {name: $name, description: $description, status: $status, clientId: $clientId}){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export { ADD_PROJECT };