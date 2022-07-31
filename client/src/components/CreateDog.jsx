import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getTemperaments } from "../actions";


export default function CreateDog() {
    const [input, Setinput] = useState({
        name: '',
        height_min: null,
        height_max: null,
        weight_min: null,
        weight_max: null,
        life_span_min:null,
        life_span_max: null,
        image: '',
        temperaments: []
    })

    const dispatch = useDispatch();
    const allTemper = useSelector((state) => state.temperaments)

    useEffect(() => {
       
        dispatch(getTemperaments())
    }, [dispatch])

    return (
        <div>
            <h1>Creater your Dog</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                    />

                </div>
                <div>
                    <label>Height Min:</label>
                    <input
                        type="Number"
                        value={input.height_min}
                        name="height_min"
                    />
                      <label>Height Max:</label>
                    <input
                        type="Number"
                        value={input.height_max}
                        name="height_max"
                    />

                </div>
                <div>
                    <label>Weight Min:</label>
                    <input
                        type="Number"
                        value={input.weight_min}
                        name="weight_min"
                    />
                      <label>Weight Max:</label>
                    <input
                        type="Number"
                        value={input.weight_max}
                        name="weight_max"
                    />

                </div>
                <div>
                    <label>Life Span Min:</label>
                    <input
                        type="Number"
                        value={input.life_span_min}
                        name="life_span_min"
                    />
                      <label>Life Span Max:</label>
                    <input
                        type="Number"
                        value={input.life_span_max}
                        name="life_span_max"
                    />

                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        value={input.image}
                        name="image"
                    />

                </div>
                <div>

                <label>Add Temperaments</label>
                <select >
                    <option  /*disabled selected defaultValue*/>Temperaments</option>
                    <option value="ALL">All</option>
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
                <div>
                    <button>Back</button>
                    <button>Submit</button>
                </div>

            </form>
        </div>
    )

}