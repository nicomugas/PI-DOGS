import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css'

export default function Landing() {
    return (
        // <div>
        //     <h1>Welcome API DOGS</h1>
        //     <Link to='/Home'>INTRO</Link>
        // </div>

        <div className={s.main_container}>
            <div className={s.main_left_container}>
                <h1 className={s.titleApp}>API DOG</h1>
                
                <div className={s.left_paragraph}>
                    <p>
Here you will find all the information about more than 150 breeds of dogs. You can also create your dog breed. Try it!!</p>
                </div>
                <h3>don't buy a dog, adopt it</h3>
                <Link to="/Home">
                    <button className={s.button_home}>Enter</button>
                </Link>
            </div>
        </div>
    );
}
