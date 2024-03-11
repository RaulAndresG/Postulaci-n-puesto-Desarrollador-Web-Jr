import React, { useState, useEffect } from 'react';
import './ConsultasList.css';
import '../Modal/Modal.css';
import jsPDF from 'jspdf';
import logoImg from '../img/pngwing.jpeg';

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

   const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const lineHeight = 7;
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const logo = new Image();
    
        logo.onload = function() {
            consultas.forEach((consulta, index) => {
                if (index > 0) {
                    doc.addPage();
                }
                let consultaY = 30;
                doc.setDrawColor(0); // Color del borde
                doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
                doc.setFillColor(192, 192, 192); // Color gris
                doc.rect(10, consultaY, pageWidth - 20, lineHeight, 'F');
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0); // Color negro
                doc.setFont('helvetica', 'bold');
                doc.text('Cedula', 20, consultaY + lineHeight / 2);
                consultaY += lineHeight;
                doc.setFillColor(255, 255, 255); // Color blanco
                doc.rect(10, consultaY, pageWidth - 20, lineHeight, 'F');
                doc.setFont('helvetica', 'normal');
                doc.text(consulta.paciente_id, 20, consultaY + lineHeight / 2);
    
    
                let data = [
                    { label: 'Fecha y Hora:', value: new Date(consulta.fecha_hora).toLocaleString() },
                    { label: 'Motivo de Consulta:', value: consulta.motivo_consulta },
                    { label: 'Síntomas:', value: consulta.sintomas },
                    { label: 'Diagnóstico:', value: consulta.diagnostico },
                    { label: 'Tratamiento:', value: consulta.tratamiento },
                ];


                data.forEach(item => {
                    consultaY += lineHeight;
                    doc.setFillColor(192, 192, 192); // Color gris
                    doc.rect(10, consultaY, pageWidth - 20, lineHeight, 'F');
                    doc.setFont('helvetica', 'bold');
                    doc.text(item.label, 20, consultaY + lineHeight / 2);
                });
    
                // Contenido de las tablas secundarias
                data.forEach(item => {
                    consultaY += lineHeight;
                    doc.setFillColor(255, 255, 255); // Color blanco
                    doc.rect(10, consultaY, pageWidth - 20, lineHeight, 'F');
                    doc.setFont('helvetica', 'normal');
                    doc.text(item.value, 20, consultaY + lineHeight / 2);
                });
    



    
              /*   let consultaY = pageHeight / 3; */
    
                doc.setLineWidth(0.5);
                doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
                doc.line(10, pageHeight / 6, pageWidth - 10, pageHeight / 6);
                doc.line(10, pageHeight / 10, pageWidth - 10, pageHeight / 10);
    
                doc.setFontSize(15);
                doc.setFont('helvetica', 'bold');
                doc.text(`Historia Clínica ${index + 1}`, pageWidth / 2, 30, { align: 'center' });
    
              /*   data.forEach((item, i) => {
                    doc.setFont('helvetica', 'normal');
                    const textWidth = doc.getStringUnitWidth(`${item.label} ${item.value}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const xPosition = (pageWidth - textWidth) / 2;
                    doc.text(`${item.label} ${item.value}`, xPosition, consultaY);
                    consultaY += lineHeight;
                });
 */
                // Información del laboratorio
                
                if (Array.isArray(consulta.informacion_laboratorio)) {
                    let infoLabY = consultaY;
                    doc.setFont('helvetica', 'bold');
                    doc.text('Información del Laboratorio:', 15, infoLabY);
                    infoLabY += lineHeight;
                    consulta.informacion_laboratorio.forEach((fila, filaIndex) => {
                        const filaNumero = filaIndex + 1;
                        fila.forEach((columna, columnIndex) => {
                            doc.setFont('helvetica', 'normal');
                            const textWidth = doc.getStringUnitWidth(`${filaNumero}.${columna}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                            const xPosition = 20 + (columnIndex * 30); // Ajusta según necesites
                            doc.text(`${filaNumero}.${columna}`, xPosition, infoLabY, );
                        });
                        infoLabY += lineHeight;
                    });
                }
    
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
                                className='input1'
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
                                className='input1'
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
                                className='input1'
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
                                className='input1'
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
                                className='input1'
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
                                className='input1'
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
                                           <th></th>
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
                                             <td>{rowIndex + 1}</td>
                                               {[...Array(5)].map((_, colIndex) => (
                                                   <td key={colIndex}>
                                                       <input
                                                           className='input2 '
                                                           type="text"
                                                           value={consultaData.informacion_laboratorio[rowIndex][colIndex]}
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
                         {Array.isArray(consulta.informacion_laboratorio) && ( 
                             <div>
                                 <p>Información del Laboratorio:</p>
                                 <ol className="laboratorio-info">
                                     {consulta.informacion_laboratorio.map((fila, index) => (
                                         <li key={index}> {fila.join(', ')}</li>
                                     ))}
                                 </ol>
                             </div>
                         )}
                         <hr />
                     </li>
                 ))}
                 </ul>               
        </div>
    );
};

export default ConsultasList;
