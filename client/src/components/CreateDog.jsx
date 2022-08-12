import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, CreateBreed } from "../actions";
import { Link } from "react-router-dom";
import s from './CreateDog.module.css'



export default function CreateDog() {

    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        image: "",
        temperaments: [],

    })

    const [errors, setErrors] = useState({
        name: undefined,
        height_min: undefined,
        height_max: undefined,
        weight_min: undefined,
        weight_max: undefined,
        life_span_min: undefined,
        life_span_max: undefined,
        image:undefined



    })

    // const disabled = true


    const thereAreErrors = Object.values(errors).some((error) => error)
    console.log('thereAreErrors: ' + thereAreErrors)
    console.log('errors: ' + errors.name + ' - ' + errors.height_min)



    const dispatch = useDispatch();
    const allTemper = useSelector((state) => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);


    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value


        }))


    }

    function handleInputSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(CreateBreed(input));
        setInput(
            {
                name: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_span_min: "",
                life_span_max: "",
                image: "",
                temperaments: []

            }
        )

        alert('Dog Created')


    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(t => t !== e)
        })
    }

    return (
        <>

            <h1 className={s.title}>Creater your Dog</h1>
            <form>
                <section className={s.FlexContainer}>
                    <div>Name:</div>
                    <div><input className={s.inputlarge}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleInputChange}
                    />
                    </div>

                </section>
                <section className={s.FlexContainerError}>
                    <div> {errors.name && (<label>{errors.name}</label>)}</div>
                    <div></div>
                </section>
                <section className={s.FlexContainer}>
                    <div>Height Min:</div>
                    <div><input className={s.inputsmall}
                        type="Number" min="0"
                        value={input.height_min}
                        name="height_min"
                        onChange={handleInputChange}
                    /> </div>
                    <div>Height Max:</div>
                    <div>
                        <input className={s.inputsmall}
                            type="Number" min="0"
                            value={input.height_max}
                            name="height_max"
                            onChange={handleInputChange}
                        />
                    </div>
                </section>
                <section className={s.FlexContainerError}>
                    <div>
                        {errors.height_min && (<label>{errors.height_min}</label>)}
                    </div>
                    <div>
                        {errors.height_max && (<label>{errors.height_max}</label>)}
                    </div>
                </section>
                <section className={s.FlexContainer}>
                    <div>Weight Min:</div>
                    <div> <input className={s.inputsmall}
                        type="Number"
                        value={input.weight_min}
                        name="weight_min"
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>Weight Max:</div>
                    <div>
                        <input className={s.inputsmall}
                            type="Number"
                            value={input.weight_max}
                            name="weight_max"
                            onChange={handleInputChange}
                        />
                    </div>
                </section>
                <section className={s.FlexContainerError}>
                    <div>
                    {errors.weight_min && (<label>{errors.weight_min}</label>)}
                            
                    </div>
                    <div>
                    {errors.weight_max && (<label>{errors.weight_max}</label>)}
                    </div>
                </section>
                <section className={s.FlexContainer}>
                    <div>Life Span Min:</div>
                    <div>
                        <input className={s.inputsmall}
                            type="Number"
                            value={input.life_span_min}
                            name="life_span_min"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>Life Span Max:</div>
                    <div>
                        <input className={s.inputsmall}
                            type="Number"
                            value={input.life_span_max}
                            name="life_span_max"
                            onChange={handleInputChange}
                        />
                    </div>
                </section>
                <section className={s.FlexContainerError}>
                    <div>
                    {errors.life_span_min && (<label>{errors.life_span_min}</label>)}
                            
                    </div>
                   
                </section>

                
                <section className={s.FlexContainer}>
                    <div>Image:</div>
                    <div>
                        <input className={s.inputlarge}
                            type="text"
                            value={input.image}
                            name="image"
                            onChange={handleInputChange}
                        />

                    </div>
                </section>
                <section className={s.FlexContainerError}>
                    <div>
                    {errors.image && (<label>{errors.image}</label>)}
                            
                    </div>
                   
                </section>
                <section className={s.FlexContainer}>
                    <div>Add Temperaments:</div>
                    <div>
                        <select onChange={(e) => handleInputSelect(e)} >
                            <option  /*disabled selected defaultValue*/>Temperaments</option>

                            {
                                allTemper?.map(t =>
                                (
                                    t.name.length ?
                                        <option key={t.id} value={t.name}>{t.name}</option>
                                        : null

                                ))
                            }
                        </select>

                    </div>
                </section>
                <section className={s.FlexContainerArea}>
                    <div >

                        {input.temperaments?.map((i) => <span key={Math.random + i} className={s.chip}>{i} <span className={s.closebtn} onClick={() => handleDelete(i)}>&times;</span></span>)}

                    </div>

                </section>

                <section className={s.FlexContainer}>

                    <div >
                        <Link to='/home'><button>Back</button></Link>
                    </div>
                    <div>
                        <button type='submit' id="btnSignUp" onClick={(e) => handleSubmit(e)} disabled={thereAreErrors ? true : false} >CreateDog</button>
                        {/*  */}
                    </div>

                </section>







            </form>

        </>
        // <div className={s.container}>
        //     <h1>Creater your Dog</h1>
        //     <div className={s.formcontainer}>

        //         <form>
        //             <div className={s.divform}>
        //                 <span className={s.spannamelarge}>
        //                     Name
        //                 </span>
        //                 <span className={s.spaninputlarge}>
        //                     <input className={s.inputlarge}
        //                         type="text"
        //                         value={input.name}
        //                         name="name"
        //                         onChange={handleInputChange}
        //                     />
        //                 </span>
        //                 <span className={s.spanerror}>
        //                     {errors.name && (<label>{errors.name}</label>)}
        //                 </span>

        //             </div>
        //             <div className={s.divform}>
        //                 <span>
        //                     <label>Height Min:</label>
        //                 </span>
        //                 <span>
        //                     <input className={s.inputsmall}
        //                         type="Number"
        //                         value={input.height_min}
        //                         name="height_min"
        //                         onChange={handleInputChange}
        //                     />
        //                 </span>
        //                 <span>
        //                     <label>Height Max:</label>
        //                 </span>
        //                 <span>
        // <input className={s.inputsmall}
        //     type="Number"
        //     value={input.height_max}
        //     name="height_max"
        //     onChange={handleInputChange}
        // />
        //                 </span>
        //                 <span>
        // {errors.height_min && (<label>{errors.height_min}</label>)}
        // {errors.height_max && (<label>{errors.height_max}</label>)}
        //                 </span>
        //             </div>
        //             <div className={s.divform}>
        //                 <span>
        //                     <label>Weight Min:</label>
        //                 </span>
        //                 <span>
        //                     <input className={s.inputsmall}
        //                         type="Number"
        //                         value={input.weight_min}
        //                         name="weight_min"
        //                         onChange={handleInputChange}
        //                     />
        //                 </span>
        //                 <span>
        //                     <label>Weight Max:</label>
        //                 </span>
        //                 <span>
        // <input className={s.inputsmall}
        //     type="Number"
        //     value={input.weight_max}
        //     name="weight_max"
        //     onChange={handleInputChange}
        // />
        //                 </span>
        //                 <span>
                            // {errors.weight_min && (<label>{errors.weight_min}</label>)}
                            // {errors.weight_max && (<label>{errors.weight_max}</label>)}

        //                 </span>

        //             </div>
        //             <div className={s.divform}>
        //                 <span>
        //                     <label>Life Span Min:</label>
        //                 </span>
        //                 <span>
        // <input className={s.inputsmall}
        //     type="Number"
        //     value={input.life_span_min}
        //     name="life_span_min"
        //     onChange={handleInputChange}
        // />
        //                 </span>
        //                 <span>
        //                     <label>Life Span Max:</label>
        //                 </span>
        //                 <span>
        // <input className={s.inputsmall}
        //     type="Number"
        //     value={input.life_span_max}
        //     name="life_span_max"
        //     onChange={handleInputChange}
        // />
        //                 </span>

        //             </div>

        //             <div className={s.divform}>
        //                 <span className={s.spannamelarge}>
        //                     <label>Image:</label>
        //                 </span>
        //                 <span>
        // <input className={s.inputlarge}
        //     type="text"
        //     value={input.image}
        //     name="image"
        //     onChange={handleInputChange}
        // />

        //                 </span>

        //             </div>
        //             <div className={s.divtemperaments}>
        //                 <span>
        //                     <label>Add Temperaments</label>

        //                 </span>
        //                 <span>
        // <select onChange={(e) => handleInputSelect(e)} >
        //     <option  /*disabled selected defaultValue*/>Temperaments</option>

        //     {
        //         allTemper?.map(t =>
        //         (
        //             t.name.length ?
        //                 <option key={t.id} value={t.name}>{t.name}</option>
        //                 : null

        //         ))
        //     }
        // </select>
        //                     <div>
        //                         {input.temperaments?.map((i) => <span key={Math.random + i} className={s.chip}>{i} <span className={s.closebtn} onClick={() => handleDelete(i)}>&times;</span></span>)}

        //                     </div>

        //                 </span>
        //             </div>
        // <div className={s.divform}>
        //     <Link to='/home'><button>Back</button></Link>
        //     <button type='submit' id="btnSignUp" onClick={(e) => handleSubmit(e)} disabled={thereAreErrors ? true : false} >CreateDog</button>

        //     {/*  */}


        // </div>

        //         </form>
        //     </div>
        // </div>
    )

}

