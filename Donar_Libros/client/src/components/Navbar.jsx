import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser} from '../context/userContext';
import { logout } from '../services/user.services';
import { IconContext } from "react-icons";
import { BsHouseDoor , BsSearch } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { getMyBooksThatInterestOthers } from '../services/book.services';



const Navbar = () => {
    const {user,setUser} = useUser();
    const [query, setQuery] = useState();
    const navigate = useNavigate();
    const [booksThatInterestOthers , setBookThatInterestOthers] = useState();

    

    const renderInfo = ()=>{
        if(user){
            return(<>¡Bienvenido/a {user.firstName}!</>)
        }else{
            return(<>Debes iniciar sesion o tener un usuario para intercambiar tus libros</>)
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
    };

    const toCreateNewBook = () => {
        navigate('/new-book');
    };

    const toMyBooks = () => {
        navigate('/my-books');
    };

    const toMyTrades = () => {
        navigate('/my-trades');
    };

    const getBooksThatInterestOthersFromService = async () => {
        try{
            if(user){
                const result = await getMyBooksThatInterestOthers(user._id);
                const count = result.data.length;
                if(count !== 0){
                    setBookThatInterestOthers(count);
                }
            }
        }catch(err){
            console.log(err)
        }
    };



    useEffect(() => {
        getBooksThatInterestOthersFromService();
    }, [user]);


    return (
    <div>
        <header>
                <nav id='nav-bar-container' className="navbar navbar-expand-md navbar-dark bg-dark ps-5 pe-5 pt-3 pb-3">
                    <span className="navbar-brand">
                        InterBook
                    </span>

                    <div>
                        <ul className="navbar-nav">                        
                            <li className="nav-item mt-1">
                                <a className="nav-brand" href="/">
                                    <IconContext.Provider value={{color:"white",size:'25px'}}>
                                        <BsHouseDoor />
                                    </IconContext.Provider>
                                </a>
                            </li>
                            
                            {!user && 
                            <li className="nav-item">
                                <a className="nav-link" href="/register">
                                    registro
                                </a>
                            </li>}
                        
                            {!user && 
                            <li className="nav-item">
                                <a className="nav-link" href="/login">
                                    login
                                </a>
                            </li>
                            }

                            {user && 
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={()=>toCreateNewBook()}>
                                    nuevo libro
                                </button>
                            </li>}

                            {user &&
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={()=>toMyBooks()}>
                                    mis libros
                                </button>
                            </li>}

                            {user &&
                            <li className="nav-item">
                                <button className="btn btn-outline-light position-relative" onClick={()=>toMyTrades()}>
                                    mis intercambios
                                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{booksThatInterestOthers}</span>
                                </button>
                            </li>}
                        </ul>
                    </div>


                    <div className='nav-form'>
                        <form className='nav-form' onSubmit={addParams}>
                            <input id='search-input' className='subnav-input rounded' type='text' placeholder='Buscar' onChange={(e)=>setQuery(e.target.value)}></input>
                            <button type='submit' className='btn btn-light btn-sm'>
                                <IconContext.Provider value={{size:'15px'}}>
                                    <BsSearch/>
                                </IconContext.Provider>
                            </button>
                        </form>
                    </div>
                        
                    
                    <div className='collapse navbar-collapse justify-content-end'>
                        <ul className='navbar-nav'>
                            <li className='navbar-text'>
                                {renderInfo()}
                            </li>
                            {user &&
                            <button className='btn btn-light' onClick={logoutUser}>
                                <IconContext.Provider value={{size:'20px',className:"ms-2"}}>
                                    <GrLogout />
                                </IconContext.Provider>
                            </button>}
                        </ul>
                    </div>

                </nav>
                
            </header>
    </div>
    );
}

export default Navbar;
