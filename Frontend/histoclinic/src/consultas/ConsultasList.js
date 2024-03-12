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
                doc.setDrawColor(0);
                doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
                doc.setFillColor(192, 192, 192);
                doc.rect(15, consultaY, pageWidth - 30, lineHeight, 'F');
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.setFont('helvetica', 'bold');
    
                doc.text('Cedula', 20, consultaY + lineHeight / 2);
                consultaY += lineHeight;
                doc.setFillColor(255, 255, 255);
                doc.setFont('helvetica', 'normal');
                doc.text(consulta.paciente_id, 20, consultaY + lineHeight / 1.2);
    
                let data = [
                    { label: 'Fecha y Hora:', value: new Date(consulta.fecha_hora).toLocaleString() },
                    { label: 'Motivo de Consulta:', value: consulta.motivo_consulta },
                    { label: 'Síntomas:', value: consulta.sintomas },
                    { label: 'Diagnóstico:', value: consulta.diagnostico },
                    { label: 'Tratamiento:', value: consulta.tratamiento },
                ];
    
                data.forEach(item => {
                    // Draw label
                    doc.setDrawColor(0);
                    doc.text(item.label, 20, consultaY + lineHeight / 0.5);
                    consultaY += lineHeight;
                   

    
                    // Draw value
                    doc.setDrawColor(0);
                    doc.setFont('helvetica', 'normal');
                    doc.text(item.value, 20, consultaY + lineHeight / 0.5);
                    consultaY += lineHeight;
                    doc.setTextColor(0, 0, 0);
                    doc.setFont('helvetica', 'bold');
                });    




                doc.setLineWidth(0.5);
                doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
                doc.line(15, pageHeight / 10, pageWidth - 15, pageHeight / 10);
                doc.line(15, pageHeight / 8, pageWidth - 15, pageHeight / 8);
                    doc.line(15, pageHeight / 6.8, pageWidth - 15, pageHeight / 6.8);
                    doc.line(15, pageHeight / 5.7, pageWidth - 15, pageHeight / 5.7);
                    doc.line(15, pageHeight / 5, pageWidth - 15, pageHeight / 5);
                    doc.line(15, pageHeight / 4.5, pageWidth - 15, pageHeight /4.5 )
                    doc.line(15, pageHeight / 4, pageWidth - 15, pageHeight / 4);
                    doc.line(15, pageHeight / 3.7, pageWidth - 15, pageHeight / 3.7);
                    doc.line(15, pageHeight / 3.3, pageWidth - 15, pageHeight / 3.3);
                    doc.line(15, pageHeight / 3.1, pageWidth - 15, pageHeight / 3.1);
                    doc.line(15, pageHeight / 2.9, pageWidth - 15, pageHeight / 2.9);
                    doc.line(15, pageHeight / 2.7, pageWidth - 15, pageHeight / 2.7);
                    doc.line(15, pageHeight / 2.4, pageWidth - 15, pageHeight / 2.4);
                doc.setFontSize(15);
                doc.setFont('helvetica', 'bold');
                doc.text(`Historia Clínica ${index + 1}`, pageWidth / 2, 28, { align: 'center' });
                if (Array.isArray(consulta.informacion_laboratorio)) {
                    let infoLabY = pageHeight - 170;
                    const fontSize = 10; 
                
                    doc.setFontSize(fontSize); 
                
                    doc.setFont('helvetica', 'bold');
                    doc.text('Información del Laboratorio:', 15, infoLabY);
                    infoLabY += lineHeight;
                
                    consulta.informacion_laboratorio.forEach((fila, filaIndex) => {
                        const filaNumero = filaIndex + 1;
                        let columnaX = 30; 
                
                        doc.setFont('helvetica', 'bold');
                        doc.text(`${filaNumero}.`, 20, infoLabY + lineHeight / 2);
                
                        doc.setFont('helvetica', 'normal');
                
                        fila.forEach((columna, columnIndex) => {
                            doc.text(columna, columnaX, infoLabY + lineHeight / 2);
                            columnaX += doc.getStringUnitWidth(columna) * fontSize / doc.internal.scaleFactor + 10; // Ajuste de posición
                        });
                
                        infoLabY += lineHeight; 
                    });
                }
                
                
                
    
                const logoWidth = 40;
                const logoHeight = (logo.width * logoWidth) / logo.height;
                const logoX = pageWidth - logoWidth - 15;
                const logoY = 242;
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
