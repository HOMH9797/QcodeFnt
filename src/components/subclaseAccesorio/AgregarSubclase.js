import React, {useState} from 'react';
import Error from '../Generic/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import {  withRouter } from 'react-router-dom';
function Agregarsubclase({id,history}){

    const[nombresubClase, guardar] = useState('');
    const [error, guardarError] =useState(false);

    const agregarsubclase = async e =>{
        e.preventDefault();

        if(nombresubClase === ''){
            guardarError(true);
            return;
        }

        guardarError(false);
        try{
            const resultado = await axios.post('http://localhost:4500/api/subclase-accesorio',{nombre:nombresubClase, clase_accesorio_id:id});
            if (resultado.status===200){
                Swal.fire(
                    'subclase creada',
                    'Se creo una subclase nueva exitosamente',
                    'success'
                )
                history.push('/clase-accesorios')
            }
        }catch(error){
            Swal.fire({
                type:'error',
                title:'Error',
                text:'fails'
            })
        }
    }

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center"> Agregar nueva subclase</h1>
            {(error) ? <Error mensaje='Todos los campos son obligatorios'/>: null}
            <form className="mt-5" onSubmit={agregarsubclase}>
                <div className="form-group">
                <label>Nombre subclase</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre de subclase accesorio"
                        onChange={e=> guardar(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" className="font-weight-bold text-uppercase mt-2 btn btn-success btn-block py-1" value="Agregar subclase" />
                    <button type="button" className="btn mt-2  py-1 text-uppercase btn-block btn-danger"
                        onClick={()=> (history.push('/clase-accesorios'))}>CANCELAR</button>                 
                </div>
            </form>
        </div>
    )
}
export default withRouter(Agregarsubclase);