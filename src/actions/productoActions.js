import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
} from "../types";
import clienteAxios from "../config/axios.js";
import Swal from "sweetalert2";

//!! Crear nuevos productos

export function crearNuevoProductoAcion(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //insertar en la API
      await clienteAxios.post("/productos", producto);

      //* Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");

      dispatch(agregarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));

      //* Alerta error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

//* Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const { data } = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

// Selecciona y elimina el producto

export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      Swal.fire(
        "Eliminado!",
        "El producto se elimino correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

// Colocar producto a editar

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoAction(producto));
  };
}

const obtenerProductoAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

// Edita un registro en la api y state
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto));

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
    } catch (error) {}
  };
}

const editarProducto = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto,
});
