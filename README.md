📌 README para proyecto13_backend
# 🚛 Plataforma de venta de Camiones Grúa – Backend

Este repositorio contiene la API del **backend** para la plataforma de venta de camiones grúa.  
Se encarga de la autenticación de usuarios, la gestión de productos (camiones grúa), el registro de ventas y la administración de roles.
Está deployado: https://proyecto13-backend.vercel.app/

---

## 🚀 Características
- **Autenticación de usuarios** mediante JWT.
- **Roles**:
  - **Usuario**: puede consultar productos, crear ventas y ver sus propias compras.
  - **Administrador**: control total de productos, usuarios y ventas.
- **Productos**: CRUD completo de camiones grúa.
- **Ventas**: registro y gestión de compras de productos.
- **Usuarios**: registro, autenticación y administración.

---

## 🛠️ Tecnologías
- **Backend**: Node.js / Express  
- **Base de datos**: MongoDB  
- **Autenticación**: JWT  
- **Encriptación de contraseñas**: Bcrypt  
- **Seguridad (CORS)**  
- **Herramienta de desarrollo**: Nodemon
- **Herramienta de imagenes**: Cloudinary
- **Herramienta para deployar**: : Vercel

---

## 🔧 Instalación
```bash
git clone https://github.com/sarafontdevila/proyecto13_backend.git
cd proyecto13_backend
npm install
npm run dev

📋 Endpoints API

🔐 Autenticación
Método	Endpoint	Descripción	Body (JSON)
POST	/usuarios/register	Registrar un nuevo usuario	{ "nombre": "", "email": "", "password": "" }
POST	/usuarios/login	Iniciar sesión	{ "email": "", "password": "" }

👤 Usuarios
Método	Endpoint	Descripción	Body requerido	Autenticación
GET	/usuarios	Obtener todos los usuarios	–	✅ Admin
GET	/usuarios/:id	Obtener usuario por ID	–	✅
PUT	/usuarios/:id	Actualizar usuario	{ campos }	✅
DELETE	/usuarios/:id	Eliminar usuario	–	✅ Admin

🏗️ Productos (Camiones grúa)
Método	Endpoint	Descripción	Body / Detalles	Autenticación
GET	/productos	Listar todos los productos	–	❌
GET	/productos/:id	Obtener producto por ID	–	❌
POST	/productos	Crear producto nuevo	{ "nombre": "", "precio": 0, "stock": 0, ... }	✅ Admin
PUT	/productos/:id	Actualizar producto	{ campos }	✅ Admin
DELETE	/productos/:id	Eliminar producto	–	✅ Admin

💰 Ventas
Método	Endpoint	Descripción	Body / Detalles	Autenticación
GET	/ventas	Listar todas las ventas (Admin)	–	✅ Admin
GET	/ventas/:id	Obtener detalle de una venta	–	✅
POST	/ventas	Registrar una venta	{ "productoId": "", "cantidad": 1 }	✅
DELETE	/ventas/:id	Eliminar venta	–	✅ Admin

📄 Licencia

Copyright © 2025 Sara Fontdevila
