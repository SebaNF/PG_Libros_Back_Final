import React from 'react';
import NewBookForm from '../components/NewBookForm';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/book.services';
import { useUser } from '../context/userContext';

const NewBook = () => {
    const {user} = useUser();
    const navigate = useNavigate()

    const createBookFromService = async (values) => {
        try{
            await createBook(user._id,values);
            navigate('/my-books');
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className='card_libro'>
            <h1 className='display-5 mt-3'>ingresa un nuevo libro</h1>
            <NewBookForm title="" author="" genre="" summary="" onSubmitProp={createBookFromService}/>
        </div>
    );
}

export default NewBook;
