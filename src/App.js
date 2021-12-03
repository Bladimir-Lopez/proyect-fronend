import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
//import Button from '@material-ui/core/Button';
import Navigation from './components/Navigation';
//import Navbar from './components/Navbar';
//import NavbarListas from './components/NavbarListas';
//import Contenedor from './components/Contenedor';
import Usuarios from './components/Usuarios';
import Jabon from './components/Jabon';
import Agua from './components/Agua';
import login from './components/login';
import Reportes from './components/Reportes';
import Panel from './components/Panel';
//import Oculto from './components/Oculto';
//import Typography from '@material-ui/core/Typography';

require('dotenv').config();
function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <div className="row">
          <Route path="/control" exact component={Panel} />
          <Route path="/control" exact component={Agua} />
          <Route path="/control" exact component={Jabon} />
          <Route path="/reportes" exact component={Reportes} />
          <Route path="/" exact component={login} />
        </div>
        <Route path="/agua" exact component={Agua} />
        <Route path="/jabon" exact component={Jabon} />
        <Route path="/user" exact component={Usuarios} />
      </div>
    </Router>
  );
}
console.log(process.env.REACT_APP_BASE_URL);
export default App;