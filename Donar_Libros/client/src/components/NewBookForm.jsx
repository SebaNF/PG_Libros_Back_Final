import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";


const RecommendationsForm = (props) => {
    const{title, author, genre, summary, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        title: Yup.string()
        .min(1,"Titulo muy corto")
        .required("campo obligatorio"),

        author: Yup.string()
        .min(1,"Nombre del autor muy breve")
        .required("campo obligatorio"),

        genre: Yup.string()
        .min(1,"Genero muy breve")
        .required("campo obligatorio"),

        summary: Yup.string()
        .min(20,"Deber ingresar un resumen de 20 caracteres mínimo")
        .required("campo obligatorio"),


    })
    return (
      <div className="form_newbook">
            <Formik
                initialValues={{
                    title: title,
                    author:author,
                    genre: genre,
                    summary: summary
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(values)}
                enableReinitialize
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='row d-flex align-items-center justify-content-center shadow-sm p-4 mb-5  rounded'>

                            <div className='col-2'>
                                <div className='form-floating mt-4'>
                                    <Field id="title" placeholder="título del libro" type="text" name="title" className="form-control" />
                                    <label htmlFor="title">Titulo</label>
                                    {errors.title && touched.title ? <p className="error">{errors.title}</p> : null}
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="author" placeholder="Autor" type="text" name="author" className="form-control" />
                                    <label htmlFor="author">Autor</label>
                                    {errors.author && touched.author ? (<p className="error">{errors.author}</p>) : null}
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="genre" placeholder="género" type="text" name="genre" className="form-control" />
                                    <label htmlFor="genre">Género</label>
                                    {errors.genre && touched.genre ? (<p className="error">{errors.genre}</p>) : null}
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="summary" placeholder="Breve resumen" as="textarea" name="summary" className="form-control" />
                                    <label htmlFor="summary">Breve resumen</label>
                                    {errors.summary && touched.summary ? (<p className="error">{errors.summary}</p>) : null}
                                </div>
                            </div>

                            <div className='col-3 d-flex align-items-center justify-content-center p-9'>
                                    
                                    <button className='btn btn-dark btn-sm m-2 ' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                        Crear Libro
                                    </button>
                                    
                                    <Link to="/"> 
                                    <button className="btn btn-dark btn-sm">Cancelar</button>
                                    </Link>
                                    
                             
                            {/* col-2  m-3 d-flex justify-content-center */}
                            
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
      </div>
    );
}

export default RecommendationsForm;
