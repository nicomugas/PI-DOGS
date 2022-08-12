import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import s from './ErrorMessage.module.css';
import { ClearError } from "../actions";

export default function ErrorMessage() {

    const errors = useSelector(((state) => state.errors))
    const dispatch = useDispatch();


   

    function handleSubmit(e) {
        //e.preventDefault();
        dispatch(ClearError())
        
    }




    return (
        <div className={s.errorcontainer} >
            {errors && 
            <div>
            <span className={s.error}> {errors.response.data}  </span>
            <Link to='/home'><button onClick={(e)=>handleSubmit(e)}>Back</button> 
            </Link> 
            
            </div>

            }
        </div >
    )
}