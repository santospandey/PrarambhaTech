import React from 'react'
import logo from './assets/logo.jpeg'

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a className="navbar-brand">
                <div className="d-flex">
                    <img src={logo} alt="logo" className="mr-2" />
                    <button type='button' className="btn btn-secondary" style={{margin: "0px 10px"}}><a href='/' style={{color: "white", textDecoration: "none"}}>Clients</a></button>
                    <button type='button' className="btn btn-primary"><a href='/projects' style={{color: "white", textDecoration: "none"}}>Projects</a></button>
                </div>
            </a>
        </div>
    </nav>
  )
}
