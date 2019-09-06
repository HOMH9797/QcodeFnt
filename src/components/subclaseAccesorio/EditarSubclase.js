import React,{useEffect,useState,useRef} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Error from '../Generic/Error';
import  { withRouter } from  'react-router-dom';

function EditarSubclases({idsub,guardarRecargaClases,history}){
    const nombresubRef = useRef('');
    const [error, guardarError] =useState(false);
    const[subaccesorios, guardarsubClase]= useState([]);

    useEffect(()=>{
        const consultaApi = async() =>{
            const resultado = await Axios.get(`http://localhost:4500/api/subclase-accesorio/subclase/${idsub}`)
            guardarsubClase(resultado.data.subclases[0]);
        }
        consultaApi();
    },[]);

    const editarsubclase = async e =>{
        e.preventDefault();
        const nuevoNombreSubClase = nombresubRef.current.value;
        if(nuevoNombreSubClase ===''){
            guardarError(true)
            return
        }
        guardarError(false)
        const EditarSubclase = {nombre:nuevoNombreSubClase}
        const url =`http://localhost:4500/api/subclase-accesorio/${subaccesorios.id}`
        try{
            const result = await Axios.put(url,EditarSubclase)
            if(result.status===200){
                Swal.fire(
                    'Subclase editada',
                    'Se edito una subclase exitosamente',
                    'success'
                )
            }
        }catch(error){
            Swal.fire({
                type:'error',
                title:'Error',
                text:'Faild'
            })
        }
        guardarRecargaClases(true);
        history.push('/clase-accesorios')
    }

    return(
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar clase accesorio</h1>
            {(error) ? <Error mensaje='Todos los campos son obligatorios'/>: null}
            <form className="mt-8" onSubmit={editarsubclase}>
                <div className="form-group">
                    <label>Nombre subclase</label>
                    <input 
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre de la sub clase"
                        ref={nombresubRef}
                        defaultValue={subaccesorios.nombre}
                    />
                </div>
                <div className="form-group">
                <input type="submit" className="font-weight-bold text-uppercase mt-2 btn btn-success btn-block py-1" value="Editar clase" />
                <button type="button" className="btn text-uppercase btn-block btn-danger"
                        onClick={()=> (history.push(`/clase-accesorios`))}>CANCELAR</button>
                </div>
            </form>
        </div>
    )

}

export default withRouter(EditarSubclases);