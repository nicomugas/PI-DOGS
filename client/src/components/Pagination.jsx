import React from "react";
import s from './Pagination.module.css'

export default function Pagination({ dogsPorPagina, allDogs, paginado }) {
    const nroDePaginas = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPorPagina); i++) {
        nroDePaginas.push(i)
    }

    return (
        <div>
        <div >
        <ul className={s.pagination}>
          {nroDePaginas.map(nro => (
           
             // <button key={nro}  onClick={() => paginado(nro)}>{nro} </button>
             <li key={nro}>
              {/* <a    key={nro} onClick={() => paginado(nro)}>{nro} </a> */}
              <button key={nro}  onClick={() => paginado(nro)}>{nro} </button>
              
              </li>
            
          ))}
          </ul>
        </div>
      </div>

   

    )
}