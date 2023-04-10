import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBtn from "../img/cerrar.svg"

const Modal = ( {setModal, setAnimarModal, animarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    //state error de validacion de form
    const [mensaje, setMensaje] = useState('')

    //state para las categorias del form
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    //identificar el gasto a editar
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    //useEffect para cuando el modal este abierto en edicion del gasto
    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, [])
    

    //cerrar modal
    const ocultarModal = () => {
        
        setAnimarModal(false) 
        setGastoEditar({}) //vaciar el state de editar, porque quedaba lleno

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    //validar envio de formulario
    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes("")) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={ocultarModal}
            />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        >
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            {/* mensaje de validacion */}
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input
                    id="nombre"
                    type="text"
                    placeholder="Añade el nombre del gasto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input
                    id="cantidad"
                    type="number"
                    placeholder="Añade la cantidad del gasto"
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    min="1"
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select
                    id="categoria"  
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}                  
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos Varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>

                </select>
            </div>

            <input
                type="submit"
                value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
            />

        </form>
    </div>
  )
}

export default Modal
