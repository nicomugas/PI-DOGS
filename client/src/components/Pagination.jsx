import React from "react";

export default function Pagination({ dogsPorPagina, allDogs, paginado }) {
    const nroDePaginas = []

    for (let i = 1; i <= Math.ceil(allDogs / dogsPorPagina); i++) {
        nroDePaginas.push(i)
    }

    return (
        <div>
        <div >
          {nroDePaginas.map(nro => (
           
              <button key={nro}  onClick={() => paginado(nro)}>{nro} </button>
            
          ))}
        </div>
      </div>

   

    )
}