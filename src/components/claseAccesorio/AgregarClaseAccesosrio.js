import React, {useState} from 'react';
import Error from '../Generic/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function AgregarClaseAccesorio({history,guardarRecargaClases}){

    //state
    const[nombreClase, guardar] = useState('');
    const [error, guardarError] =useState(false);
    
    const agregarClase = async e =>{
        e.preventDefault();

        if(nombreClase === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        try{
            const resultado = await axios.post('http://localhost:4500/api/clase-accesorio',{
                nombre:nombreClase
            });
            if (resultado.status===200){
                    Swal.fire(
                        'Clase creada',
                        'Se creo una clase nueva exitosamente',
                        'success'
                    )
            }
            
        }catch(error){
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
            <h1 className="text-center">Agregar Nueva clase</h1>
            {(error) ? <Error mensaje='Todos los campos son obligatorios'/>: null}
            <form className="mt-5" onSubmit={agregarClase}>
                <div className="form-group">
                    <label>Nombre clase</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre de clase accesorio"
                        onChange={e=> guardar(e.target.value)}
                    />
                </div>
                <div className="form-group">

                    <input type="submit" className="font-weight-bold text-uppercase mt-2 btn btn-success btn-block py-1" value="Agregar clase" />
                    <button type="button" className="btn mt-2  py-1 text-uppercase btn-block btn-danger"
                        onClick={()=> (history.push('/clase-accesorios'))}>CANCELAR</button>                 
                </div>
            </form>
            
        </div>
    
    )
}

export default withRouter(AgregarClaseAccesorio);