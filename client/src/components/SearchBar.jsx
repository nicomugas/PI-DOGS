import React from "react";
import { getDog } from "../actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./SearchBar.module.css"



export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState()

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (name){
            dispatch(getDog(name))
            setName("")
          } else alert('you must enter a value')


    }
    return (

        <div className={s.SearchBar}>
            <input value={name || ''} className={s.input} type="text" placeholder="Search..." onChange={(e) => handleInputChange(e)} />
            <button className={s.submit }type="submit" onClick={(e) => handleSubmit(e)}>Search </button>
            
        </div>

    )
}
