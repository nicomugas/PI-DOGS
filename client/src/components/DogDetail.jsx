import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";
import s from './DogDetail.module.css'
import ErrorMessage from "./ErrorMessage";



export default function DogDetail() {

    const dispatch = useDispatch()
    const { id } = useParams();
    const dog = useSelector((state) => state.dogDetail);
    const errors = useSelector((state)=>state.errors)

    console.log('errors: ' + errors )
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])


    return (
        <>
            
            {
                errors ?
               <section className={s.container}>

               <div className={s.containerdiv}>
                
                    <ErrorMessage/>
                </div>
               </section>
                :


            dog.length > 0 ?
                <section className={s.container}>

                    <div className={s.containerdiv}>

                        <img className={s.divimg} src={dog[0].imgsrc} alt="dogimagen" width="300px" height="400px" />
                    </div>
                    <div className={s.containerdiv}>
                        <h1>  {dog[0].name}</h1>
                        {
                            dog[0].tempers?.map((t) => <p className={s.chip} key={id + Math.random()}>{t.name}</p>)
                        }

                        <h5>Weight: {dog[0].weight} Kg.</h5>
                        <h5>Height : {dog[0].height} cm.</h5>
                        <h5>Life Span: {dog[0].life_span} </h5>
                        <Link to='/Home'><button> Back</button></Link>
                    </div>


                </section>
                : <p ><img src="https://thumbs.gfycat.com/BriefDescriptiveIcterinewarbler-size_restricted.gif" alt="loading"/></p>}

            
        </>
    )




}