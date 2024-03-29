import { gql } from '@apollo/client'

const ADD_PROJECT = gql`
    mutation addProject($name: String, $description: String, $status: String, $clientId: ID){
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
    }`;

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String, $description: String, $status: String){
        updateProject(input: {id: $id, name: $name, description: $description, status: $status}){
            id
            name
            description
            status
            clientId
            client {
                id
                name
                email
                phone
            }
        }
    }`;


const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID){
        deleteProject(id: $id){
            id
            name
            description
            status
            clientId
        }
    }`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };