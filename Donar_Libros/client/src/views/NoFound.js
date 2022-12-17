import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoFound = () => {
    const navigate = useNavigate();
    return (
        <div className=' card_libro  not-found'>
            <h2>No se encontraron coincidencias con su busqueda.</h2>
            <h4>Intente Buscar nuevamente o haga click abajo para ir la página principal.</h4>
            <button className="btn btn-warning mt-5" onClick={()=>navigate('/')}>Volver</button>
        </div>
    );
}

export default NoFound;
