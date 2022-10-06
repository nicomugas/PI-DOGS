import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, filterByDataSource, getTemperaments, filterByTemperament, orderByName, orderByWeight } from "../actions";
import DogCard from './DogCard';
import Pagination from "./Pagination";
import s from "./Home.module.css";
import  ErrorMessage  from "./ErrorMessage";

export default function Home() {
    const dispatch = useDispatch();
    const alldogs = useSelector((state) => state.dogs);
    const allTemper = useSelector((state) => state.temperaments)
    //const [orden, setOrden] = useState('')
    //Paginado
    const [paginaActual, setPaginaActual] = useState(1) // me posiciono en primera pagina.
    // const [dogsPorPagina, setDogsPorPagina] = useState(8) // indico cantidad de DogCard por pagina
    const dogsPorPagina = 8
    const indiceUltimoDog = paginaActual * dogsPorPagina  //obtengo  la posicion del array del ultimo dog
    const indicePrimerDog = indiceUltimoDog - dogsPorPagina //obtengo la posicion del primer dog en el array

    const dogsaMostrar = alldogs.slice(indicePrimerDog, indiceUltimoDog)

    

    const errors = useSelector((state)=>state.errors)

    console.log('errors: ' + errors)
    const paginado = (nroPagina) => {
        setPaginaActual(nroPagina)
    }

    //fin paginado
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments())
    }, [dispatch])

    function handleFilterByDataSource(e) {
        e.preventDefault();
        dispatch(filterByDataSource(e.target.value))
        setPaginaActual(1);
    }

    function handleFilterByTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPaginaActual(1);
       // setOrden(e.target.value)
    }

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));

    }
    return (
        <div className={s.container}>
            
          
            
            <div className={s.FlexContainer}>
                
                <div className={s.FlexContainerdiv}>
                   <p className={s.titulo}>FILTERS</p>
                    <select onChange={e => handleFilterByTemperament(e)} className={s.selectcss}>
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
                    
                    <select onChange={e => handleFilterByDataSource(e)} className={s.selectcss}>
                        <option value='ALL'>Data Source</option>
                        <option value='EXIST'>Existing Breeds</option>
                        <option value='OWN'>Own Breeds</option>
                    </select>
                </div>
                        
                <div className={s.FlexContainerdiv} >
                <p className={s.titulo}>ORDERS</p>
                    <select onChange={e => handleOrderByName(e)} className={s.selectcss}>
                        <option value='ALL'>by Name</option>
                        <option value='ASC'>Asc</option>
                        <option value='DESC'>Desc</option>
                    </select>
                    
                    <select onChange={e => handleOrderByWeight(e)} className={s.selectcss}>
                        <option value='ALL'>by Weight</option>
                        <option value='WMIN'>min weight</option>
                        <option value='WMAX'>max weight</option>
                    </select>
                </div>
            </div>
            <div className={s.pagination}>

            <Pagination
                dogsPorPagina={dogsPorPagina}
                allDogs={alldogs.length}
                paginado={paginado}
            />
            </div>
            <div className={s.containerDogCard}>

            {errors !== undefined ?
                          
                  <ErrorMessage/>
               
               
                :
                
                dogsaMostrar && dogsaMostrar?.map(dog => {
                    return (
                        
                        // <Link to={"DogDetail/"+ dog.id}>
                        <DogCard name={dog.name} imageurl={dog.imgsrc} tempers={dog.tempers} temper={dog.tempers} weight={dog.weight} key={dog.id} id={dog.id} />
                        //  </Link>
                    ) 
                })
            }
            </div>
        </div>

    )
}
