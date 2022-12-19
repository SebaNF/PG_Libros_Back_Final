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
            navigate(`/my-books`);
        }catch(err){
            console.log(err)
        }
    };

    const renderBtn = (book) =>{

        const aux = user?.booksImInterested.map(book=> book._id).map(libro=>libro.includes(book._id))
        if(user){
            if(aux.includes(true)){
                return(<><button  className="btn btn-danger">Pendiente</button></>)
            }else{
                return(<><button type="button" className="btn btn-warning" onClick={()=>addBookToInterestFromService(book._id,user._id)}>Me interesa</button></>)
            }
        }
    };
    
    return (
        <div className='card_libro'>            
            <h1>Libros disponibles para intercambio</h1>      
            
            <div className="card">            
            <table className="table ">
                <thead>
                    <tr className="d-flex">
                        <th className="col-3">Titulo</th>
                        <th className="col-2">Género</th>
                        <th className="col-2">Autor</th>
                        <th className="col-3">Resumen</th>
                        {user &&<th className="col-1">Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book,idx)=>(
                        <tr key={idx} className= {user?._id===book.creatorId? "none":"d-flex"} >
                            <td className="col-3">{book.title}</td>
                            <td className="col-2">{book.genre}</td>
                            <td className="col-2">{book.author}</td>
                            <td className="col-3">{book.summary}</td>
                            <td className="col-1">{renderBtn(book)}{/* {<button className='btn btn-dark' onClick={()=>addBookToInterestFromService(book._id,user._id)}>me interesa</button>} */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
            </div>               
        </div>
    );
}

export default Home;
