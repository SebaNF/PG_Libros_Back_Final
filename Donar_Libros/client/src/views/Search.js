import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { addBookToInterest, getAllBooks } from '../services/book.services';


const Search = () => {

    const {search} = useParams();
    const [books, setBooks] = useState();
    const navigate = useNavigate();
    const {user, setUser} = useUser();


    const getAllBooksFromService = async () => {
        try{
            const response = await getAllBooks();
            console.log(response.data.allBooks)
            
            const words = search.split(" ")
        for (let index = 0; index < words.length; index++) {
            const element = words[index];
            
            const aux1= response?.data.allBooks.filter((book)=>book.title.toLowerCase().includes(element))
            const aux2 = response?.data.allBooks.filter((book)=>book.author.toLowerCase().includes(search))
            const aux3 = response?.data.allBooks.filter((book)=>book.genre.toLowerCase().includes(search))
            const aux4 = aux1.concat(aux2)
            const aux5 = aux4.concat(aux3)
            console.log(aux3)
            if(aux1.length>0 || aux2.length>0 ||aux3.length>0 )  {
                setBooks(aux5)
            }else{
                navigate('/busquedas/not-found')
            }
        }
            
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getAllBooksFromService();
    }, []);


    useEffect(() => {
        getAllBooksFromService();    
    }, [search]);

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

    const addBookToInterestFromService = async (bookId,userId) =>{
        try{
            const response = await addBookToInterest(bookId,userId)
            console.log(response.data)
            setUser(response.data.user);
            
            /* const response = await simplePut(`/api/user/${user._id}`,user);
            console.log(response) */
            navigate(`/my-books`);
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="card_libro">
          
             <h1>Libros disponibles</h1>
             <div className="card">
            <table className='table'>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Género</th>
                        <th>Autor</th>
                        <th>Resumen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book,idx)=>(
                        <tr key={idx} className={user?._id===book.creatorId? "none":""} >
                            <td>{book.title}</td>
                            <td>{book.genre}</td>
                            <td>{book.author}</td>
                            <td>{book.summary}</td>
                            <td>{renderBtn(book)}{/* {<button className='btn btn-dark' onClick={()=>addBookToInterestFromService(book._id,user._id)}>me interesa</button>} */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Search;
