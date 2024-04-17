import { Dropdown } from 'react-bootstrap';
import '../styles/User_Icon_DropDown.css';

export function UserIconDropdown(){
  return (
    <Dropdown className="dropdown-container">
      <Dropdown.Toggle id="dropdown-basic" className="nav-circle">
        <i className="fa-solid fa-user fa-xl" style={{ color: '#ffb800' }}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Crear cuenta</Dropdown.Item>
        <Dropdown.Item href="#">Iniciar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    
  );
}

