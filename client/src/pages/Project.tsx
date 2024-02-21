import { Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQuery'
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';


export default function Project() {
    const [edit, setEdit] = useState(false);

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: id }
    });

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>

    return (
        <>
            <div className="mx-auto w-75 card p-5">
                <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
                <h1>{data.project.name}</h1>
                <h5 className="mt-3">Project Status</h5>
                <p className="lead">{data.project.status}</p>

                {data.project.client && <ClientInfo client={data.project.client} />}

                <div className='d-flex mt-5 ms-auto'>
                    {!edit && <button className="btn btn-primary m-2" onClick={()=>setEdit(true)}>
                        <FaEdit className='icon' /> Edit Project
                    </button>}
                    <DeleteProjectButton projectId={data.project.id} />
                </div>

                {edit && <EditProjectForm project={data.project} setEdit={setEdit} />}
                
            </div>
        </>
    )
}
