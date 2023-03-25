import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productoEditar = useSelector((state) => state.productos.productoEditar);

  useEffect(() => {
    setProducto(productoEditar);
  }, [productoEditar]);

  const onChangeFormulario = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, precio } = producto;

  const submitEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));

    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Producto</label>
                <input
                  onChange={onChangeFormulario}
                  value={nombre}
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre Producto"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio Producto</label>
                <input
                  onChange={onChangeFormulario}
                  value={precio}
                  type="number"
                  name="precio"
                  id="precio"
                  placeholder="Precio Producto"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
