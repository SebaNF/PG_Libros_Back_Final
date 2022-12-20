import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';
import { getMyBooksThatInterestOthers ,getOneBook, deleteOneBook } from '../services/book.services';
import { getUser } from '../services/user.services';


const MyBooks = () => {
    const {user} = useUser();
    const [myBooks,setMyBooks] = useState();
    const [booksThatInterestOthers , setBookThatInterestOthers] = useState();
    const [tradeId, setTradeId] = useState();
    const navigate = useNavigate();

    const getBooksOfUserFromService = async () => {
        try{
            const result = await getUser(user._id);
            setMyBooks(result.data.myBooks);
        }catch(err){
            console.log(err)
        }
    };

    const getBooksThatInterestOthersFromService = async () => {
        try{
            const result = await getMyBooksThatInterestOthers(user._id);
            setBookThatInterestOthers(result.data);
        }catch(err){
            console.log(err)
        }
    };

    const getOneBookFromService = async (data) => {
        try{
            const result = await getOneBook(data);
            setTradeId(result.data.book.tradesId);
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

    const setBkId = (value) => {
        getOneBookFromService(value);
    };

    const toTradeOne = (value) => {
        navigate(`/user/${value}/trade/${tradeId}`)
    };


    useEffect(() => {
        getBooksThatInterestOthersFromService();
        getBooksOfUserFromService() 
    }, []);
    
    return (
        <div >
            
            <div className='container'>
                
                <div className="card_form">
                    <h1>mis solicitudes de intercambio</h1>
                    <div className="card">
                        <table className='table table-hover mt-3'>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Acciones</th>                        
                                </tr>
                            </thead>
                            <tbody>
                            {booksThatInterestOthers?.map((book,idx)=>(
                                    <tr key={idx}>
                                        <td><p>{book.title}</p></td>
                                        <td><button className='btn btn-dark' onMouseOver={()=>setBkId(book._id)} onClick={()=>toTradeOne(book.interestId)}>Ver informacion</button>
                                        </td>    
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card_form">
                    <h1>mis libros</h1>
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
                                <td><button className='btn btn-danger' onClick={()=>deleteOneBookFromServices(book._id)}>Borrar</button></td>    
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