function validate(input) {
    let errors = {};

    if (!input.name) { errors.name = 'Name field is required' }
    
    else if (!input.height_min) { errors.height_min = 'Height MIN field is required' }
    else if (input.height_min < 0){errors.height_min = 'Height MIN must be grearter than zero'}
    else if (!input.height_max) { errors.height_max = 'Height MAX field is required' }
    else if (input.height_max < 0){errors.height_max = 'Height MAX must be grearter than zero'}
    else if ( parseInt(input.height_min) > parseInt(input.height_max)) { errors.height_min = 'The MIN height cannot be greater than the MAX' }
    
    else if (!input.weight_min) { errors.weight_min = 'Weight MIN field is required' }
    else if (input.weight_min < 0){errors.weight_min = 'Weight MIN must be grearter than zero'}
    else if (!input.weight_max) { errors.weight_max = 'Weight MAX field is required' }    
    else if (input.weight_max < 0){errors.weight_max = 'Weight MAX must be grearter than zero'}
    else if (parseInt(input.weight_min) > parseInt(input.weight_max)) { errors.weight_min = 'The MIN Weight cannot be greater than the MAX' }
   
   
    else if (parseInt(input.life_span_min) > parseInt(input.life_span_max)) { errors.life_span_min = 'The MIN Life Span cannot be greater than the MAX' }
    else if (input.life_span_min < 0){errors.life_span_min = 'Life Span MIN must be grearter than zero'}
    else if (input.life_span_max < 0){errors.life_span_max = 'Life Span MAX must be grearter than zero'}

    // else if (!input.image.includes('.jpg')) {errors.image = 'the image must be JPG or PNG or GIF'}
    // else if (!input.image.includes('.png')) {errors.image = 'the image must be JPG or PNG or GIF'}
    // else if (!input.image.includes('.gif')) {errors.image = 'the image must be JPG or PNG or GIF'}
   
    return errors;
}