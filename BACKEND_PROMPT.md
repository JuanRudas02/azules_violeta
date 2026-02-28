# 🚀 Arquitectura y Requerimientos del Backend: Azules Violeta

*Este documento actúa como la guía técnica (Prompt Fundacional) para construir la API y la Base de Datos del proyecto Azules Violeta, actuando como el motor del frontend previamente construido.*

---

## 🏗 Stack Tecnológico Recomendado (Railway Ready)
Como CTO, recomiendo el siguiente stack para garantizar un sistema rápido, seguro, fácil de mantener y 100% compatible con Railway.app:

- **Lenguaje**: TypeScript (Tipado estricto para evitar errores).
- **Framework**: NestJS (Arquitectura empresarial estructurada que escala perfecto) o Express.js estructurado con Clean Architecture.
- **Base de Datos**: PostgreSQL (Relacional, perfecta para trazabilidad de facturas y puntos).
- **ORM**: Prisma (Conexión a la base de datos limpia y autogeneración de tipos).
- **Seguridad**: JWT (JSON Web Tokens) para sesiones y Bcrypt para encriptar contraseñas.
- **Almacenamiento**: AWS S3 o Cloudinary (Estrictamente necesario para subir y guardar las fotos de las facturas que envíen las clientas).

---

## 🗄️ Entidad - Relación (Diseño de la Base de Datos)
El modelo de datos debe ser inmaculado, evitando redundancias y garantizando integridad referencial.

### 1. Entidad `User` (Usuarios y Administradoras)
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `passwordHash`: String
- `name`: String
- `role`: Enum (`ADMIN`, `CUSTOMER`)
- `whatsapp`: String (Opcional, para contacto)
- `status`: Enum (`ACTIVE`, `SUSPENDED`)
- `createdAt` / `updatedAt`: DateTime
- **Relaciones**:
  - `1 -> N` con `Invoice` (Una usuaria sube muchas facturas)
  - `1 -> 1` con `Wallet` (Una usuaria tiene una billetera de puntos)

### 2. Entidad `Wallet` (Billetera de Puntos)
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key, Unique)
- `balance`: Int (Total de puntos actuales)
- `lifetimePoints`: Int (Puntos acumulados históricos, usado para niveles VIP)
- `updatedAt`: DateTime
- **Relaciones**:
  - `1 -> N` con `Transaction` (Historial de cómo suben o bajan los puntos)

### 3. Entidad `Transaction` (Trazabilidad Financiera)
- `id`: UUID (Primary Key)
- `walletId`: UUID (Foreign Key)
- `amount`: Int (Positivo si gana puntos, Negativo si redime premios)
- `type`: Enum (`INVOICE_APPROVED`, `PRIZE_REDEEMED`, `WELCOME_BONUS`, `MANUAL_ADJUSTMENT`)
- `description`: String (Ej: "Compra en tienda física", "Canje por labial")
- `createdAt`: DateTime

### 4. Entidad `Invoice` (Validación de Compras)
- `id`: UUID (Primary Key)
- `userId`: UUID (Foreign Key)
- `imageUrl`: String (URL de la nube donde está la foto)
- `amountSpent`: Decimal (Valor total de la compra en COP)
- `pointsAwarded`: Int (Puntos calculados para entregar)
- `status`: Enum (`PENDING`, `APPROVED`, `REJECTED`)
- `rejectionReason`: String (Opcional, en caso de ser rechazada)
- `reviewedBy`: UUID (Foreign Key, ID del Admin que procesó)
- `createdAt` / `updatedAt`: DateTime

### 5. Entidad `SystemConfig` (Configuraciones dinámicas del CMS)
- `id`: UUID (Primary Key)
- `key`: String (Unique, ej: `POINTS_PER_PURCHASE`, `HERO_TITLE`, `WELCOME_BONUS_AMOUNT`)
- `value`: JSON / Text
- `updatedAt`: DateTime

### 6. Entidad `ContentItem` (Noticias / CMS de Promociones)
- `id`: UUID (Primary Key)
- `type`: Enum (`FEATURE_CARD`, `NEWS`, `PROMOTION`)
- `title`: String
- `content`: Text
- `imageUrl`: String (Opcional)
- `metadata`: JSON (Opcional, para campos extra como iconos, degradados o botones de acción)
- `isActive`: Boolean
- `createdAt`: DateTime

---

## 🔐 Seguridad y Autenticación (RBAC)
Todo el sistema debe operar bajo **Role-Based Access Control (RBAC)**.
1. **Login & Registro**: Al registrarse un usuario, su contraseña se hashea y se crea su `Wallet` con el bono de bienvenida por defecto (ej. 500pt). Se devuelve un JWT.
2. **Middleware de Protección**:
   - `RouteGuard`: Revisa que el JWT sea válido.
   - `RoleGuard`: Revisa si la ruta requiere permisos de `ADMIN` y bloquea inmediatamente otras solicitudes retornando Código 403 (Forbidden).

---

## 📡 Módulos y Controladores Principales (API Endpoints)

### **Módulo Auth**
- `POST /api/auth/register`: Crea la cuenta y la billetera.
- `POST /api/auth/login`: Autentica y devuelve el Token.

### **Módulo Users (Self-Service)**
- `GET /api/users/me`: Perfil del usuario autenticado + su Wallet.
- `GET /api/users/transactions`: Su historial de puntos.

### **Módulo Admin (Trazabilidad)**
- `GET /api/admin/users`: Listado general con paginación (Para la tabla de Trazabilidad).
- `GET /api/admin/stats`: Métricas generales (Facturas pendientes, Total Puntos Emitidos, etc).
- `PUT /api/admin/users/:id/points`: Ajuste manual de puntos (Solo SuperAdmin).

### **Módulo Facturas (El Core)**
- `POST /api/invoices`: Usuaria sube una foto (El endpoint recibe la info, la foto se va a S3/Cloudinary, y se guarda el estado PENDING).
- `GET /api/invoices/pending`: Admin pide el listado a revisar.
- `POST /api/invoices/:id/approve`: Admin aprueba (Dispara transacción que inyecta puntos al `Wallet` según la regla matemática en `SystemConfig`).
- `POST /api/invoices/:id/reject`: Admin rechaza (Debe enviar motivo).

### **Módulo CMS**
- `GET /api/cms/home`: Trae la configuración del Banner Principal (Público).
- `PUT /api/cms/home`: Admin edita los textos del Hero y los Beneficios.

---

## 🚀 Proceso de Despliegue (Railway)
1. Conectar este futuro repositorio a Railway.
2. Añadir un plugin de PostgreSQL dentro de Railway y copiar la string de conexión (`DATABASE_URL`).
3. Crear las variables de entorno para `JWT_SECRET`, los permisos de AWS/Cloudinary y los puertos.
4. Ejecutar el comando de `prisma migrate deploy` en el despliegue para generar todas las tablas matemáticamente perfectas en la base de datos de Railway.

---

**Nota para la IA y el Equipo de Desarrollo:** Construir basándose en el patrón "SOLID" y "Clean Architecture". Cada dominio (Facturas, Usuarios, Auth) debe estar separado con lógica de negocio clara, permitiendo pruebas unitarias libres de dolores de cabeza a largo plazo.
