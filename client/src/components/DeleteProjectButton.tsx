import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { GET_PROJECTS } from '../queries/projectQuery'
import { useMutation } from '@apollo/client'
import { DELETE_PROJECT } from '../mutations/projectMutation'

// @ts-ignore
export default function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate('/projects'),
        refetchQueries: [{ query: GET_PROJECTS }]
    });

    return (
        <button className="btn btn-danger m-2" onClick={() => deleteProject()}>
            <FaTrash className='icon' /> Delete Project
        </button>
    )
}
