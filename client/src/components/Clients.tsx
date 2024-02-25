import React, { FC, useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from '../queries/clientQuery'
import ClientRow from './ClientRow';
import { Client } from '../models/Client';
import Spinner from './Spinner';
import './Components.css'

const Clients: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState([1, 2, 3]);
    const [lastPage, setLastPage] = useState(1);

    const { loading, error, data } = useQuery(GET_CLIENTS, {
        variables: { page: currentPage, limit: limit }
    });

    useEffect(() => {
        if (data) {
            setLastPage(data.clients.page.total);
            const arr = Array.from({ length: data.clients.page.total }, (_, i) => i + 1)
            setPages(arr);
        }
    }, [data])

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>
    return (
        <>
            {!loading && !error &&
                [<table className="table table-hover mt-3" key="clients-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.clients && data.clients.data && data.clients.data.map((client: Client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>,
                <div key="clients-pagination">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={"page-item cursor-pointer " + (currentPage === 1 ? "disabled" : "")}>
                                <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</a>
                            </li>
                            {pages.map((page) => <li className="page-item cursor-pointer" key={page}>
                                <a className={"page-link " + (currentPage === page ? "orange" : "")} onClick={() => setCurrentPage(page)}>{page}</a>
                            </li>)}
                            <li className={"page-item cursor-pointer " + (currentPage === lastPage ? "disabled" : "")}>
                                <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                ]}
        </>
    )
}

export default Clients;