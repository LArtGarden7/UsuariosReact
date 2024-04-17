// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definimos el componente principal de la aplicación
const App = () => {
  // Definimos el estado para almacenar la lista de usuarios y el nuevo usuario a crear
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    NombreUsuario: '',
    FechaNacimiento: '',
    Genero: '',
    Telefono: '',
    CorreoElectronico: '',
    Contrasenia: '',
    TipoUsuarioID: '1',
    Foto: ''
  });
  // Definimos el estado para almacenar el archivo seleccionado por el usuario
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Usamos useEffect para obtener la lista de usuarios cuando el componente se monta
  useEffect(() => {
    axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  // Función para manejar el cambio en el campo de archivo del formulario
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar junto con la solicitud
    const formData = new FormData();
    formData.append('NombreUsuario', newUser.validationUsername);
    formData.append('FechaNacimiento', newUser.validationBirthDate);
    formData.append('Genero', newUser.validationGender);
    formData.append('Telefono', newUser.validationPhone);
    formData.append('CorreoElectronico', newUser.validationEmail);
    formData.append('Contrasenia', newUser.validationPassword);
    formData.append('TipoUsuarioID', newUser.TipoUsuarioID);
    if (selectedFile) {
      formData.append('Foto', selectedFile);
    }

    // Enviamos la solicitud para crear un nuevo usuario
    axios.post('https://api-mysql-types-l-art-garden.onrender.com/api/users', formData)
      .then(response => {
        console.log('User created successfully:', response.data);
        // Reseteamos el estado del nuevo usuario y el archivo seleccionado
        setNewUser({
          NombreUsuario: '',
          FechaNacimiento: '',
          Genero: '',
          Telefono: '',
          CorreoElectronico: '',
          Contrasenia: '',
          TipoUsuarioID: '1',
          Foto: ''
        });
        setSelectedFile(null);
        // Actualizamos la lista de usuarios después de crear uno nuevo
        axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/users')
          .then(response => setUsers(response.data))
          .catch(error => console.error('Error fetching users:', error));
      })
      .catch(error => console.error('Error creating user:', error));
  };

  // Renderizamos el formulario y la lista de usuarios
  return (
    <div>
      <h1>Crear Nuevo Usuario</h1>
      
      <form className="row needs-validation mx-auto" noValidate onSubmit={handleSubmit}>
  <div className="col-xl-8 mb-3 mx-auto">
    <label htmlFor="NombreUsuario" className="form-label">Nombre</label>
    <input type="text" className="form-control" id="NombreUsuario" placeholder="Ingresa tu nombre" value={newUser.NombreUsuario} onChange={handleChange} required />
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="col-xl-8 mb-3 mx-auto">
    <label htmlFor="FechaNacimiento" className="form-label">Fecha de Nacimiento</label>
    <input type="date" className="form-control" id="FechaNacimiento" value={newUser.FechaNacimiento} onChange={handleChange} required />
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="col-xl-8 mb-3 mx-auto">
    <label htmlFor="Telefono" className="form-label">Teléfono</label>
    <input type="text" className="form-control" id="Telefono" placeholder="Ingresa tu teléfono" value={newUser.Telefono} onChange={handleChange} required />
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="col-xl-8 mb-3 mx-auto">
    <label htmlFor="CorreoElectronico" className="form-label">Correo Electrónico</label>
    <input type="text" className="form-control" id="CorreoElectronico" placeholder="Ingresa tu correo" value={newUser.CorreoElectronico} onChange={handleChange} required autoComplete="email" />
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="col-xl-8 mb-3 mx-auto">
    <label htmlFor="Contrasenia" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="Contrasenia" placeholder="Ingresa tu contraseña" value={newUser.Contrasenia} onChange={handleChange} required autoComplete="current-password" />
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="col-xl-8 mb-3 mx-auto">
    <label htmlFor="validationConfirmPassword" className="form-label">Confirmar Contraseña</label>
    <input type="password" className="form-control" id="validationConfirmPassword" placeholder="Confirma tu contraseña" value={newUser.Contrasenia} onChange={handleChange} required autoComplete="current-password" />
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="col-xl-8 mb-5 mx-auto">
    <label htmlFor="Genero" className="form-label">Género</label>
    <select className="form-select" id="Genero" value={newUser.Genero} onChange={handleChange} required>
      <option value="" disabled>Selecciona tu género</option>
      <option value="Mujer">Mujer</option>
      <option value="Hombre">Hombre</option>
    </select>
    <div className="invalid-feedback ps-1">
      Este campo es obligatorio.
    </div>
  </div>
  <div className="d-flex justify-content-md-center col-md-6 mb-5">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="invalidCheck1" required />
      <label className="form-check-label" htmlFor="invalidCheck1">
        Aceptar términos y condiciones
      </label>
      <div className="invalid-feedback">
        Debes aceptar antes de enviar.
      </div>
    </div>
  </div>
  <div className="d-flex justify-content-md-center col-md-6 mb-5">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="invalidCheck2" required />
      <label className="form-check-label" htmlFor="invalidCheck2">
        Aceptar términos y condiciones
      </label>
      <div className="invalid-feedback">
        Debes aceptar antes de enviar.
      </div>
    </div>
  </div>
  <div className="row mx-auto">
    <div className="col-xl-7 col-10 d-grid gap-2 mb-3 mx-auto">
      <button type="submit" className="btn btn-warning" role="button">Crear cuenta</button>
    </div>
    <div className="col-xl-7 col-10 d-grid gap-2 mb-5 mx-auto">
      <a href="/Login" id="btnLogin" className="btn btn-outline-warning" role="button">Ya poseo una cuenta</a>
    </div>
  </div>
</form>

      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            {/* Aquí se renderizan los encabezados de la tabla de usuarios */}
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Fecha de Nacimiento</th>
            <th>Género</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Tipo de Usuario ID</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se renderizan las filas de la tabla de usuarios */}
          {users.map((user: any) => (
            <tr key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.NombreUsuario}</td>
              <td>{user.FechaNacimiento}</td>
              <td>{user.Genero}</td>
              <td>{user.Telefono}</td>
              <td>{user.CorreoElectronico}</td>
              <td>{user.TipoUsuarioID}</td>
              <td>{user.Foto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros archivos
export default App;