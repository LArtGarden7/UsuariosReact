// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definimos el componente principal de la aplicación
const App = () => {
  // Definimos el estado para almacenar la lista de florerias y la nueva floreria a crear
  const [florerias, setFlorerias] = useState<any[]>([]);
  const [newFloreria, setNewFloreria] = useState({
    IDUsuario: '',
    NombreFloreria: '',
    Descripcion: '',
    Direccion: '',
    Telefono: '',
    CorreoElectronico: '',
    RedesSociales: '',
    Foto: ''
  });
  // Definimos el estado para almacenar el archivo seleccionado por el usuario
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Usamos useEffect para obtener la lista de florerias cuando el componente se monta
  useEffect(() => {
    axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/flowerShops')
      .then(response => setFlorerias(response.data))
      .catch(error => console.error('Error fetching florerias:', error));
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFloreria({ ...newFloreria, [e.target.name]: e.target.value });
  };

  // Función para manejar el cambio en los campos textarea del formulario
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewFloreria({ ...newFloreria, [e.target.name]: e.target.value });
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
    formData.append('IDUsuario', newFloreria.IDUsuario);
    formData.append('NombreFloreria', newFloreria.NombreFloreria);
    formData.append('Descripcion', newFloreria.Descripcion);
    formData.append('Direccion', newFloreria.Direccion);
    formData.append('Telefono', newFloreria.Telefono);
    formData.append('CorreoElectronico', newFloreria.CorreoElectronico);
    formData.append('RedesSociales', newFloreria.RedesSociales);
    if (selectedFile) {
      formData.append('Foto', selectedFile);
    }

    // Enviamos la solicitud para crear una nueva floreria
    axios.post('https://api-mysql-types-l-art-garden.onrender.com/api/flowerShops', formData)
      .then(response => {
        console.log('Floreria created successfully:', response.data);
        // Reseteamos el estado de la nueva floreria y el archivo seleccionado
        setNewFloreria({
          IDUsuario: '',
          NombreFloreria: '',
          Descripcion: '',
          Direccion: '',
          Telefono: '',
          CorreoElectronico: '',
          RedesSociales: '',
          Foto: ''
        });
        setSelectedFile(null);
        // Actualizamos la lista de florerias después de crear una nueva
        axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/flowerShops')
          .then(response => setFlorerias(response.data))
          .catch(error => console.error('Error fetching florerias:', error));
      })
      .catch(error => console.error('Error creating floreria:', error));
  };

  // Renderizamos el formulario y la lista de florerias
  return (
    <div>
      <h1>Crear Nueva Floreria</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí se renderizan los campos del formulario para crear una nueva floreria */}
        <input type="text" name="IDUsuario" placeholder="ID Usuario" value={newFloreria.IDUsuario} onChange={handleInputChange} />
        <input type="text" name="NombreFloreria" placeholder="Nombre de la Floreria" value={newFloreria.NombreFloreria} onChange={handleInputChange} />
        <textarea name="Descripcion" placeholder="Descripción" value={newFloreria.Descripcion} onChange={handleTextareaChange} />
        <input type="text" name="Direccion" placeholder="Dirección" value={newFloreria.Direccion} onChange={handleInputChange} />
        <input type="text" name="Telefono" placeholder="Teléfono" value={newFloreria.Telefono} onChange={handleInputChange} />
        <input type="email" name="CorreoElectronico" placeholder="Correo Electrónico" value={newFloreria.CorreoElectronico} onChange={handleInputChange} />
        <textarea name="RedesSociales" placeholder="Redes Sociales" value={newFloreria.RedesSociales} onChange={handleTextareaChange} />
        <input type="file" name="Foto" onChange={handleFileChange} />
        <button type="submit">Crear Floreria</button>
      </form>

      <h1>Lista de Florerias</h1>
      <table>
        <thead>
          <tr>
            {/* Aquí se renderizan los encabezados de la tabla de florerias */}
            <th>ID</th>
            <th>ID Usuario</th>
            <th>Nombre de la Floreria</th>
            <th>Descripción</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Redes Sociales</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se renderizan las filas de la tabla de florerias */}
          {florerias.map((floreria: any) => (
            <tr key={floreria.ID}>
              <td>{floreria.ID}</td>
              <td>{floreria.IDUsuario}</td>
              <td>{floreria.NombreFloreria}</td>
              <td>{floreria.Descripcion}</td>
              <td>{floreria.Direccion}</td>
              <td>{floreria.Telefono}</td>
              <td>{floreria.CorreoElectronico}</td>
              <td>{floreria.RedesSociales}</td>
              <td>{floreria.Foto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros archivos
export default App;