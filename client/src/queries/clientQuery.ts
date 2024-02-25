import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
    query getClients($limit: Int, $page: Int) {
        clients(limit: $limit, page: $page) {
            data {
                id
                name
                email
                phone
            }
            page {
                current
                total
            }
        }
    }
`
export { GET_CLIENTS };