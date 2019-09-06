import React, { Fragment } from 'react';
import ClaseLista from './ClaseLista'
import { Link } from 'react-router-dom';

function ClaseAccesorios({ accesorios, guardarRecargaClases }) {
    return (
        <Fragment>
            <h1 className="text-center">Clase de accesorios</h1>
            <Link to={`/nueva-clase`}
                className="btn btn-success mr-2">Nuevo</Link>
            <ul className="list-group mt-5">
                {
                    accesorios.map(claseaccesorio => (
                        <ClaseLista
                            key={claseaccesorio.id}
                            claseaccesorio={claseaccesorio}
                            guardarRecargaClases={guardarRecargaClases} />
                    ))
                }
            </ul>
        </Fragment>
    )
}

export default ClaseAccesorios;