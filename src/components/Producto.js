import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un producto que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProductoAction(id));
      }
    });
  };

  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    navigate(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">${precio}</span>
      </td>
      <td className="acciones">
        <button
          onClick={() => redireccionarEdicion(producto)}
          type="button"
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => confirmarEliminarProducto(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
