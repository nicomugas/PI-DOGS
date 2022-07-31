import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";



export default function DogDetail() {

    const dispatch = useDispatch()
    const { id } = useParams();
    const dog = useSelector((state) => state.dogDetail);

   
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])


    return (
        <div>
            {
                dog.length > 0 ?
                    <div>
                        <h5>  {dog[0].name}</h5>
                        <img src={dog[0].imgsrc} alt="dogimagen" width="400px" height="500px" />
                        <div>
                            {
                                dog[0].tempers?.map((t) => <h6 key={id + Math.random()}>{t.name}</h6>)
                            }
                        </div>
                        <h5>Weight: {dog[0].weight} Kg.</h5>
                        <h5>Height : {dog[0].height } cm.</h5>
                        <h5>Life Span: {dog[0].life_span} </h5>

                        <Link to='/home'><button> Volver</button></Link>

                    </div> : <p>Loading....</p>
            }

            <div>


               

            </div>


        </div>
    )




}