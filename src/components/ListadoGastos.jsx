import Gasto from "./Gasto"

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">
        

        {/* para mostrar gastos filtrados */}
        {
          filtro ? (
            <>
            <h2 className="centrar">{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>
              {gastosFiltrados.map( gasto => (
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          ) : (
            <>
             <h2 className="centrar">{gastos.length ? 'Gastos' : 'No hay Gastos Aún'}</h2>
              {/* para mostrar cada gasto sin el filtro */}
              {gastos.map( gasto => (
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))}
            </>
          )
        }

        
        
    </div>
  )
}

export default ListadoGastos