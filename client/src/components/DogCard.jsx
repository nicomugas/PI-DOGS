import React from "react";
import s from "./DogCard.module.css";
import { Link } from "react-router-dom";


export default function DogCard({ id, name, imageurl, tempers, weight }) {
    return (
        // <div className={s.container}>
        //     <div>
        //         <Link to={"DogDetail/" + id}>
        //             <img src={imageurl} alt="dogimagen" width="150px" height="150px" />
        //         </Link>
        //     </div>
        //     <div className={s.divtitle}>
        //         <span>{name.toUpperCase()}</span>
        //     </div>
        //     <div>
        //         <h5>Weight: {weight} Kg</h5>
        //     </div>
        //     <div>
        //         <h6> <b>Temperaments</b> </h6>
        //         <div>
        //             {
        //                 tempers?.map((t) => <p className={s.chip} key={id + Math.random()}>{t.name}</p>)
        //             }

        //         </div>

        //     </div>


        // </div>

        <div className={s.container} style={{ backgroundImage: `url(${imageurl})` }}  >
            <div className={s.divgradient}>
                <div className={s.divtitlename} >
                    <Link to={"DogDetail/" + id} style={{textDecoration:`none`}}>
                        <span className={s.name}>{name.toUpperCase().substring(0, 28)}</span>
                        <span className={s.weigth}>{weight} Kg</span>
                    </Link>
                    <hr />

                </div>

                <div>

                    <div className={s.chips}>

                        {
                          tempers.length >0?  tempers?.map((t) => <p className={s.chip} key={id + Math.random()}>{t.name}</p>)
                          : <p className={s.chip} key={id + Math.random()}>no associated temperaments</p>
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}