import React from "react";
import { Link } from "react-router-dom";

export default function Landing(){
    return (
        <div>
            <h1>Welcome API DOGS</h1>
            <Link to='/Home'>INTRO</Link>
        </div>
    )
}