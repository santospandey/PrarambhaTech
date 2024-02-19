// import React, { FC } from 'react';
// import { FaTrash } from 'react-icons/fa';
// import { Client } from '../models/Client';
// import { useMutation } from '@apollo/client';
// import { DELETE_CLIENT } from '../mutations/clientMutation';

// interface ClientRowProps {
//   client: Client;
// }

// const ClientRow: FC<ClientRowProps> = ({ client }: ClientRowProps) => {
//   const [deleteClient] = useMutation(DELETE_CLIENT, {
//     variables: { id: client.id },
//   });

//   return (
//     <tr>
//       <td>{client.name}</td>
//       <td>{client.email}</td>
//       <td>{client.phone}</td>
//       <td>
//         <button className="btn btn-danger btn-sm " onClick={deleteClient}>
//           <FaTrash />
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default ClientRow;


import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Client } from '../models/Client';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutation';
import { GET_CLIENTS } from '../queries/clientQuery';

interface ClientRowProps {
  client: Client;
}

const ClientRow: FC<ClientRowProps> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{query: GET_CLIENTS}],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteClient()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;

