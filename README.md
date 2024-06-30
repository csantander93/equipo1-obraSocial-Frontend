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

### 1. Crear turno médico
- **Ruta de la Interfaz**: `/turnos/asignarTurno`
- **Descripción**: Permite asignar un nuevo turno médico a un usuario especificado.
  - Datos requeridos:
    - ID del paciente
    - Fecha y hora de la cita
    - ID del médico especialista
    - Motivo de la consulta

### 2. Consultar cartilla de especialistas
- **Ruta de la Interfaz**: `/medicos/cartillaMedicos`
- **Descripción**: Muestra la lista de médicos especialistas disponibles.
  - Información mostrada por cada médico:
    - Nombre del médico
    - Especialidad médica
    - Horarios de consulta
    - Ubicación de la consulta

### 3. Actualizar turno médico
- **Ruta de la Interfaz**: `/turnos/actualizar/:id`
- **Descripción**: Permite actualizar la información de un turno médico existente.
  - Datos que se pueden actualizar:
    - Nueva fecha y hora de la cita
    - ID del nuevo médico especialista
    - Nuevo motivo de la consulta

### 4. Eliminar turno médico
- **Ruta de la Interfaz**: `/turnos/darBajaTurno`
- **Descripción**: Permite cancelar un turno médico existente.

### 5. Descargar receta médica
- **Ruta de la Interfaz**: `/recetas/traerRecetaId/:id`
- **Descripción**: Permite a los pacientes autorizados descargar su receta médica proporcionando el ID del turno asociado.


## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```plaintext
src
├── clients                # Clientes para consumir APIs externas
├── components             # Componentes reutilizables de la UI
│   ├── AppBar
│   ├── Appointments
│   ├── footer
│   ├── Initial
│   ├── medicalRecord
│   └── recipe
├── contexts               # Contextos de React para el manejo del estado global
│   ├── AppointmentContext
│   ├── DoctorContext
│   ├── SpecialityContext
│   └── UserContext
├── hooks                  # Custom hooks
├── images                 # Imágenes y recursos estáticos
├── models/types           # Definiciones de tipos y modelos
│   ├── entities
│   ├── requests
│   └── states
├── routers                # Configuración de enrutamiento
│   └── AppRouter.tsx
├── services               # Servicios para interactuar con APIs
│   ├── AppointmentService.ts
│   ├── DoctorService.ts
│   ├── RecipeService.ts
│   ├── SpecialityService.ts
│   └── UserService.ts
├── utils                  # Utilidades y funciones auxiliares
│   └── TDoctorsListFilter.ts
├── views                  # Vistas principales de la aplicación
└── App.tsx                # Componente raíz de la aplicación
```

Descripción de las carpetas principales
clients: Contiene los clientes que se utilizan para consumir APIs externas.
components: Contiene componentes reutilizables de la interfaz de usuario, organizados en carpetas según su función.
contexts: Incluye los contextos de React que manejan el estado global de la aplicación.
hooks: Custom hooks para lógica reutilizable en componentes.
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
cd nombre-del-repositorio
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

4. **Ejecutar la aplicación**:
```bash
npm start
```

5. **Compilar la aplicación para producción**:
```bash
npm run build
```

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
