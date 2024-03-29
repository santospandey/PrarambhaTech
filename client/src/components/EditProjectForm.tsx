import React from 'react'
import { useState } from 'react'
import { GET_PROJECT } from '../queries/projectQuery'
import { useMutation } from '@apollo/client'
import { UPDATE_PROJECT } from '../mutations/projectMutation'


// @ts-ignore
export default function EditProjectForm({ project, setEdit }) {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState(project.status)

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: project.id,
            name,
            description,
            status
        },
        refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}],
        onCompleted: ()=>setEdit(false)
    })

    const onSubmit = () => {
        updateProject();
    }

    const isProjectSame = () => name===project.name && description === project.description && status === project.status;

    return (
        <div className='mt-5'>
            <h3>Update Project Details</h3>
            <form onSubmit={(event)=>{event.preventDefault(); onSubmit()}}>
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

                <button className="btn btn-primary mx-2" onClick={()=>setEdit(false)}>Cancel</button>
                <button type="submit" className="btn btn-secondary mx-2" disabled={isProjectSame()}>Update</button>
            </form>
        </div>
    )
}  
