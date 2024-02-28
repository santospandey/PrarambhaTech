import './Components.css'
import React, { FC, ReactEventHandler, useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from '../queries/clientQuery'
import ClientRow from './ClientRow';
import { Client } from '../models/Client';
import Spinner from './Spinner';
import Downarrow  from './assets/Downarrow';
import Uparrow from './assets/Uparrow'
import AddClientModal from './AddClientModal';

type Props = {
    [key: string]: string;
};

const Clients: React.FC<Props> = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState([1, 2, 3]);
    const [query, setQuery] = useState('');
    const [lastPage, setLastPage] = useState(1);
    const [clients, setClients] = useState<any[]>([]);
    const [sortAttribute, setSortAttribute] = useState('');
    const [ascending, setAscending] = useState(false);
    const [select, setSelect] = useState('');

    const { loading, error, data } = useQuery(GET_CLIENTS, {
        variables: { page: currentPage, limit: limit, query: query }
    });

    useEffect(() => {
        if (data) {
            setClients(data.clients.data);
            setLastPage(data.clients.page.total);
            const arr = Array.from({ length: data.clients.page.total }, (_, i) => i + 1)
            setPages(arr);
        }
    }, [data]);

    useEffect(()=>{
        const id = setTimeout(() => {
            setQuery(props.searchName);
        }, 500);
        return () => clearTimeout(id);
    }, [props]);

    const sortBy = (attribute: string) => {
        setSortAttribute(attribute);
        const sortedClients = [...clients].sort((a, b) => {
            if (a[attribute] < b[attribute]) {
                return ascending ? 1 : -1
            } else if (a[attribute] > b[attribute]) {
                return ascending ? -1 : 1;
            }
            return 0;
        });
        setClients(sortedClients);
        setAscending(!ascending);
    }

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>
    return (
        <>
            <AddClientModal limit={limit} currentPage={currentPage} setClients={setClients} clients={clients}/>
            {!loading && !error &&
                [<table className="table table-hover mt-3 client-table" key="clients-table">
                    <thead>
                        <tr>
                            <th className='cursor-pointer' onClick={() => sortBy('name')} onMouseEnter={()=> setSelect('name')} onMouseLeave={()=>setSelect('')}>Name {select==='name' && (!ascending ? <Uparrow /> : <Downarrow />)}</th>
                            <th className='cursor-pointer' onClick={() => sortBy('email')} onMouseEnter={()=> setSelect('email')} onMouseLeave={()=>setSelect('')}>Email {select === 'email' && (!ascending ? <Uparrow /> : <Downarrow />)}</th>
                            <th className='cursor-pointer' onClick={() => sortBy('phone')} onMouseEnter={()=> setSelect('phone')} onMouseLeave={()=>setSelect('')}>Phone {select === 'phone' && (!ascending ? <Uparrow /> : <Downarrow />)}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client: Client) => (
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