import React from "react";
import { Link, Route } from "react-router-dom";
import s from './NavBar.module.css';
import SearchBar from "./SearchBar";



export default function NavBar () {

    return (
        <div className={s.nav}>
          
           
            <Link to='/home' className={s.link}><p>Home</p></Link>
            <Link to='/CreateDog' className={s.link}><p>Create</p></Link>
            
            <div className={s.searchbar}>

            <Route exact path='/home' component={SearchBar}></Route> 

            </div>
            

            {/* <Link to='/CreateDog'>
                <div className={s.chip}>
                    <img src="https://cdn-icons-png.flaticon.com/512/194/194630.png" 
                    alt="new breed" width="86" height="86"/> Create
                </div>
            </Link> */}
            
            
        

        </div>
    )
}


