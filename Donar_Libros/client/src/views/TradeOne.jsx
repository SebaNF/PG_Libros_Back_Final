import React, {useEffect,useState} from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { getAllBookOfAnUser } from '../services/book.services';
import { addToTrade } from '../services/trade.services';
import { useUser } from '../context/userContext';

const TradeOne = () => {
    const {id,tradeId} = useParams();
    const {user} = useUser();
    const [books,setBooks] = useState();
    const navigate = useNavigate();

    const getAllBookOfAnUserFromService = async () => {
        try{
            const result = await getAllBookOfAnUser(id);
            if(result.data.length !== 0){
                setBooks(result.data);
            }else{
                alert("Ups, el usuario no tiene libros para intecambiar");
                navigate("/")
            }
        }catch(err){
            console.log(err)
        }
    };
    
    const addToTradeFromServices = async (value) => {
        try{
            await addToTrade(tradeId,value);
            navigate(`/one-trade/${tradeId}`);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getAllBookOfAnUserFromService();
    }, []);

    return (
        <div className="card_form">
            <h1>elige el libro que quieras</h1>
            <div className="">
                <ul>
                    {books?.map((book,idx)=>(
                        <li key={idx} className="list-group-item d-flex justify-content-between">
                            <p className='pt-3'>{book.title}</p>
                            <button className='btn btn-dark' onClick={() => addToTradeFromServices(book)}>seleccionar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TradeOne;
