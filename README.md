# Azules Violeta - Fidelización & Belleza

Este proyecto es una plataforma de fidelización premium diseñada para convertir visitantes en clientes recurrentes mediante gamificación y marketing estratégico.

## 🏗️ Arquitectura: Screaming Architecture

La estructura del proyecto está diseñada para "gritar" su propósito:

-   **/src/features**: Contiene los dominios principales de la aplicación (Auth, Points, News, Events). Cada feature encapsula sus propios hooks, servicios y componentes específicos.
-   **/src/core**: El corazón de la lógica de negocio.
    -   **/entities**: Definiciones de datos puras (User, Invoice, etc).
    -   **/use-cases**: Reglas de negocio agnósticas al framework (ej. `ValidateInvoice`).
-   **/src/shared**: Componentes de UI reutilizables (estética premium), utilidades genéricas y configuración global.
-   **/src/app**: Routing de Next.js que actúa como el "entry point" de cada sección.

## 🎨 Diseño & Tech Stack

-   **Framework**: Next.js 16 + React 19.
-   **Estilos**: Tailwind CSS v4 (Paleta: Primario Violeta, Acento Dorado).
-   **Animaciones**: Framer Motion para micro-interacciones premium.
-   **Iconografía**: Lucide React.
-   **Seguridad**: Middleware RBAC (Role-Based Access Control) para separar vistas de Usuario y Admin.

## 🚀 Estrategias de Marketing (Lead Magnet)

1.  **Lead Magnet al Registro**: Modal interactivo que ofrece 500 puntos de bienvenida + guía de cuidado de piel.
2.  **Visualización de Progreso**: Barra de progreso interactiva que incentiva la siguiente compra mostrando cuánto falta para el próximo regalo.
3.  **AppShell Adaptable**: Interfaz dinámica que cambia totalmente según si el usuario es un Cliente o el Administrador.

## 🛠️ Configuración

Las variables de entorno se gestionan centralizadamente en `src/shared/config/api.config.ts`, facilitando el despliegue en Vercel.
