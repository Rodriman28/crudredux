import { useState } from "react";

//!! Actions de redux
import { crearNuevoProductoAcion } from "../actions/productoActions";
import { useDispatch, useSelector } from "react-redux";

//!! Cuando el usuario haga submit

const NuevoProducto = () => {
  // State local
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);

  // utiliza useDispatch y te crea una funcion
  const dispatch = useDispatch();

  // acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  console.log("cargando ", cargando);
  console.log("error ", error);

  // mandar llamar el aciton de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAcion(producto));

  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //todo: Validar Form
    if (nombre.trim() === "" || precio <= 0) {
      return;
    }

    //todo: Si no hay errores

    //* Crear nuevo producto
    agregarProducto({ nombre, precio });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre Producto"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio Producto</label>
                <input
                  type="number"
                  name="precio"
                  id="precio"
                  placeholder="Precio Producto"
                  className="form-control"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando ? <h1>Cargando...</h1> : null}
            {error ? (
              <p className="alert alert-danger p2">Hubo un error</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
