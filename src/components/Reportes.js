import React, { Component } from 'react'
import ReactExport from "react-export-excel";
import axios from 'axios'

import Cookies from 'universal-cookie'

const  cookies = new Cookies();

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Reportes extends Component {
    
    state = {
        Agua: [],
        Jabon:[],
        Users: [],
    }
    
    async componentDidMount() {//metodo que se ejecuta luego del montaje del componente
        
        if(!cookies.get('user')){
            window.location.href="./";
        }
        
        this.getAgua();
        this.getJabon();
        this.getUsers();
    }
    
    getAgua = async () => {//metodo para hacer la peticion ala api
        const res_a = await axios.get('http://192.168.43.205:8000/api/agua');
        this.setState({ Agua: res_a });
    }

    getJabon = async () => {//metodo para hacer la peticion ala api
        const res_j = await axios.get('http://192.168.43.205:8000/api/jabon');
        this.setState({ Jabon: res_j });
        console.log(this.state.Jabon)
    }

    getUsers = async () => {
        const res_u = await axios.get('http://192.168.43.205:8000/api/users');
        this.setState({ Users: res_u});
    }

    render() {
        return (
            <>

{/*Agua-------------------------*/}

                <div className="center">
                    <h1 className="text-center">REPORTES</h1><br />
                </div>
                <div className="login-center conteiner ">
                    <div className='row'>
                        <div className="col-lg-4 md-4">
                            <div className="card text-white bg-primary">
                                <div className="card-header text-center">
                                    <h5 className="card-title">AGUA</h5>
                                </div><br />
                                <div className="card-body">
                                    <h5 className="card-title">REPORTE DE AGUA</h5><br />
                                    <p className="card-text">lista de porcentaje de contenido de agua registrado</p><br />
                                </div>
                                <div className="card-footer">
                                    <ExcelFile filename={"Reporte Agua "+Date()} element={<button className="btn btn-success">Generar Reporte</button>}>
                                        <ExcelSheet data={this.state.Agua.data} name="Agua">
                                            <ExcelColumn label="Porcentaje Agua" value="cantidad" />
                                            <ExcelColumn label="fecha" value="date" />
                                            <ExcelColumn label="cuantos se lavaron" value="contador" />
                                        </ExcelSheet>
                                    </ExcelFile>
                                </div>
                            </div>
                        </div>

{/*jabón-------------------------*/}

                        <div className="col-lg-4 ">
                            <div className="card text-white bg-warning">
                                <div className="card-header text-center">
                                    <h5 className="card-title">JABÓN</h5>
                                </div><br />
                                <div className="card-body">
                                    <h5 className="card-title">REPORTE DE JABÓN</h5><br />
                                    <p className="card-text">lista de porcentaje de contenido de jabón registrado</p><br />
                                </div>
                                <div className="card-footer">
                                    <ExcelFile filename={"Reporte Jabon "+Date()} element={<button className="btn btn-success">Generar Reporte</button>}>
                                        <ExcelSheet data={this.state.Jabon.data} name="Jabon">
                                            <ExcelColumn label="Porcentaje Jabón" value="cantidad" />
                                            <ExcelColumn label="fecha" value="date" />
                                            <ExcelColumn label="cuantos se lavaron" value="contador" />
                                        </ExcelSheet>
                                    </ExcelFile>
                                </div>
                            </div>
                        </div>

{/*usuario-------------------------*/}

                        <div className="col-lg-4 ">
                            <div className="card text-white bg-danger">
                                <div className="card-header text-center">
                                    <h5 className="card-title">USUARIO</h5>
                                </div><br />
                                <div className="card-body">
                                    <h5 className="card-title">REPORTE DE USUARIOS</h5><br />
                                    <p className="card-text">lista de usuarios registrado</p><br /><br />
                                </div>
                                <div className="card-footer">
                                    <ExcelFile filename={"Reporte Usuario "+Date()} element={<button className="btn btn-success">Generar Reporte</button>}>
                                        <ExcelSheet data={this.state.Users.data} name="Usuarios">
                                            <ExcelColumn label="nombre" value="nombre" />
                                            <ExcelColumn label="apellido paterno" value="apellido_p" />
                                            <ExcelColumn label="apellido materno" value="apellido_m" />
                                            <ExcelColumn label="cuenta" value="user" />
                                            <ExcelColumn label="rol" value="rol" />
                                        </ExcelSheet>
                                    </ExcelFile>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
