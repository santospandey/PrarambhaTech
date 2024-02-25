import React from 'react'
import './Components.css'
import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQuery"
import { GET_CLIENTS } from "../queries/clientQuery"
import { ADD_PROJECT } from '../mutations/projectMutation'
import { nameState, descriptionState, statusState, clientIdState, statusData } from './data/AddProjectModalData'

export default function AddProjectModal() {
    const [name, setName] = useState(nameState);
    const [description, setDescription] = useState(descriptionState);
    const [status, setStatus] = useState(statusState);
    const [clientId, setClientId] = useState(clientIdState);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name: name.value, description: description.value, clientId: clientId.value, status: status.value },
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !status) {
            return alert("Enter name, status");
        }
        addProject();
        setName(nameState);
        setDescription(descriptionState);
        setStatus(statusState);
        setClientId(clientIdState);
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

            <div className="modal fade" id="addProjectModal" data-bs-backdrop="static" data-keyboard="false" aria-labelledby="addProjectModalLabel" aria-hidden="true">
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
                                    <input type={name.type} className="form-control apm-input" id={name.id} value={name.value} onChange={(e) => setName({ ...name, value: e.target.value })} required={name.required} autoFocus={name.focused} onBlur={()=> setName({...name, focused: true})}/>
                                    <span className="text-danger form-input">{name.errorMsg}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control apm-input" id={description.id} value={description.value} onChange={(e) => setDescription({ ...description, value: e.target.value })}></textarea>
                                    <span className="text-danger form-input">{description.errorMsg}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select id={status.id} className="form-select apm-input" value={status.value} onChange={(e) => setStatus({ ...status, value: e.target.value })} required={status.required} autoFocus={status.focused} onBlur={()=> setStatus({...status, focused: true})}>
                                        {statusData.map(data => (<option key={data.id} value={data.value}>{data.display}</option>))}
                                    </select>
                                    <span className="text-danger form-input">{status.errorMsg}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Client</label>
                                    <select id={clientId.id} className="form-select apm-input" value={clientId.value} onChange={(e) => setClientId({ ...clientId, value: e.target.value })} required={clientId.required} autoFocus={clientId.focused} onBlur={()=> setClientId({...clientId, focused: true})}>
                                        <option value="">Select Client</option>
                                        {data.clients.data.map((client: any) => <option key={client.id} value={client.id}>{client.name}</option>)}
                                    </select>
                                    <span className="text-danger form-input">{clientId.errorMsg}</span>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}