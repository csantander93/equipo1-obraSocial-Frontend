# Proyecto Frontend - Sistema Integral de Obra Social para AlMedin

<p>
  <h1><b>EQUIPO 1</b></h1>
</p>

<a href="https://github.com/csantander93/equipo1-obraSocial-Frontend.git">
  <img src="https://contrib.rocks/image?repo=csantander93/equipo1-obraSocial-Frontend.git" />
</a>


## Descripción del Proyecto

La segunda parte de este proyecto se enfoca en el desarrollo del frontend de una aplicación para la empresa AlMedin. El objetivo es crear una interfaz de usuario dinámica y accesible que permita a los usuarios interactuar con las funcionalidades clave, como el manejo de turnos médicos, la consulta de cartillas de especialistas y la descarga de recetas médicas.

## Funcionalidades

La aplicación permitirá las siguientes operaciones:

### 1. Crear Turno Médico

**Ruta de la Interfaz:** /turnos/asignarTurno

**Descripción:** Permite asignar un nuevo turno médico a un usuario especificado.

**Datos requeridos:**

- ID del paciente
- Fecha y hora de la cita
- ID del médico especialista
- Motivo de la consulta

### 2. Consultar Cartilla de Especialistas

**Ruta de la Interfaz:** /medicos/cartillaMedicos

**Descripción:** Muestra la lista de médicos especialistas disponibles.

**Información mostrada por cada médico:**

- Nombre del médico
- Especialidad médica
- Horarios de consulta
- Ubicación de la consulta

### 3. Actualizar Turno Médico

**Ruta de la Interfaz:** /turnos/actualizar/

**Descripción:** Permite actualizar la información de un turno médico existente.

**Datos que se pueden actualizar:**

- Nueva fecha y hora de la cita
- ID del nuevo médico especialista
- Nuevo motivo de la consulta

### 4. Eliminar Turno Médico

**Ruta de la Interfaz:** /turnos/darBajaTurno

**Descripción:** Permite cancelar un turno médico existente.

### 5. Descargar Receta Médica

**Ruta de la Interfaz:** /recetas/traerRecetaId/

**Descripción:** Permite a los pacientes autorizados descargar su receta médica proporcionando el ID del turno asociado.

### 6. Guardar Turnos Disponibles de Manera Masiva

**Ruta de la Interfaz:** /turnos/crearTurnosMedicoFechaC20Min

**Descripción:** Permite al médico cargar en la base de datos turnos disponibles (activo = false) cada 20 minutos, dentro de su intervalo de trabajo.

### 7. Listar Turnos por Usuario

**Ruta de la Interfaz:** /turnos/traerTurnosPorIdUsuario/

**Descripción:** Obtiene la lista de turnos médicos asignados a un usuario específico.

### 8. Listar Turnos Disponibles por Médico

**Ruta de la Interfaz:** /turnos/traerTurnosDisponiblesMedico/

**Descripción:** Muestra la lista de turnos disponibles para un médico específico.

### 9. Crear Turnos con Intervalos de 15 Minutos

**Ruta de la Interfaz:** /turnos/crearTurnosMedicoFechaC15Min

**Descripción:** Permite al médico cargar turnos disponibles cada 15 minutos dentro de su intervalo de trabajo.

### 10. Crear Turno Médico con Paciente

**Ruta de la Interfaz:** /turnos/crearTurnoConPaciente

**Descripción:** Permite al médico crear un turno específico para un paciente.

### 11. Obtener Lista de Especialidades Médicas

**Ruta de la Interfaz:** /especialidad/traerEspecialidades

**Descripción:** Muestra la lista de especialidades médicas disponibles en el sistema.

### 12. Registro de Usuarios

**Ruta de la Interfaz:** /usuarios/registro

**Descripción:** Permite a los nuevos usuarios registrarse en el sistema proporcionando los datos requeridos.

### 13. Iniciar Sesión

**Ruta de la Interfaz:** /usuarios/login

**Descripción:** Permite a los usuarios existentes iniciar sesión en el sistema utilizando sus credenciales.

### 14. Listar Usuarios Pacientes

**Ruta de la Interfaz:** /usuarios/traerUsuariosPaciente

**Descripción:** Recupera la lista de usuarios que tienen el rol de paciente en el sistema.

### 15. Crear Receta Médica

**Ruta de la Interfaz:** /recetas/crearReceta

**Descripción:** Permite a los médicos crear una nueva receta médica para un paciente especificado.

**Datos requeridos:**

- ID del paciente
- Descripción de los medicamentos
- Indicaciones de uso

### 16. Obtener Receta Médica por ID

**Ruta de la Interfaz:** /recetas/traerRecetaId/

**Descripción:** Permite recuperar los detalles de una receta médica específica utilizando su ID.




## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```plaintext
📂 src                 // Carpeta principal que contiene todo el código fuente del proyecto
  ├─ 📁 clients        // Clientes de la aplicación o consumidores de la API
  ├─ 📁 components     // Componentes reutilizables de la interfaz de usuario
  │     ├─ 📂 AppBar          // Componente para la barra de navegación superior
  │     ├─ 📂 Appointments    // Componentes relacionados con la gestión de citas
  │     ├─ 📂 footer          // Componente para el pie de página de la aplicación
  │     ├─ 📂 Initial         // Componentes iniciales o de arranque de la aplicación
  │     ├─ 📂 medicalRecord   // Componentes para la visualización y gestión de registros médicos
  │     ├─ 📂 recipe          // Componentes relacionados con la gestión de recetas médicas
  │     └─ 📂 ScreenMessage   // Componente para mostrar mensajes en la pantalla
  ├─ 📁 contexts       // Manejo de contextos para compartir estados globales en la aplicación
  │     ├─ 📂 AppointmentContext  // Contexto para manejar el estado global de citas
  │     ├─ 📂 DoctorContext       // Contexto para manejar el estado global de información de doctores
  │     ├─ 📂 SpecialityContext   // Contexto para manejar el estado global de especialidades médicas
  │     └─ 📂 UserContext         // Contexto para manejar el estado global de información de usuarios
  ├─ 📁 images         // Carpeta para almacenar recursos de imagen utilizados en la aplicación
  ├─ 📁 models/types   // Modelos de datos y tipos utilizados en la aplicación
  │     ├─ 📂 entities    // Definiciones de entidades de datos que representan objetos de negocio
  │     └─ 📂 requests    // Definiciones de tipos para solicitudes API
  ├─ 📁 routers        // Configuración de enrutamiento de la aplicación
  │     └─ 📄 AppRouter.tsx  // Archivo principal que define las rutas de la aplicación
  ├─ 📁 services       // Servicios que manejan la lógica del negocio y las interacciones con la API
  │     ├─ 📄 AppointmentService.ts    // Servicio para manejar la lógica de negocio relacionada con las citas
  │     ├─ 📄 DoctorService.ts         // Servicio para manejar la lógica de negocio relacionada con los doctores
  │     ├─ 📄 RecipeService.ts         // Servicio para manejar la lógica de negocio relacionada con las recetas
  │     ├─ 📄 SpecialityService.ts     // Servicio para manejar la lógica de negocio relacionada con las especialidades
  │     └─ 📄 UserService.ts           // Servicio para manejar la lógica de negocio relacionada con los usuarios
  ├─ 📁 utils          // Utilidades y funciones auxiliares compartidas en la aplicación
  │     ├─ 📄 filterAppointments.ts        // Función para filtrar citas según ciertos criterios
  │     └─ 📄 filterDoctorsBySpecialty.ts  // Función para filtrar doctores por especialidad
  └─ 📁 views          // Vistas o pantallas de la aplicación

```

Descripción de las carpetas principales
clients: Contiene los clientes que se utilizan para consumir APIs externas.
components: Contiene componentes reutilizables de la interfaz de usuario, organizados en carpetas según su función.
contexts: Incluye los contextos de React que manejan el estado global de la aplicación
images: Imágenes y otros recursos estáticos utilizados en la aplicación.
models/types: Definiciones de tipos y modelos TypeScript para las entidades, las solicitudes y los estados.
routers: Configuración de las rutas de la aplicación.
services: Servicios para interactuar con las APIs, cada uno dedicado a una parte específica del dominio.
utils: Funciones auxiliares y utilidades varias.
views: Vistas principales de la aplicación donde se combinan componentes para formar las páginas.
Información Técnica del Proyecto
Lenguaje de Programación: TypeScript
Framework: React
Gestión del Estado: Redux Toolkit
Enrutamiento: React Router
Estilos: CSS Modules / Styled Components

## Instrucciones para Configuración y Ejecución

1. **Clonar el repositorio**:

```bash
git clone https://github.com/csantander93/equipo1-obraSocial-Frontend.git
cd equipo1-obraSocial-Frontend
```

2. **Instalar las dependencias**:
Asegúrate de tener Node.js y npm instalados en tu sistema.

```bash
npm install
```

3. **Configurar las variables de entorno**:
Crea un archivo .env en la raíz del proyecto con las variables necesarias para la configuración. Ejemplo:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

**¡Antes de ejecutar la aplicacion recordar descargar el repositorio del backend!**
https://github.com/csantander93/equipo1ObraSocialUMSA.git

**El mismo cuenta con un script "data.sql" para la creacion de los datos en las distintas tablas, lo que facilita la prueba del sistema, recordar que una vez finalizado el back se debe cambiar en las properties el valos de**:
# Generación del esquema de la base de datos
quarkus.hibernate-orm.database.generation=drop-and-create
por el de:
quarkus.hibernate-orm.database.generation=validate
Esto para no borrar los datos que se modificaron.

4. **Ejecutar la aplicación**:
```bash
npm start
```

5. **Compilar la aplicación para producción**:
```bash
npm run build
```

6. **Crear una cuenta de paciente**:

Para interactuar con la página, puedes crear una cuenta seleccionando la opción de paciente y utilizando el DNI 12345678. Tanto el correo electrónico como la contraseña son a elección del usuario.

URL de registro: http://localhost:3000/register
Datos del paciente:
DNI: 12345678
Correo electrónico: A elección
Contraseña: A elección
Rol: Paciente
Acceder a la aplicación:

Después de crear tu cuenta, puedes iniciar sesión y empezar a interactuar con la aplicación.

URL de inicio de sesión: http://localhost:3000/login
Correo electrónico: El que utilizaste al registrarte
Contraseña: La que elegiste


Contribuir
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Haz push a la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.

<p>
  <h2><b>Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en abrir un issue en el repositorio. ¡Gracias por tu colaboración! 👋👋👋</b></h2>
</p>

Herramientas Utilizadas:

React: Biblioteca para construir interfaces de usuario.
Redux Toolkit: Para la gestión del estado de la aplicación.
React Router: Para el enrutamiento de la aplicación.
Axios: Para realizar solicitudes HTTP.
Jest: Para pruebas unitarias.
ESLint: Para mantener el código limpio y consistente.
