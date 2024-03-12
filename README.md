# Sistema de Gestión de Consultas Médicas

Este proyecto proporciona una solución integral para la gestión de consultas médicas, diseñado para reemplazar el sistema de base de datos en Excel utilizado por una empresa del sector médico. La aplicación permite a múltiples usuarios registrar y administrar consultas médicas de forma eficiente, con la capacidad de generar historias clínicas detalladas y descargarlas en formato PDF.
## 1. Introducción

El Sistema de Gestión de Consultas Médicas es una aplicación web que facilita la administración de consultas médicas de manera centralizada. Los usuarios pueden registrar nuevas consultas, visualizar el historial de consultas de un paciente, generar historias clínicas detalladas y descargarlas en formato PDF.
## 2. Requerimientos del Sistema
### 2.1 Requerimientos Funcionales

##### Serialización de Consultas:
  Cada consulta médica tendrá un serial único por paciente y un sub-serial por cada entrada de historia clínica registrada.
##### Sistema de Usuarios y Permisos:
 Se implementará un sistema de autenticación de usuarios con diferentes niveles de permisos para administrar la información de manera segura.
##### Taxonomías Diferenciadas para Pacientes e Historias Clínicas:
  Se establecerán categorías distintas para la información de los pacientes y las entradas de historia clínica.
##### Espacio para Información de Laboratorio en Historias Clínicas:
 Las historias clínicas incluirán un espacio para cargar información proporcionada por el laboratorio, utilizando una tabla similar a un archivo Excel.
 #### Descarga de Historias Clínicas en PDF:
  Se implementará un botón de descarga para permitir a los usuarios descargar las historias clínicas en formato PDF.

### 2.2 Tecnologías Utilizadas
#### Frontend:

    HTML
    CSS
    JavaScript
    React.js

#### Backend:

    Node.js
    Express.js
    MongoDB (base de datos)


### 2.2.3 Punto aparte , Si no llegas a tener instalado npm 

Primero puedes probar con 

`node -v` o `nvm -v`

Si no te sale niguna version de este programa

Puedes instalarlo desde su  pagina [NodeJs] q es mas facil 
Descargar Node.js:

    Abre tu navegador web y ve al sitio web oficial de Node.js: https://nodejs.org/
    Descarga el instalador adecuado para tu sistema operativo. Por lo general, se recomienda descargar la versión LTS (Long Term Support) para obtener estabilidad.

Ejecutar el Instalador:

    Una vez que se complete la descarga, ejecuta el instalador de Node.js haciendo doble clic en él.
    Sigue las instrucciones del instalador para completar el proceso de instalación. Asegúrate de marcar la casilla que indica instalar npm junto con Node.js.

Verificar la Instalación:

    Una vez instalado, abre PowerShell.
    Para verificar que Node.js y npm se hayan instalado correctamente, ejecuta los siguientes comandos en PowerShell:

    powershell

`node -v`

Esto debería imprimir la versión de Node.js instalada en tu sistema.

powershell

`npm -v`

Esto debería imprimir la versión de npm instalada en tu sistema.


### 2.3.3 Punto aparte , Si no llegas a tener instalado React

Instalar create-react-app:

      Abre tu terminal (o PowerShell en Windows) y ejecuta el siguiente comando para instalar globalmente la herramienta create-react-app:

Terminal

`npm install -g create-react-app`

     Esto instalará create-react-app de manera global en tu sistema, lo que te permitirá crear proyectos de React fácilmente en cualquier lugar.

Crear un Nuevo Proyecto de React:

    Una vez que create-react-app esté instalado, puedes crear un nuevo proyecto de React ejecutando el siguiente comando en tu terminal o PowerShell:

Terminal

`npx create-react-app nombre-de-tu-proyecto`

    Reemplaza nombre-de-tu-proyecto con el nombre que deseas para tu proyecto de React.

    Navegar al Directorio del Proyecto:
   
    Después de que se haya creado el proyecto, navega al directorio del proyecto recién creado    utilizando el siguiente comando:

Terminal

`cd histoclinic`

Iniciar el Servidor de Desarrollo:

     Una vez dentro del directorio del proyecto, puedes iniciar el servidor de desarrollo ejecutando el siguiente comando:

Terminal

`npm start`

Esto iniciará el servidor de desarrollo de React y abrirá tu aplicación en tu navegador predeterminado. Cada vez que realices cambios en tus archivos de código fuente, la aplicación se actualizará automáticamente.


