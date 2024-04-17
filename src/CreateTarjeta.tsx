// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definimos el componente principal de la aplicación
const App = () => {
  // Definimos el estado para almacenar la lista de tarjetas y la nueva tarjeta a crear
  const [tarjetas, setTarjetas] = useState<any[]>([]);
  const [newTarjeta, setNewTarjeta] = useState({
    IDUsuario: '',
    NumeroTarjeta: '',
    NombreTitular: '',
    ApellidoTitular: '',
    FechaExpiracion: '',
    CodigoSeguridad: '',
    Saldo: ''
  });

  // Usamos useEffect para obtener la lista de tarjetas cuando el componente se monta
  useEffect(() => {
    axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/tarjetas')
      .then(response => setTarjetas(response.data))
      .catch(error => console.error('Error fetching tarjetas:', error));
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTarjeta({ ...newTarjeta, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Enviamos la solicitud para crear una nueva tarjeta
    axios.post('https://api-mysql-types-l-art-garden.onrender.com/api/tarjetas', newTarjeta)
      .then(response => {
        console.log('Tarjeta created successfully:', response.data);
        // Reseteamos el estado de la nueva tarjeta
        setNewTarjeta({
          IDUsuario: '',
          NumeroTarjeta: '',
          NombreTitular: '',
          ApellidoTitular: '',
          FechaExpiracion: '',
          CodigoSeguridad: '',
          Saldo: ''
        });
        // Actualizamos la lista de tarjetas después de crear una nueva
        axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/tarjetas')
          .then(response => setTarjetas(response.data))
          .catch(error => console.error('Error fetching tarjetas:', error));
      })
      .catch(error => console.error('Error creating tarjeta:', error));
  };

  // Renderizamos el formulario y la lista de tarjetas
  return (
    <div>
      <h1>Crear Nueva Tarjeta</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí se renderizan los campos del formulario para crear una nueva tarjeta */}
        <input type="text" name="IDUsuario" placeholder="ID Usuario" value={newTarjeta.IDUsuario} onChange={handleInputChange} />
        <input type="text" name="NumeroTarjeta" placeholder="Número de Tarjeta" value={newTarjeta.NumeroTarjeta} onChange={handleInputChange} />
        <input type="text" name="NombreTitular" placeholder="Nombre del Titular" value={newTarjeta.NombreTitular} onChange={handleInputChange} />
        <input type="text" name="ApellidoTitular" placeholder="Apellido del Titular" value={newTarjeta.ApellidoTitular} onChange={handleInputChange} />
        <input type="date" name="FechaExpiracion" placeholder="Fecha de Expiración" value={newTarjeta.FechaExpiracion} onChange={handleInputChange} />
        <input type="text" name="CodigoSeguridad" placeholder="Código de Seguridad" value={newTarjeta.CodigoSeguridad} onChange={handleInputChange} />
        <input type="text" name="Saldo" placeholder="Saldo" value={newTarjeta.Saldo} onChange={handleInputChange} />
        <button type="submit">Crear Tarjeta</button>
      </form>

      <h1>Lista de Tarjetas</h1>
      <table>
        <thead>
          <tr>
            {/* Aquí se renderizan los encabezados de la tabla de tarjetas */}
            <th>ID</th>
            <th>ID Usuario</th>
            <th>Número de Tarjeta</th>
            <th>Nombre del Titular</th>
            <th>Apellido del Titular</th>
            <th>Fecha de Expiración</th>
            <th>Código de Seguridad</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se renderizan las filas de la tabla de tarjetas */}
          {tarjetas.map((tarjeta: any) => (
            <tr key={tarjeta.IDTarjeta}>
              <td>{tarjeta.IDTarjeta}</td>
              <td>{tarjeta.IDUsuario}</td>
              <td>{tarjeta.NumeroTarjeta}</td>
              <td>{tarjeta.NombreTitular}</td>
              <td>{tarjeta.ApellidoTitular}</td>
              <td>{tarjeta.FechaExpiracion}</td>
              <td>{tarjeta.CodigoSeguridad}</td>
              <td>{tarjeta.Saldo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros archivos
export default App;