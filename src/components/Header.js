import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between mb-5">
      <div className="container">
        {" "}
        <Link to={"/"}>
          <h1 className="text-light">CRUD - React, Redux, REST API & Axios</h1>
        </Link>
      </div>

      <Link
        className="btn btn-danger nuevo-post d-block d-md-inline-block"
        to={"/productos/nuevo"}
      >
        Agregar Producto &#43;
      </Link>
    </nav>
  );
};

export default Header;
