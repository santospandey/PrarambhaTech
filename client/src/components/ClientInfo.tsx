import React from "react";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"

// @ts-ignore
export default function ClientInfo({client}) {

  console.log("client ", client);
  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon"></FaIdBadge>
          <span>{client.name}</span>
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon"></FaEnvelope>
          <span>{client.email}</span>
        </li>
        <li className="list-group-item">
          <FaPhone className="icon"></FaPhone>
          <span>{client.phone}</span>
        </li>
      </ul>
    </>
  )

}
