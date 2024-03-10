import React, { useState, useEffect } from 'react';
import './ConsultasList.css';
import '../Modal/Modal.css';
import jsPDF from 'jspdf';
import logoImg from '../img/pngwing.jpeg';

const ConsultasList = () => {
    const [consultas, setConsultas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [consultaData, setConsultaData] = useState({
        Cedula: '',
        fecha_hora: '',
        motivo_consulta: '',
        sintomas: '',
        diagnostico: '',
        tratamiento: '',
        informacion_laboratorio: [
            ["", "", "", "", ""], 
            ["", "", "", "", ""], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""]
        ]
    });

    useEffect(() => {
        fetch('http://localhost:7777/api/historiasclinicas')
            .then(response => response.json())
            .then(data => setConsultas(data))
            .catch(error => console.error('Error al obtener las consultas:', error));
    }, []);

    const handleLabDataChange = (e, rowIndex, colIndex) => {
        const { value } = e.target;
        setConsultaData(prevConsultaData => {
            const updatedLabData = [...prevConsultaData.informacion_laboratorio];
            updatedLabData[rowIndex][colIndex] = value;
            return { ...prevConsultaData, informacion_laboratorio: updatedLabData };
        });
    };

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

/*     const logoWidth = 40; 
    const logoHeight = (logo.width * logoWidth) / logo.height; 
    const logoX = pageWidth - logoWidth - 10; 
    const logoY = 247; */

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const lineHeight = 7;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const logo = new Image();
          
        /* logo.onerror = function() {
            console.error('Error al cargar la imagen del logo.');
          }; */
    
        doc.setFontSize();
        doc.text('Historias Clínicas', pageWidth / 2, 20, { align: 'center', color: 'blue' });
        logo.onload = function() {
            consultas.forEach((consulta, index) => {
                if (index > 0) {
                    doc.addPage();
                }
    
                const data = [
                    { label: 'Cedula:', value: consultaData.paciente_id },
                    { label: 'Fecha y Hora:', value: consultaData.fecha_hora },
                    { label: 'Motivo de Consulta:', value: consultaData.motivo_consulta },
                    { label: 'Síntomas:', value: consultaData.sintomas },
                    { label: 'Diagnóstico:', value: consultaData.diagnostico },
                    { label: 'Tratamiento:', value: consultaData.tratamiento },
                    { label: 'Informacion Laboratorio:', value: consultaData.labData.map(row => row.join(', ')) },
                ];
    
                let consultaY = pageHeight / 3;
    
                doc.setLineWidth(0.5);
                doc.rect(10, 10, pageWidth - 20, pageHeight - 20); 
                doc.line(10, pageHeight / 5, pageWidth - 10, pageHeight / 5); 
                doc.line(10, pageHeight / 12, pageWidth - 10, pageHeight / 12); 
    
                doc.setFontSize(15);
                doc.setFont('helvetica', 'bold');
                doc.text(`Historia Clínica ${index + 1}`, pageWidth / 2, 30, { align: 'center' });
    
                data.forEach(({ label, value }, i) => {
                    doc.setFont('helvetica', 'bold');
                    doc.text(label, 20, consultaY); 
                    doc.setFont('helvetica', 'normal');
                    doc.text(value, 50, consultaY); 
                    consultaY += lineHeight; 
                });
    
                const logoWidth = 40; 
                const logoHeight = (logo.width * logoWidth) / logo.height; 
                const logoX = pageWidth - logoWidth - 10; 
                const logoY = 247;
                doc.addImage(logo, 'JPEG', logoX, logoY, logoWidth, logoHeight);
            });
    
            doc.save('historias_clinicas.pdf');
        };
    
        logo.onerror = function() {
            console.error('Error al cargar la imagen del logo.');
        };
    
        logo.src = logoImg;
    };
    

    
    
    
  /*   export default handleGeneratePDF; */
    
    
    
    


    return (
        <div className="consultas-container">
            <h2 className="consultas-title">Listado de Consultas</h2>
            <div className="table-container">
         </div>
            <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                <button className="crear-consulta" onClick={handleCreateConsulta}>Crear Consulta</button>
                <button className="generar-pdf" onClick={handleGeneratePDF}>Generar PDF</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Crear Nueva Consulta</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="paciente_id">Cedula</label>
                                <input
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
                                    type="text"
                                    id="tratamiento"
                                    name="tratamiento"
                                    value={consultaData.tratamiento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                            <label htmlFor="informacion_laboratorio">Información del Laboratorio:</label>
                               <table>
                                   <thead>
                                       <tr>
                                           <th>A</th>
                                           <th>B</th>
                                           <th>C</th>
                                           <th>D</th>
                                           <th>E</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {[...Array(5)].map((_, rowIndex) => (
                                           <tr key={rowIndex}>
                                               {[...Array(5)].map((_, colIndex) => (
                                                   <td key={colIndex}>
                                                       <input
                                                           type="text"
                                                           value={consultaData.labData[rowIndex][colIndex]}
                                                           onChange={(e) => handleLabDataChange(e, rowIndex, colIndex)}
                                                       />
                                                   </td>
                                               ))}
                                           </tr>
                                       ))}
                                   </tbody>
                               </table>
                                   </div>
                            <button className="boton" type="submit">Crear Consulta</button>
                        </form>
                    </div>
                </div>
            )}
            <ul>
                {consultas.map(consulta => (
                    <li key={consulta._id.$oid} className="consulta-card">
                        <p>Cedula: {consulta.paciente_id}</p>
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
