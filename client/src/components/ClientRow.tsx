import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Client } from '../models/Client';

interface ClientRowProps {
  client: Client;
}

const ClientRow: FC<ClientRowProps> = ({ client }) => {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm ">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;