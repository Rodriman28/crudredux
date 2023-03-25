import { useState } from "react";

//!! Actions de redux
import { crearNuevoProductoAcion } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//!! Cuando el usuario haga submit

const NuevoProducto = ({ history }) => {
  // State local
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);

  // utiliza useDispatch y te crea una funcion
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // acceder al state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  // mandar llamar el action de productoAction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAcion(producto));

  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //* Validar Form
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        clases: "alert alert-danger text-center text-uppercase p3",
      };

      dispatch(mostrarAlerta(alerta));

      return;
    }

    //* Si no hay errores
    dispatch(ocultarAlertaAction());

    //* Crear nuevo producto
    agregarProducto({ nombre, precio });

    navigate("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta && <p className={alerta.clases}>{alerta.msg}</p>}
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

            {cargando && <h3 className="text-center mt-4">Cargando...</h3>}
            {error && (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
