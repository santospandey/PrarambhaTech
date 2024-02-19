
import React, { FC } from 'react';
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from '../queries/clientQuery'
import ClientRow from './ClientRow';
import { Client } from '../models/Client';
import Spinner from './Spinner';

const Clients: FC = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    if(loading) return <Spinner />
    if(error) return <p>Something went wrong</p>
    return (
       <>
        {!loading && !error && (
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.clients.map((client: Client) => (
                        <ClientRow key={client.id} client={client} />
                    ))}
                </tbody>
            </table>
        )}
       </>
    )
}

export default Clients;