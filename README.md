# Florence 🩺

**Florence** es una aplicación web profesional para la gestión clínica de pacientes y evoluciones sanitarias. Permite registrar pacientes, añadir y consultar sus evoluciones clínicas, recibir recomendaciones simuladas mediante IA y exportar informes completos en PDF. Inspirada en la excelencia asistencial, es una herramienta pensada para personal sanitario que busca organización, eficiencia y claridad.

---

# Stack Tecnológico 🔧 

- **Frontend**: React.js, Tailwind CSS, jsPDF, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Otros**: dotenv, cors, jspdf-autotable

# Funcionalidades principales ✨

**Pacientes** 👩‍⚕️
- Registro de pacientes con nombre, edad, género, contacto y observaciones.
- Consulta de pacientes en tabla con edición y eliminación.
- Exportación de fichas en PDF.
<br/>

**Evoluciones clínicas** 📋
- Registro de notas clínicas, constantes vitales (temperatura, pulso, tensión) e intervenciones.
- Asociación automática con fecha y paciente correspondiente.
- Edición y eliminación de evoluciones.
<br/>

**Estadísticas** 📊
- Resumen de número de evoluciones y pacientes únicos.
- Selección de evolución y generación de recomendaciones IA (simuladas).
- Exportación a PDF profesional con datos completos del paciente, evolución y recomendaciones.
<br/>

**IA Clínica** (simulada) 🧠
- Al seleccionar una evolución, el sistema genera recomendaciones automáticas en base a constantes vitales y notas clínicas.
<br/>

**Exportación a PDF** 📤
- Fichas individuales de pacientes.
- Informe clínico completo de evoluciones, incluyendo:
  - Datos del paciente (nombre, ID)
  - Fecha de evolución
  - Notas clínicas
  - Constantes vitales
  - Recomendaciones IA
<br/>

# Capturas nativas de la aplicación 🖼️

<img width="278" height="621" alt="Captura 1 Florence" src="https://github.com/user-attachments/assets/32379237-073c-4b8f-8928-1d0bdeac9081" />
<img width="278" height="621" alt="Captura 2 Florence" src="https://github.com/user-attachments/assets/77c59b2f-df58-419a-9bd7-2de848ac5e47" />
<img width="278" height="621" alt="Captura 3 Florence" src="https://github.com/user-attachments/assets/4ab09764-8e39-40b6-a711-33abd2f0fcbb" />
<br/>
<br/>

# Variables de entorno (archivo `.env`) 🔐

Crea un archivo `.env` con el siguiente contenido:

Este archivo **no debe subirse** a GitHub.

---
## 🛠 Instalación local

## Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/florence.git

## Instala las dependecnicas

cd florence
npm install

## inicia el backend

npm run dev

##cambia al frontend e incialo también

cd florence-frontend
npm run dev

Adrián Gómez — Desarrollador Full-Stack
Proyecto desarrollado con fines profesionales y sociales en el entorno de la salud.




En tributo a mis padres, y a mi círculo más cercano e importante en mi vida, pertencientes al ámbito sanitario, un mundo el cual no me habría fascinado de no ser por vosotros, y un ámbito que de la mano con el mundo informático, no solo puede ser muy poderoso, sino que también puede ayudar a mejorar las vidas de las personas


PUEDE QUE OLVIDEN TU NOMBRE, PERO JAMÁS COMO LES HICISTE SENTIR
SIN INVESTIGACIÓN, NO HAY FUTURO





Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.
