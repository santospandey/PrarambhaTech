import React, { useState, useEffect } from "react"
import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQuery"
import ProjectCard from "./ProjectCard"

export default function Projects() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [pages, setPages] = useState([1,2,3]);
    const [lastPage, setLastPage] = useState(1);
    
    const { loading, error, data } = useQuery(GET_PROJECTS, {
        variables: {
            page: currentPage,
            limit: limit
        }
    })

    useEffect(()=> {
        if(data){
            setLastPage(data.projects.page.total);
            const arr = Array.from({length: data.projects.page.total}, (_, i) => i + 1)
            setPages(arr);
        }
    }, [data])

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>

    return (
        <>
            {data.projects.data.length > 0 ? (
                <div className="row mt-4">
                    {data.projects.data.map((project: any) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
            ) : <p>No Projects</p>}

            <div key="project-pagination">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={"page-item cursor-pointer " + (currentPage === 1 ? "disabled" : "")}>
                                <a className="page-link" onClick={()=>setCurrentPage(currentPage-1)}>Previous</a>
                            </li>
                            {pages.map((page) => <li className="page-item cursor-pointer" key={page}>
                                    <a className={"page-link " + (currentPage === page ? "orange": "")} onClick={()=>setCurrentPage(page)}>{page}</a>
                                </li>)}                    
                            <li className={"page-item cursor-pointer " + (currentPage === lastPage ? "disabled" : "")}>
                                <a className="page-link" onClick={()=>setCurrentPage(currentPage+1)}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
        </>
    )
}
