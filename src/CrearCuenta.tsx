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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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
    formData.append('NombreUsuario', newUser.NombreUsuario);
    formData.append('FechaNacimiento', newUser.FechaNacimiento);
    formData.append('Genero', newUser.Genero);
    formData.append('Telefono', newUser.Telefono);
    formData.append('CorreoElectronico', newUser.CorreoElectronico);
    formData.append('Contrasenia', newUser.Contrasenia);
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
      <form onSubmit={handleSubmit}>
        {/* Aquí se renderizan los campos del formulario para crear un nuevo usuario */}
        <input type="text" name="NombreUsuario" placeholder="Nombre de Usuario" value={newUser.NombreUsuario} onChange={handleChange} />
        <input type="date" name="FechaNacimiento" placeholder="Fecha de Nacimiento" value={newUser.FechaNacimiento} onChange={handleChange} />
        <input type="text" name="Genero" placeholder="Género" value={newUser.Genero} onChange={handleChange} />
        <input type="text" name="Telefono" placeholder="Teléfono" value={newUser.Telefono} onChange={handleChange} />
        <input type="email" name="CorreoElectronico" placeholder="Correo Electrónico" value={newUser.CorreoElectronico} onChange={handleChange} />
        <input type="password" name="Contrasenia" placeholder="Contraseña" value={newUser.Contrasenia} onChange={handleChange} />
        <input type="file" name="Foto" onChange={handleFileChange} />
        <button type="submit">Crear Usuario</button>
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