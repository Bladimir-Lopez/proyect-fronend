import React from 'react'
import axios from 'axios'
import {format, register} from 'timeago.js'
import GaugeChart from 'react-gauge-chart'

import Cookies from 'universal-cookie'

const  cookies = new Cookies();

register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'in %s horas'],
    ['hace 1 dia', 'en 1 dia'],
    ['hace %s dias', 'en %s dias'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
][index]);

const timeago = timestamp => format(timestamp, 'es_ES');
//const API = process.env.API_URL;

export default class Jabon extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Jabon: '' };
    }
    componentDidMount() {//metodo que se ejecuta luego del montaje del componente
        
        if(!cookies.get('user')){
            window.location.href="./";
          }
        
        this.intervalo = setInterval(
            () => this.tick(),
            5000
        );
        this.getJabon();
    }
    tick() {//set estados 
        this.setState({
            Jabon: this.getJabon()
        });
    }
    componentWillUnmount() {//metodo cuando se desmonta el componente
        clearInterval(this.intervalo);
    }
    getJabon = async () => {//metodo para hacer la peticion ala api
        const res = await axios.get('http://192.168.43.205:8000/api/jabon')
        this.setState({ Jabon: res.data.pop() })
        //console.log(this.state.Jabon.cantidad)
    }
    render() {
        return (
            <>
            <div className="col-sm-6">
                <div className="card text-center text-white bg-secondary">
                    <div className="card-header">
                    <h5 className="card-title">JABÓN</h5>
                    </div><br />
                    <div className="card-body">
                    <h5 className="card-title">Cantidad de jabón</h5><br /><br />
                        <div className="position-relative m-4">          
                            <div className="position-absolute top-0 start-50 translate-middle">
                            <GaugeChart id="gauge-chart1"
                                        nrOfLevels={0}
                                        arcsLength={[0.06, 0.1, 0.80]}
                                        arcWidth={0.4}
                                        arcPadding={0}
                                        cornerRadius={2}
                                        colors={['#fa6525', '#fafa25', '#25fa3b']}
                                        needleColor="#cc0000"
                                        needleBaseColor="#cc0000"
                                    
                                        percent={this.state.Jabon.cantidad/100}
                                        //marginInPercent={0.01}

                                        animate={false}
                                        animDelay={200}
                                        animateDuration={2000}

                                        hideText={true}
                                        textColor={"#000000"}
                                    />
                            </div><br />       
                        </div>
                        <div className="position-relative m-4">
                            <div className="position-absolute top-0 start-50 translate-middle-x">
                                <h1>{this.state.Jabon.cantidad}%</h1><br />
                            </div>
                        </div><br /><br />
                        
                            <h5 className="m-4">Se utilizó {this.state.Jabon.contador} veces</h5>
                    </div>
                    <div className="card-footer">
                        <h5>El ultimo registro fue {timeago(this.state.Jabon.date)}</h5>
                    </div>
                </div>
            </div>
            <br/>
            </>
        )
    }
}