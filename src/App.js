import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Generic/Header';
import AgregarClaseProducto from './components/claseAccesorio/AgregarClaseAccesosrio';
import ClaseProductos from './components/claseAccesorio/ClaseAccesorios';
import EditarClaseAccesorio from './components/claseAccesorio/EditarClaseAccesorio';
import SubclaseAccesorios from './components/subclaseAccesorio/SubClaseAccesorio';
import EditarSubclases from './components/subclaseAccesorio/EditarSubclase';
import AgregarSubclase from './components/subclaseAccesorio/AgregarSubclase';

function App() {
  const[accesorios, guardarClase]= useState([]);

  const[recargarClases, guardarRecargaClases]= useState(true);

  useEffect(()=>{
    if(recargarClases){
      const consultarApi =async()=>{
        const resultado = await axios.get('http://localhost:4500/api/clase-accesorio')
        guardarClase(resultado.data.accesorios);
      }
      consultarApi();

      guardarRecargaClases(false);
    }
  },[recargarClases]);
  return (
    <Router>
      <Header />
        <main className="container mt-5">
          <Switch>
              <Route exact path="/clase-accesorios" 
                  render={() => (<ClaseProductos accesorios={accesorios}
                    guardarRecargaClases={guardarRecargaClases} ></ClaseProductos>)}
              >
              </Route>
              <Route exact path="/nueva-clase" 
                  render={() => 
                    (<AgregarClaseProducto guardarRecargaClases={guardarRecargaClases}></AgregarClaseProducto>) }
              >
              </Route>
              <Route exact path="/clase-accesorio/editar/:id" 
              render={props =>{
                      const idClaseAccesorio = parseInt(props.match.params.id);
                      
                      const claseAccesorio = accesorios.filter(accesorio => accesorio.id === idClaseAccesorio);
                      return(<EditarClaseAccesorio 
                          claseaccesorio={claseAccesorio[0]}
                          guardarRecargaClases={guardarRecargaClases}
                      />)
              }}></Route>
              <Route exact path="/nueva-subclase/:id"
                render={props=>{
                  const idclaseAccesorio = parseInt(props.match.params.id);
                  return(<AgregarSubclase id={idclaseAccesorio}></AgregarSubclase>)
                }}
              ></Route>
              <Route exact path="/subclase-accesorio/:id" 
              render={props=>{
                  const idclaseAccesorio = parseInt(props.match.params.id);
                  const claseobj = accesorios.filter(accesorio => accesorio.id === idclaseAccesorio);

                  return(
                    <SubclaseAccesorios  
                    claseobj={claseobj[0]}
                      guardarRecargaClases={guardarRecargaClases}>
                    </SubclaseAccesorios>
                  )
              }}>
              </Route>
              <Route exact path="/subclase-editar/:id"
                  render={props=>{
                    const idSub = parseInt(props.match.params.id);

                    return(
                      <EditarSubclases idsub={idSub} guardarRecargaClases={guardarRecargaClases}></EditarSubclases>
                    )
                  }}
              >
              </Route>
          </Switch>
        </main>
    </Router>
  );
}

export default App;
