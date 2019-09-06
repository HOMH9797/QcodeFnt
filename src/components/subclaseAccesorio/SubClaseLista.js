import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';


function SubClaseLista({ SubClaseAccesorio, nombreClase,guardarRecargaClases,history }) {
    const eliminarSubClaseAccesorio = id => {
        Swal.fire(
            {
                title: 'Estas seguro ¿?',
                text: "Una subclase sera eliminada",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si, Eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.value) {
                    try {
                        const url = `http://localhost:4500/api/subclase-accesorio/${id}`
                        const resultado = await axios.delete(url);

                        if (resultado.status === 200) {
                            Swal.fire(
                                'Eliminado !!!',
                                'Tu subclase fue eliminada exitosamente',
                                'success'
                            )
                            history.push('/clase-accesorios')
                            guardarRecargaClases(true);
                        }
                    } catch (error) {
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            text: 'success'
                        })
                    }
                }
            })
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">

            <p>
                {SubClaseAccesorio.id}
            </p>
            <p>
                {nombreClase}
            </p>
            <p>
                {SubClaseAccesorio.nombre}
            </p>
            <div>
                <p>
                    <Link to={`/subclase-editar/${SubClaseAccesorio.id}`}
                        className="btn btn-success mr-2">Editar</Link>
                    <button type="button" className="btn btn-danger"
                        onClick={() => eliminarSubClaseAccesorio(SubClaseAccesorio.id)}
                    >Eliminar &times;</button>
                </p>
            </div>
        </li>
    )
}

export default withRouter(SubClaseLista);