import React, { Component } from 'react'
import Inf_Ind from './Inf_Ind.png';
import axios from 'axios'
import Cookies from 'universal-cookie'
import '../css/login.css';
//import { useParams } from 'react-router';
const baseUrl = "http://192.168.43.205:8000/api/users"
const  cookies = new Cookies();

export default class login extends Component {

  state = {
    form: {
      user: '',
      password: ''
    }
  }
  onInputChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    //console.log(this.state.form);
  }

  IniciarSesion = async () => {
    //e.preventDefault();
    await axios.get(baseUrl, { params: { user: this.state.form.user, password: this.state.form.password } })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if(response.length>0){
          var respuesta=response[0];
          cookies.set('id', respuesta._id, {path:"/"});
          cookies.set('nombre', respuesta.nombre, {path:"/"});
          cookies.set('apellido_p', respuesta.apellido_p, {path:"/"});
          cookies.set('apellido_m', respuesta.apellido_m, {path:"/"});
          cookies.set('user', respuesta.user, {path:"/"});
          cookies.set('password', respuesta.password, {path:"/"});
          cookies.set('rol', respuesta.rol, {path:"/"});

          //var bien = 'Bienvenido '+ respuesta.nombre +" "+ respuesta.apellido_p
          //alert(bien);

          window.location.href="./control"
          console.log(response)
        }
        else{
          alert('el usuario o la contraseña no son correctos')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }


  componentDidMount(){
    if(cookies.get('user')){
      window.location.href="./control";
    }
  }

  render() {
    return (
      <>
        <div className="conteiner ">
          <div className="row ">
            <div className="col-lg-4 md-4"></div>
            <div className="col-lg-4 md-4">
              <div className="card ">
                <div className="text-center">
                  <img className="card-img-top" src={Inf_Ind} alt="INFORMÁTICA INDUSTRIAL" />
                </div>
                <div className="form-group">
                  <label className="form-label"></label>
                  <input
                    type="email"
                    name="user"
                    className="form-control"
                    value={this.state.form.user}
                    onChange={this.onInputChange}
                    placeholder="User"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label"></label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={this.state.form.password}
                    onChange={this.onInputChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <br />
                <div className="text-center">
                  <button className=" form-control btn btn-primary" onClick={() => this.IniciarSesion()}>
                    Iniciar sesión
                  </button>
                </div><br />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
