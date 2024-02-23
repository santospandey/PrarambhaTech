import React from 'react'
import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQuery"
import { GET_CLIENTS } from "../queries/clientQuery"
import { ADD_PROJECT } from '../mutations/projectMutation'


export default function AddProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('Not Started');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name, description, clientId, status},
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !status) {
            return alert("Enter name, status");
        }
        addProject({variables: {name, description, status, clientId}});
        setName('');
        setDescription('');
        setStatus('Not Started');
        setClientId('');
    };

    if (loading) return null
    if (error) return <p>Something went wrong</p>

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                <div className="d-flex align-items-center">
                    <FaList className="icon" />
                    <div>New Project</div>
                </div>
            </button>

            <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addProjectModalLabel">New Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Client</label>
                                    <select id="client" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                        <option value="">Select Client</option>
                                        {data.clients.map((client:any) => <option key={client.id} value={client.id}>{client.name}</option>)}
                                    </select>
                                </div>
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}