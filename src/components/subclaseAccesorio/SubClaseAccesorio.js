import React, { useEffect, Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SubClaseLista from './SubClaseLista';
import axios from 'axios';

function SubclaseAccesorios({ claseobj, history,guardarRecargaClases }) {
    const id = claseobj.id;
    const [subAccesorios, guardarSubAccesorios] = useState([]);
    useEffect(() => {
        const consultarApi = async () => {
            const resultado = await axios.get(`http://localhost:4500/api/subclase-accesorio/${id}`)
            guardarSubAccesorios(resultado.data.subclases);
        }
        consultarApi();

    }, []);
    return (
        <Fragment>
            <h1 className="text-center">Subclase de accesorios</h1>
            <button type="button" className="btn text-uppercase btn-danger mr-2"
                onClick={() => (history.push('/clase-accesorios'))}>volver</button>
            <Link to={`/nueva-subclase/${id}`}
                className="btn text-uppercase btn-success mr-2">Nuevo</Link>

            <ul className="list-group mt-5">
                {
                    subAccesorios.map(subclasesAccesorio => (
                        <SubClaseLista
                            key={subclasesAccesorio.id}
                            SubClaseAccesorio={subclasesAccesorio}
                            nombreClase={claseobj.nombre}
                            guardarRecargaClases={guardarRecargaClases}
                        ></SubClaseLista>
                    ))
                }
            </ul>
        </Fragment>
    )
}


export default withRouter(SubclaseAccesorios);