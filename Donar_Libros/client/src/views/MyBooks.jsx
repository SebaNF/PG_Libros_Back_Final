import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';
import {  deleteOneBook } from '../services/book.services';
import { getUser } from '../services/user.services';


const MyBooks = () => {
    const {user} = useUser();
    const [myBooks,setMyBooks] = useState();
    const navigate = useNavigate();

    const getBooksOfUserFromService = async () => {
        try{
            const result = await getUser(user._id);
            setMyBooks(result.data.myBooks);
        }catch(err){
            console.log(err)
        }
    };


    const deleteOneBookFromServices = async (data) => {
        try{
            await deleteOneBook(data,user._id);
            setMyBooks(myBooks.filter(book => book._id !==data));
            alert("Libro borrado");
        }catch(err){
            console.log(err)
        }
    }



    useEffect(() => {
        getBooksOfUserFromService() 
    }, []);
    
    return (
        <div>
            <div className='container'>
                <div className="card_form">
                    <h1>mi colección de libros</h1>
                    <div className="card">
                        <table className='table table-hover mt-3'>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Acciones</th>                        
                                </tr>
                            </thead>
                            <tbody>
                            {myBooks?.map((book,idx)=>(
                            <tr key={idx}>
                                <td>{book.title}</td>   
                                <td><button className='btn btn-normal' onClick={()=>deleteOneBookFromServices(book._id)}>Borrar</button></td>    
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default MyBooks;
