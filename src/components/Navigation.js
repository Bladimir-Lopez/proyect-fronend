import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const  cookies = new Cookies();

export default class Navigation extends Component {
    state={
        control:''
    }
CerrarSesion = ()=>{
    cookies.remove('id',{path:"/"});
    cookies.remove('nombre',{path:"/"});
    cookies.remove('apellido_p',{path:"/"});
    cookies.remove('apellido_m',{path:"/"});
    cookies.remove('user',{path:"/"});

    window.location.href='./';
}

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/control">Informática Industrial</Link>
                    <div className="nav justify-content-end" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/control">Control</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/user">Usuarios</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/reportes">Reportes</Link>
                            </li>
                            <li className="nav-item active">
                                <button className="btn btn-outline-danger" onClick={() => this.CerrarSesion()} >cerrar</button>
                            </li>                
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}