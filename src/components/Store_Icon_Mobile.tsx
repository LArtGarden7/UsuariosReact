import { Dropdown } from 'react-bootstrap';
import '../styles/Store_Icon_Mobile.css';

export function StoreIconMobile() {
  return (
    <div className="d-flex align-items-center">
      <button className="navbar-toggler me-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav2"
              aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <Dropdown className="dropdown-container-2 d-lg-none">
        <Dropdown.Toggle className="nav-circle" id="dropdownMenuButton">
          <i className="fa-solid fa-store fa-xl" style={{ color: '#59431fff' }}></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">Configuración de la Florería</Dropdown.Item>
          <Dropdown.Item href="#">Gestión de Flores</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Registro de pedidos</Dropdown.Item>
          <Dropdown.Item href="#">Notificaciones</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

