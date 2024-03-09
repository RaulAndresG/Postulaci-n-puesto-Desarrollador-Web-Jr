import React, { useState, useEffect } from 'react';
import './ConsultasList.css';
import '../Modal/Modal.css';
import jsPDF from 'jspdf';

const ConsultasList = () => {
    const [consultas, setConsultas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [consultaData, setConsultaData] = useState({
        paciente_id: '',
        fecha_hora: '',
        motivo_consulta: '',
        sintomas: '',
        diagnostico: '',
        tratamiento: '',
        informacion_laboratorio: '',
    });

    useEffect(() => {
        fetch('http://localhost:7777/api/historiasclinicas')
            .then(response => response.json())
            .then(data => setConsultas(data))
            .catch(error => console.error('Error al obtener las consultas:', error));
    }, []);

    const handleCreateConsulta = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsultaData({ ...consultaData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7777/api/historiasclinicas/serial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(consultaData)
            });
            const data = await response.json();
            console.log('Consulta creada:', data);
            handleCloseModal();
            fetch('http://localhost:7777/api/historiasclinicas')
                .then(response => response.json())
                .then(data => setConsultas(data))
                .catch(error => console.error('Error al obtener las consultas:', error));
        } catch (error) {
            console.error('Error al crear la consulta:', error);
        }
    };


    const handleGeneratePDF = () => {
      const doc = new jsPDF();
      const lineHeight = 7;
      let y = 10;

      consultas.forEach((consulta, index) => {
          const data = [
              `Paciente ID: ${consulta.paciente_id}`,
              `Fecha y Hora: ${new Date(consulta.fecha_hora).toLocaleString()}`,
              `Motivo de Consulta: ${consulta.motivo_consulta}`,
              `Síntomas: ${consulta.sintomas}`,
              `Diagnóstico: ${consulta.diagnostico}`,
              `Tratamiento: ${consulta.tratamiento}`,
          ];
          
          doc.text(10, y, `Consulta ${index + 1}:`);
          data.forEach(line => {
              y += lineHeight;
              doc.text(20, y, line);
          });
          y += lineHeight;
      });

      doc.save('historias_clinicas.pdf');
  };

    return (
      <div className="consultas-container"> 
          <h2 className="consultas-title">Listado de Consultas</h2> 
          <button className="crear-consulta" onClick={handleCreateConsulta}>Crear Consulta</button>
          <button  className="generar-pdf crear-consulta " onClick={handleGeneratePDF}>Generar PDF</button>
          {showModal && (
              <div className="modal">
                  <div className="modal-content">
                      <span className="close"  onClick={handleCloseModal}>&times;</span>
                      <h2>Crear Nueva Consulta</h2>
                      <form onSubmit={handleSubmit}>
                          <div className="form-group">
                              <label htmlFor="paciente_id">Paciente ID:</label>
                              <input
                                  type="text"
                                  id="paciente_id"
                                  name="paciente_id"
                                  value={consultaData.paciente_id}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="fecha_hora"> Fecha_hora:</label>
                              <input
                                  type="text"
                                  id="fecha_hora"
                                  name="fecha_hora"
                                  value={consultaData.fecha_hora}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="motivo_consulta">Motivo de Consulta:</label>
                              <input
                                  type="text"
                                  id="motivo_consulta"
                                  name="motivo_consulta"
                                  value={consultaData.motivo_consulta}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="sintomas">Síntomas:</label>
                              <input
                                  type="text"
                                  id="sintomas"
                                  name="sintomas"
                                  value={consultaData.sintomas}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="diagnostico">Diagnóstico:</label>
                              <input
                                  type="text"
                                  id="diagnostico"
                                  name="diagnostico"
                                  value={consultaData.diagnostico}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="form-group">
                              <label htmlFor="tratamiento">Tratamiento:</label>
                              <input
                                  type="text"
                                  id="tratamiento"
                                  name="tratamiento"
                                  value={consultaData.tratamiento}
                                  onChange={handleChange}
                              />
                          </div>
                          <div className="form-group">
                                <label htmlFor="informacion_laboratorio">Información del Laboratorio:</label>
                                <textarea
                                    id="informacion_laboratorio"
                                    name="informacion_laboratorio"
                                    value={consultaData.informacion_laboratorio}
                                    onChange={handleChange}
                                />
                            </div>
                          <button className="boton" type="submit">Crear Consulta</button>
                      </form>
                  </div>
              </div>
          )}
          <ul>
              {consultas.map(consulta => (
                  <li key={consulta._id.$oid} className="consulta-card">
                      <p>Paciente ID: {consulta.paciente_id}</p>
                      <p>Fecha y Hora: {new Date(consulta.fecha_hora).toLocaleString()}</p>
                      <p>Motivo de consulta: {consulta.motivo_consulta}</p>
                      <p>Síntomas: {consulta.sintomas}</p>
                      <p>Diagnóstico: {consulta.diagnostico}</p>
                      <p>Tratamiento: {consulta.tratamiento}</p>
                      <p>Información del Laboratorio: {consulta.informacion_laboratorio}</p> {/* Mostrar la información del laboratorio */}
                      <hr />
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default ConsultasList;
