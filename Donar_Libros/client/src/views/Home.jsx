import React, {useState,useEffect} from 'react';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { getAllBooks , addBookToInterest } from '../services/book.services';




const Home = () => {
    const [books,setBooks] = useState([]);
    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const getAllBooksFromService = async () => {
        try{
            const result = await getAllBooks();
            const aBooks = result.data.allBooks;
            setBooks(aBooks);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getAllBooksFromService();
    }, []);

    const addBookToInterestFromService = async (bookId,userId) =>{
        try{
            const response = await addBookToInterest(bookId,userId)
            setUser(response.data.user);
            // navigate(`/my-books`);
        }catch(err){
            console.log(err)
        }
    };


    const renderBtn = (book) =>{

        const aux = user?.booksImInterested.map(book=> book._id).map(libro=>libro.includes(book._id))
        if(user){
            if(aux.includes(true)){
                return(<>
                    <button  className="btn btn-info" onClick={()=>alert("Debes esperar a la respuesta del dueño del libro")}><span className='spinner-border spinner-border-sm me-2'></span>pendiente</button>
                    </>)
            }else{
                return(<><button type="button" className="btn btn-warning" onClick={()=>addBookToInterestFromService(book._id,user._id)}>me interesa</button></>)
            }
        }
    };
    
    return (
        <div className='card_libro'> 

            <h1 className='mb-3'>libros disponibles</h1>      
            
            <div className="card md-light">

                <table className="table table-hover mt-3">
                    <thead>
                        <tr className="d-flex">
                            <th className="col-3">Titulo</th>
                            <th className="col-2">Género</th>
                            <th className="col-2">Autor</th>
                            <th className="col-3">Resumen</th>
                            {!user ?  <th className="col-2"></th> : <th className='col-2'>acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book,idx)=>(
                            <tr key={idx} className= {user?._id===book.creatorId ? "none" :"d-flex"} >
                                <td className="col-3">{book.title}</td>
                                <td className="col-2">{book.genre}</td>
                                <td className="col-2">{book.author}</td>
                                <td className="col-3">{book.summary}</td>
                                <td className="col-2">{renderBtn(book)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default Home;
