// Importamos las librerías necesarias
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Definimos el componente principal de la aplicación
const App = () => {
  // Definimos el estado para almacenar la lista de productos y el nuevo producto a crear
  const [productos, setProductos] = useState<any[]>([]);
  const [newProducto, setNewProducto] = useState({
    IDCategoria: '',
    IDInventario: '',
    NombreProducto: '',
    Descripcion: '',
    Precio: '',
    Stock: '',
    Imagen1: '',
    Imagen2: '',
    Imagen3: '',
    Imagen4: '',
    Imagen5: ''
  });
  // Definimos el estado para almacenar los archivos seleccionados por el usuario
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Usamos useEffect para obtener la lista de productos cuando el componente se monta
  useEffect(() => {
    axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/products')
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProducto({ ...newProducto, [e.target.name]: e.target.value });
  };

  // Función para manejar el cambio en los campos textarea del formulario
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewProducto({ ...newProducto, [e.target.name]: e.target.value });
  };

  // Función para manejar el cambio en el campo de archivo del formulario
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear un objeto FormData para enviar junto con la solicitud
    const formData = new FormData();
    formData.append('IDCategoria', newProducto.IDCategoria);
    formData.append('IDInventario', newProducto.IDInventario);
    formData.append('NombreProducto', newProducto.NombreProducto);
    formData.append('Descripcion', newProducto.Descripcion);
    formData.append('Precio', newProducto.Precio);
    formData.append('Stock', newProducto.Stock);
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`Imagen${i+1}`, selectedFiles[i]);
      }
    }

    // Enviamos la solicitud para crear un nuevo producto
    axios.post('https://api-mysql-types-l-art-garden.onrender.com/api/products', formData)
      .then(response => {
        console.log('Producto created successfully:', response.data);
        // Reseteamos el estado del nuevo producto y los archivos seleccionados
        setNewProducto({
          IDCategoria: '',
          IDInventario: '',
          NombreProducto: '',
          Descripcion: '',
          Precio: '',
          Stock: '',
          Imagen1: '',
          Imagen2: '',
          Imagen3: '',
          Imagen4: '',
          Imagen5: ''
        });
        setSelectedFiles(null);
        // Actualizamos la lista de productos después de crear uno nuevo
        axios.get('https://api-mysql-types-l-art-garden.onrender.com/api/products')
          .then(response => setProductos(response.data))
          .catch(error => console.error('Error fetching productos:', error));
      })
      .catch(error => console.error('Error creating producto:', error));
  };

  // Renderizamos el formulario y la lista de productos
  return (
    <div>
      <h1>Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí se renderizan los campos del formulario para crear un nuevo producto */}
        <input type="text" name="IDCategoria" placeholder="ID Categoria" value={newProducto.IDCategoria} onChange={handleInputChange} />
        <input type="text" name="IDInventario" placeholder="ID Inventario" value={newProducto.IDInventario} onChange={handleInputChange} />
        <input type="text" name="NombreProducto" placeholder="Nombre del Producto" value={newProducto.NombreProducto} onChange={handleInputChange} />
        <textarea name="Descripcion" placeholder="Descripción" value={newProducto.Descripcion} onChange={handleTextareaChange} />
        <input type="text" name="Precio" placeholder="Precio" value={newProducto.Precio} onChange={handleInputChange} />
        <input type="text" name="Stock" placeholder="Stock" value={newProducto.Stock} onChange={handleInputChange} />
        <input type="file" name="Imagen1" onChange={handleFileChange} />
        <input type="file" name="Imagen2" onChange={handleFileChange} />
        <input type="file" name="Imagen3" onChange={handleFileChange} />
        <input type="file" name="Imagen4" onChange={handleFileChange} />
        <input type="file" name="Imagen5" onChange={handleFileChange} />
        <button type="submit">Crear Producto</button>
      </form>

      <h1>Lista de Productos</h1>
      <table>
        <thead>
          <tr>
            {/* Aquí se renderizan los encabezados de la tabla de productos */}
            <th>ID</th>
            <th>ID Categoria</th>
            <th>ID Inventario</th>
            <th>Nombre del Producto</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen1</th>
            <th>Imagen2</th>
            <th>Imagen3</th>
            <th>Imagen4</th>
            <th>Imagen5</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se renderizan las filas de la tabla de productos */}
          {productos.map((producto: any) => (
            <tr key={producto.ID}>
              <td>{producto.ID}</td>
              <td>{producto.IDCategoria}</td>
              <td>{producto.IDInventario}</td>
              <td>{producto.NombreProducto}</td>
              <td>{producto.Descripcion}</td>
              <td>{producto.Precio}</td>
              <td>{producto.Stock}</td>
              <td>{producto.Imagen1}</td>
              <td>{producto.Imagen2}</td>
              <td>{producto.Imagen3}</td>
              <td>{producto.Imagen4}</td>
              <td>{producto.Imagen5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros archivos
export default App;