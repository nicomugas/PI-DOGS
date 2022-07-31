import React from "react";

export default function DogCard({id, name, imageurl,  tempers, weight}){
return (
    <div>
        <h5> {name}</h5>
         <img src={imageurl} alt="dogimagen" width="200px" height="250px" /> 
         <h6> <b>Temperaments</b> </h6>
        
         <div>
        {
        tempers?.map((t) => <h6 key={id + Math.random()}>{t.name}</h6>)
        }
      </div>
         <h5>Weight: {weight} Kg</h5>
         
    </div>
)
}