## 3. Instalación y Configuración

Puedes ir a Github y ahi mismo buscas RaulAndresG mi nombre de usuario entras el repo q dice
` Postulaci-n-puesto-Desarrollador-Web-Jr` este repo lo clonas manualmete en la app de Visual Studio Code q puedes optener en Google y lo clonas en ella

### 3.1 Clonar el Repositorio

Para obtener el código fuente de la aplicación, puedes clonar el repositorio desde la terminal de Visual Studio Code usando el siguiente comando:

Terminal

     `git clone https://github.com/RaulAndresG/Postulaci-n-puesto-Desarrollador-Web-Jr.`

### 3.2 Instalar Dependencias
Frontend

Desde la terminal de Visual Studio Code , navega al directorio del frontend:

Terminal

`cd Postulaci-n-puesto-Desarrollador-Web-Jr/Frontend/histoclinic`

Luego, instala las dependencias ejecutando:

Terminal

`npm install`

Si por alguna razón `npm install` no funciona, intenta con:

Terminal

`npm install -g create-react-app`

Backend

Solo necesitas ejecutar el comando :


Terminal

`npm install O npm i`

Si npm install no funciona, prueba con:

Terminal

`npm install -g nodemon`

Para poder instalar e iniciar la app se ejecuta esto para q instala nodemon globalmente  

#### 3.3 Configuración

Antes de iniciar la aplicación, asegúrate de configurar la conexión a la base de datos MongoDB en el archivo `.env` del backend. La conexión debe verse algo así:

Terminal

`MONGO_URI=mongodb+srv://raulandres:12345@histocluster.sfzhk6y.mongodb.net/histoClincs`

`PORT=7777`

`DB_NAME=histoClincs`

## 4. Uso
### 4 .1 Iniciar Servidor Backend:

Desde la terminal, navega al directorio del backend:

Terminal


`npm start`

### 4.2 Iniciar Servidor Frontend:

Desde la terminal, navega al directorio del frontend:

Terminal

cd frontend/ cd histoclinic
`npm start`

### 4.3 Acceder a la Aplicación:

Abre tu navegador web e ingresa a http://localhost:7777 para acceder a la aplicación o una forma mas facil vas a la terminal donde abres el Frontend y el histoclinic y ejecutas el comando 

`npm start` 

y se abrira la app de React en tu navegador 

### 4.4 Cómo Usar la Aplicación:

    Inicio de Sesión:
        Al abrir la aplicación, se te pedirá que inicies sesión. Ingresa tus credenciales para acceder al sistema.

    Registro de Nueva Consulta:
        Una vez dentro, podrás registrar una nueva consulta médica haciendo clic en el botón correspondiente.
        Completa los campos requeridos, como el nombre del paciente, fecha, síntomas, diagnóstico, etc.
        Cada consulta tendrá un número de serie único, asignado automáticamente por el sistema.

    Visualización del Historial de Consultas:
        Puedes ver el historial de consultas de un paciente específico buscándolo por su nombre o número de serie.
        Se mostrará una lista de todas las consultas registradas para ese paciente, ordenadas por fecha.

    Generación de Historias Clínicas:
        Para generar una historia clínica detallada, selecciona una consulta y haz clic en el botón "Generar Historia Clínica".
        La historia clínica incluirá todos los detalles de la consulta, así como cualquier información adicional proporcionada por el laboratorio.

    Descarga de Historias Clínicas en PDF:
        Una vez generada la historia clínica, tendrás la opción de descargarla en formato PDF haciendo clic en el botón correspondiente.
        El archivo PDF contendrá toda la información de la historia clínica de manera organizada y legible.

## 5. Contribución

¡Tu contribución al desarrollo de esta aplicación es bienvenida! Sigue estos pasos para contribuir:

    Realiza un fork del repositorio.
    Crea una nueva rama para tu función: git checkout -b feature/nueva-funcion.
    Realiza tus cambios y haz commit: git commit -am 'Agrega nueva función'.
    Sube tus cambios a tu repositorio: git push origin feature/nueva-funcion.
    Haz un pull request para que tus cambios sean revisados.

## 6. Licencia

Este proyecto está bajo la licencia MIT.

## 7. Contacto

Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros en `reaulgomes26@gmail.com` . ¡Estamos aquí para ayudarte!
