import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

// los componentes se importan a header porque header maneja la pantalla del formulario de presupuesto
// y maneja la pantalla de planificacion con un ternario cuando el valor de presupuesto es valido
const Header = ({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos }) => {
  return (
    <header>
        <h1>Presupuesto de Tito</h1>

        {isValidPresupuesto ? (
            <ControlPresupuesto 
                setGastos={setGastos}
                presupuesto={presupuesto}
                gastos={gastos}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        ) : <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        }

    </header>
  )
}

export default Header