import React, {useState , useEffect} from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { getOneTrade } from '../services/trade.services';
import { bigDelete ,rejectTrade } from '../services/book.services';
import { getUser } from '../services/user.services';
import { Link } from "react-router-dom";


const OneTrade = () => {
    const [bookOne,setBookOne] = useState();
    const [bookOneId,setBookOneId] = useState();
    const [bookTwo,setBookTwo] = useState();
    const [bookTwoId,setBookTwoId] = useState();
    const [userOneId,setUserOneId] = useState();
    const [userTwoId,setUserTwoId] = useState();
    const [userEmail,setUserEmail] = useState();
    const {tradeId} = useParams();
    const navigate = useNavigate();

    const getOneTradeFromServices = async (value) => {
        try{
            const result = await getOneTrade(value);
            setBookOne(result.data.book1);
            setBookOneId(result.data.book1[0]._id);
            setBookTwo(result.data.book2);
            setBookTwoId(result.data.book2[0]._id);
            setUserOneId(result.data.book1[0].creatorId);
            setUserTwoId(result.data.book2[0].creatorId);
        }catch(err){
            console.log(err)
        }
    };

    const getUserFromService = async () => {
        try{
            const result = await getUser(userTwoId);
            setUserEmail(result.data.email);

        }catch(err){
            console.log(err)
        }
    };
    
    const closeTrade = async () => {
        try{
            const values = {idBookOne:bookOneId,idBookTwo:bookTwoId,idUserOne:userOneId,idUserTwo:userTwoId};
            await bigDelete(tradeId,values);
            navigate('/');
        }catch(err){
            console.log(err)
        }
    };

    const rejectT = async () => {
        try{
            const values = {idBookOne:bookOneId,idBookTwo:bookTwoId,idUserOne:userOneId,idUserTwo:userTwoId};
            await rejectTrade(tradeId,values);
            navigate('/');
        }catch(err){
            console.log(err)
        }
    };

    const toHome = () => {
        navigate("/");
    }

    useEffect(() => {
        getOneTradeFromServices(tradeId);
    }, []);

    return (
        <div className="card_form">
            <div className="">
                <h1>Libro que das</h1>
                <ul className='pt-2 me-5'>
                    {bookOne?.map((book,idx)=>(
                    <li key={idx} className="list-group-item d-flex justify-content-between">
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                    </li>))}
                </ul>
            </div>

            <div>
                <h1>Libro que recibes</h1>
                <ul className='pt-2 me-5'>
                    {bookTwo?.map((book,idx)=>(
                    <li key={idx} className="list-group-item d-flex justify-content-between ">
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                    </li>))}
                </ul>
            </div>

            <div>
                <button className='btn btn-primary' type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={()=> getUserFromService()}>Ver información de contacto</button>
                <div className='collapse' id="collapseExample">{userEmail && <p>{userEmail}</p>}</div>
            </div>

            <div className='btn-group mt-3' role={"group"}>
                <button className='btn btn-success' onClick={()=>closeTrade()}> intercambio exitoso</button>
                <button className='btn btn-danger' onClick={()=>rejectT()}>intercambio fallido</button>
            </div>
            <div className='mt-2'>
                <button className="btn btn-secondary" onClick={()=>toHome()}>Cancelar</button>
            </div>
        </div>
    );
}

export default OneTrade;
