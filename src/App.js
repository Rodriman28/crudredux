import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Productos />} />
            <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
            <Route
              exact
              path="/productos/editar/:id"
              element={<EditarProducto />}
            />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
