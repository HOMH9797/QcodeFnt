import React, {useState,useRef} from 'react';
import Error from '../Generic/Error';
import Swal from 'sweetalert2';
import axios from 'axios';
import  { withRouter } from  'react-router-dom';

function EditarClaseAccesorio({claseaccesorio, history, guardarRecargaClases}){
    
    const nombreAccesorioRef = useRef('');
    const [error, guardarError] =useState(false);

    const editarClase = async e =>{
        e.preventDefault();

        const nuevoNombreClase =nombreAccesorioRef.current.value;

        if(nuevoNombreClase ===''){
            guardarError(true)
            return
        }
        guardarError(false)
        const EditarClase={nombre: nuevoNombreClase }
        const url =`http://localhost:4500/api/clase-accesorio/${claseaccesorio.id}`
        try{
            const result =await axios.put(url, EditarClase);
            console.log(result)
            if (result.status===200){
                Swal.fire(
                    'Clase editada',
                    'Se edito una clase exitosamente',
                    'success'
                )
            }    
        }
        catch(error){
            Swal.fire({
                type:'error',
                title:'Error',
                text:'success'
            })
        }
        guardarRecargaClases(true);
        history.push('/clase-accesorios');
    }

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar clase accesorio</h1>
            {(error) ? <Error mensaje='Todos los campos son obligatorios'/>: null}
            
            <form className="mt-5" onSubmit={editarClase}>
                <div className="form-group">
                    <label>Nombre clase</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre de clase accesorio"
                        ref={nombreAccesorioRef}
                        defaultValue={claseaccesorio.nombre}
                    />
                </div>
                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar clase" />
            </form>
        </div>
    )
}

export default withRouter(EditarClaseAccesorio);