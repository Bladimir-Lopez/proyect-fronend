import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Cookies from 'universal-cookie'

const  cookies = new Cookies();

//const API = process.env.API_URL;
export default class CreateUser extends Component {

    state = {
        users: [],
        nombre: '',
        apellido_p: '',
        apellido_m: '',
        user: '',
        password: '',
        rol: 'usuario'
    }
    async componentDidMount() {

      if(!cookies.get('user')){
        window.location.href="./";
      }

        this.getUsers();
        //console.log(this.state.users)
    }
    //funcion para traer todos los usuarios
    getUsers = async () => {
        const res = await axios.get('http://192.168.43.205:8000/api/users');
        this.setState({ users: res.data });
    }
    onInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(e.target.value)
    }
    onInputClear = () => {
        this.setState({
            nombre: '',
            apellido_p: '',
            apellido_m: '',
            user: '',
            password: '',
            rol:'usuario'
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const newUsuario = {
            nombre: this.state.nombre,
            apellido_p: this.state.apellido_p,
            apellido_m: this.state.apellido_m,
            user: this.state.user,
            password: this.state.password,
            rol: this.state.rol
        };
        await axios.post('http://192.168.43.205:8000/api/users', newUsuario);
        this.getUsers();
        this.onInputClear();
    }
    deleteUser = async (id) => {
        axios.delete('http://192.168.43.205:8000/api/users/' + id)
        this.getUsers();
    }
    render() {
        return (
          <div className="row">
            <div className="card col-md-4">
              <h4 className="card-header text-center">Nuevo Usuario</h4>
              <form onSubmit={this.onSubmit} className="card-body">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    value={this.state.nombre}
                    onChange={this.onInputChange}
                    placeholder="nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido Paterno</label>
                  <input
                    type="text"
                    name="apellido_p"
                    className="form-control"
                    value={this.state.apellido_p}
                    onChange={this.onInputChange}
                    placeholder="apellido paterno"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido Materno</label>
                  <input
                    type="text"
                    name="apellido_m"
                    className="form-control"
                    value={this.state.apellido_m}
                    onChange={this.onInputChange}
                    placeholder="apellido materno"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Cuenta</label>
                  <input
                    type="email"
                    name="user"
                    className="form-control"
                    value={this.state.user}
                    onChange={this.onInputChange}
                    placeholder="cuenta"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onInputChange}
                    placeholder="password"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Rol</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="rol"
                    value={this.state.rol}
                    onChange={this.onInputChange}
                    required
                  >
                    <option selected>usuario</option>
                    <option>Administrador</option>
                  </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </form>
            </div>
{/*-----lista usuarios */}
            <div className="col-md-8">
              <div className="light">
              <h4 className="card-header text-center">Usuarios Resgistrados</h4>
              </div>
              <table className="table table-light table-bordered table-striped">
                <thead className="text-center">
                  <tr>
                    <th scope="col">nombre</th>
                    <th scope="col">apellido pateno</th>
                    <th scope="col">apellido materno</th>
                    <th scope="col">user</th>
                    <th scope="col">rol</th>
                    <th scope="col">accion</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.nombre}</td>
                      <td>{user.apellido_p}</td>
                      <td>{user.apellido_m}</td>
                      <td>{user.user}</td>
                      <td>{user.rol}</td>
                      <td>
                        <Link
                          className=" btn badge bg-danger"
                          to="/user"
                          onClick={() => this.deleteUser(user._id)}
                        >
                          eliminar
                        </Link>
                        {/*<Link className="btn badge bg-primary" to="/user">
                          editar
                  </Link>*/}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
}