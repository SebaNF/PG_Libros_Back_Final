import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser} from '../context/userContext';
import { logout } from '../services/user.services';


const Navbar = () => {
    const {user,setUser} = useUser();
    const [query, setQuery] = useState();
    const navigate = useNavigate();

    const renderInfo = ()=>{
        if(user){
            return(<>¡Bienvenido {user.firstName}!</>)
        }else{
            return(<>Por favor, inicia sesión</>)
        }
    };

    const logoutUser = async()=>{
        const {success} = await logout();
        if(success) 
        {
            setUser(null);
            navigate('/');

        }
        
        else window.alert("Error. No hemos podido desloguear tu usuario")
    };
    const addParams = (e) =>{
        e.preventDefault();
        const form = document.getElementById('search-input');
        
        if(query===''){
            return
            
            
        }else{
            navigate(`/busquedas/${query.toLowerCase()}`);
            form.value = '';
            setQuery('');
        }
    }


    return (
      <div>
        <header>
            <nav id='nav-bar-container' className="navbar navbar-expand-lg navbar-dark bg-dark">

                <a className="navbar-brand" href="/">
                    InterBook
                </a>
                <div className="navbar" id="navbarNav">

                
                <ul className="navbar-nav">                        

                        <li className="nav-item">
                        <a className="nav-link" href="/">
                                Inicio
                        </a>
                        </li>
                    
                    {!user && <li className="nav-item">
                        <a className="nav-link" href="/register">
                            Registro
                        </a>
                        </li>}
                    
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        {user && <li className="nav-item">
                            <a className="nav-link" href="/new-book">
                                Nuevo libro
                            </a>
                        </li>}
                        {user &&<li className="nav-item">
                            <a className="nav-link" href="/my-books">
                                Mis libros y Solicitudes
                            </a>
                        </li>}
                    </ul>
                
                    </div>
                    <div className='nav-form-container'>
                        <form className='nav-form' onSubmit={addParams}>
                            <input id='search-input' className='subnav-input' type='text' placeholder='Buscar' onChange={(e)=>setQuery(e.target.value)}></input>
                            <button type='submit' className='btn subnav-button' >Buscar</button>
                        </form>
                    </div>
                    <div className='collapse navbar-collapse justify-content-end'>
                        <div className ="nav_end">
                        <ul className='navbar-nav d-flex'>
                            <li className='navbar-text'>
                                {renderInfo()}
                            </li>
                                {/* {user && <button className='btn btn-outline-light btn-sm' onClick={logoutUser}>Logout</button>} */}
                                {user &&<button className='btn subnav-button' onClick={logoutUser}>Logout</button>}
                                
                        </ul>
                
                        </div>
                    </div>
            </nav>
            </header>
        </div>
    );
}

export default Navbar;
