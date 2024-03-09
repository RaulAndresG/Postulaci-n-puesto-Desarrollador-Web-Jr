# Sistema de Gestión de Consultas Médicas

Este proyecto proporciona una solución integral para la gestión de consultas médicas, diseñado para reemplazar el sistema de base de datos en Excel utilizado por una empresa del sector médico. La aplicación permite a múltiples usuarios registrar y administrar consultas médicas de forma eficiente, con la capacidad de generar historias clínicas detalladas y descargarlas en formato PDF. A continuación, se detalla cómo instalar, configurar y utilizar la aplicación.
Situación

Una empresa del sector médico necesita migrar su sistema de seguimiento de consultas de Excel a una plataforma más escalable y colaborativa.

## Solución Propuesta

Se propone desarrollar una aplicación web que permita a múltiples usuarios registrar, visualizar y administrar consultas médicas de manera centralizada. La aplicación ofrecerá funcionalidades como la generación de historias clínicas, gestión de usuarios con diferentes niveles de permisos y la capacidad de descargar las historias clínicas en formato PDF.
## Requerimientos

    Serialización de Consultas: Cada consulta médica tendrá un serial único por paciente y un sub-serial por cada entrada de historia clínica registrada.

    Disponibilidad en Servidor Web: La aplicación estará alojada en un servidor web para facilitar el acceso desde cualquier ubicación con conexión a internet.

    Sistema de Usuarios y Permisos: Se implementará un sistema de autenticación de usuarios con diferentes niveles de permisos para administrar la información de manera segura.

    Taxonomías Diferenciadas para Pacientes e Historias Clínicas: Se establecerán categorías distintas para la información de los pacientes y las entradas de historia clínica.

    Interfaz y Diseño Personalizado: La interfaz de usuario será diseñada de forma intuitiva y flexible para satisfacer las necesidades específicas de la empresa.

    Datos de Pacientes Básicos: Se capturarán los datos básicos de identificación de los pacientes en el sistema.

    Espacio para Información de Laboratorio en Historias Clínicas: Las historias clínicas incluirán un espacio para cargar información proporcionada por el laboratorio, utilizando una tabla similar a un archivo Excel.

    Descarga de Historias Clínicas en PDF: Se implementará un botón de descarga para permitir a los usuarios descargar las historias clínicas en formato PDF.

## Tecnologías Utilizadas

El sistema está desarrollado utilizando las siguientes tecnologías:

    Frontend:
        HTML
        CSS
        JavaScript
        React.js

    Backend:
        Node.js
        Express.js
        MongoDB (base de datos)

## Instalación y Configuración
Clonar el Repositorio

bash

git clone https://github.com/RaulAndresG/Postulaci-n-puesto-Desarrollador-Web-Jr.

Postulaci-n-puesto-Desarrollador-Web-Jr.

## Instalar Dependencias
Frontend

#### Terminal Visual Studio Code

cd Postulaci-n-puesto-Desarrollador-Web-Jr./Frontend
cd histoclinic

npm install

En caso de no funcionar instalr el comando de 
npm install -g create-react-app


Backend

#### Terminal Visual Studio Code

En caso de no funcionar instalr el comando de 
npm install -g nodemon


cd ../Backend
npm install

Configuración

Antes de iniciar la aplicación, asegúrate de configurar la conexión a la base de datos MongoDB en el archivo .env del backend.

makefile

mongodb+srv://raulandres:12345@histocluster.sfzhk6y.mongodb.net/histoClincs

## Uso

    Iniciar Servidor Backend:

bash

cd backend
npm start

    Iniciar Servidor Frontend:

bash

cd frontend
npm start

    Acceder a la Aplicación:

Abre tu navegador web e ingresa a http://localhost:7777 para acceder a la aplicación.

    Inicia sesión con tus credenciales.
    Explora las diferentes secciones de la aplicación para ver y administrar las consultas médicas.

Contribución

Si deseas contribuir al desarrollo de esta aplicación, sigue estos pasos:

    Realiza un fork del repositorio.
    Crea una nueva rama para tu función: git checkout -b feature/nueva-funcion.
    Realiza tus cambios y haz commit: git commit -am 'Agrega nueva función'.
    Sube tus cambios a tu repositorio: git push origin feature/nueva-funcion.
    Haz un pull request para que tus cambios sean revisados.

Licencia

Este proyecto está bajo la licencia MIT.
Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros en correo@empresa.com. ¡Estamos aquí para ayudarte!