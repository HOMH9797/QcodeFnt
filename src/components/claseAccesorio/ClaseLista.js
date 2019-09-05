import React from 'react';
import{ Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ClaseLista ({claseaccesorio,guardarRecargaClases}){
    
    const eliminarClaseAccesorio =  id =>{
        console.log('eliminando', id);

        Swal.fire(
            {title:'Estas seguro ¿?',
            text: "Una clase sera eliminada",
            type:'warning',
            showCancelButton: true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText: 'si, Eliminar',
            cancelButtonText:'Cancelar'}).then( async (result)=>{
                if(result.value){
                    try{
                        const url =`http://localhost:4500/api/clase-accesorio/${id}`
                        const resultado = await axios.delete(url);
                        console.log(resultado)
                        
                        if(resultado.status === 200){
                            Swal.fire(
                                'Eliminado !!!',
                                'Tu clase fue eliminada exitosamente',
                                'success'
                            )
                            guardarRecargaClases(true);

                        }
                    }catch(error){
                        Swal.fire({
                            type:'error',
                            title:'Error',
                            text:'success'
                        })
                    }
                }
            }) 
    }

    return(
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <p>
               {claseaccesorio.nombre}
            </p>
            <div>
                <Link to={`/clase-accesorio/editar/${claseaccesorio.id}`} 
                      className="btn btn-success mr-2">Editar</Link>

                <button type="button" className="btn btn-danger"
                onClick={()=> eliminarClaseAccesorio(claseaccesorio.id)}
                >Eliminar &times;</button>
            </div>
        </li>
    )
}

export default ClaseLista;