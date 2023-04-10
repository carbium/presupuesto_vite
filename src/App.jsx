import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal'
import Filtros from './components/Filtros';
import { generarId, formatearCantidad } from "./helpers";
import IconoNuevogasto from './img/nuevo-gasto.svg'


function App() {

  // valor inicial de presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  //Para mostrar la pantalla de planificacion al tener un valor valido de presupuesto
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  //Para manejar el estado de la ventana modal
  const [modal, setModal] = useState(false)
  //Para añadir la clase .animar modal
  const [animarModal, setAnimarModal] = useState(false)
  //Guardar objeto con la info del formulario
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  //Editar el Gasto
  const [gastoEditar, setGastoEditar] = useState({})
  //Filtrar gastos
  const [filtro, setFiltro] = useState('')
  //state para mostrar los gastos filtrados y no perder la referencia original
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  

  //para abrir modal al editar el gasto
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
    setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  //Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  
  }, [presupuesto])

  //Guardar gastos en localStorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    
    //activar el presupuesto
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  //Para filtrar gastos
  useEffect(() => {
    if(filtro) {
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  
  

  //cerra el modal con tecla escape
  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (modal && e.key === 'Escape') {
        setAnimarModal(false)
 
        setTimeout(() => {
          setModal(false)
        }, 500);
      }
    }, true)
  }, [modal])

  //para abrir ventana modal al hacer click en +
  const handleNuevoGasto = () => {
      setModal(true)
      setGastoEditar({})

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
  }

  //me traigo el objeto con nombre, cantidad y categoria del modal
  const guardarGasto = gasto => {
    if(gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})

    } else {
      //Nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    //cerrar Modal
        setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
  }

  //Eliminar gasto
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
      />

      {/* si es valido muestra el icono de mas */}
      {isValidPresupuesto && (
        <>
        <main>
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevogasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {/* html para el modal (componente) */}
      {modal && <Modal 
                  setModal={setModal}
                  setAnimarModal={setAnimarModal}
                  animarModal={animarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
      />}
      
    </div>
  )
}

export default App
