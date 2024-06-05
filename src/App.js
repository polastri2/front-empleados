import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import logo from './logo.webp';
import axios from 'axios';
import './App.css';

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [empleadosPerPage] = useState(5);

  useEffect(() => {
    const fetchDataEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:5000/empleados');
        if (response.status === 200) {
          setEmpleados(response.data);
        } else {
          console.error('Error al obtener los datos de la API');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchDataEmpleados();
  }, []);

  // Obtener los empleados de la página actual
  const indexOfLastEmpleado = currentPage * empleadosPerPage;
  const indexOfFirstEmpleado = indexOfLastEmpleado - empleadosPerPage;
  const currentEmpleados = empleados.slice(indexOfFirstEmpleado, indexOfLastEmpleado);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>DOCUMENT</th>
            <th>SALARY</th>
            <th>AGE</th>
            <th>PROFILE</th>
            <th>ADMISION DATE</th>
          </tr>
        </thead>
        <tbody>
          {currentEmpleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.name}</td>
              <td>{empleado.document_number}</td>
              <td>{empleado.salary}</td>
              <td>{empleado.age}</td>
              <td>{empleado.profile}</td>
              <td>{empleado.admission_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(empleados.length / empleadosPerPage)}>Siguiente</button>
        <span>Página {currentPage} de {Math.ceil(empleados.length / empleadosPerPage)}</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <h2>
            <img className="image" src={logo} width={100} alt="logo" />
          </h2>
          <ul className="list-empleados">
            <li>
              <Link to="/empleados" style={{ textDecoration: 'none', color: 'white' }}>Empleados</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Routes>
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/" element={<Empleados />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
