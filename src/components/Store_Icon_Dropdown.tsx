import { Dropdown } from 'react-bootstrap';
import '../styles/Store_Icon_Dropdown.css'; 

export function StoreIconDropdown() {
  return (
    <Dropdown className="dropdown-container-3">
      <Dropdown.Toggle id="dropdown-store" className="nav-circle">
        <i className="fa-solid fa-store fa-xl" style={{ color: '#ffb800' }}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Configuración de la Florería</Dropdown.Item>
        <Dropdown.Item href="#">Gestión de Flores</Dropdown.Item>
        <Dropdown.Item href="#">Registro de pedidos</Dropdown.Item>
        <Dropdown.Item href="#">Notificaciones</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

