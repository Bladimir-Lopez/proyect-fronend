import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// Si desea comenzar a medir el rendimiento en su aplicación, pase una función
// para registrar resultados (por ejemplo: reportWebVitals (console.log))
// o enviar a un punto final de análisis. Aprende más: https://bit.ly/CRA-vitals