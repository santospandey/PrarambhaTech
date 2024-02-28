import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Client } from '../models/Client';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutation';
import { GET_CLIENTS } from '../queries/clientQuery';

interface ClientRowProps {
  client: Client;
  clients: Client[],
  setClients: Function
}

const ClientRow: FC<ClientRowProps> = ({ client, clients, setClients }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    onCompleted: (result) => {
      const {deleteClient} = result;
      const filteredClients = clients.filter((_client) => {
        return _client.id.localeCompare(deleteClient.id) != 0
      })
      setClients(filteredClients);
    }
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteClient()} style={{ margin: "5px" }}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;

