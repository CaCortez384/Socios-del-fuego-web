# Socios del Fuego - Plataforma Comercial & Motor de Cotización Dinámica

Plataforma web de alta conversión y motor de cotización interactivo en tiempo real diseñado para optimizar el embudo de ventas y la gestión operativa de **Socios del Fuego**, empresa especializada en catering y eventos gastronómicos premium. La aplicación resuelve la ineficiencia operativa del cálculo manual de presupuestos y la baja tasa de conversión en la captación de leads mediante un flujo guiado multietapa que procesa automáticamente el volumen de invitados, la fecha del evento, las restricciones logísticas y la personalización de menús (formatos Full Asado y Cóctel). Adicionalmente, integra captura centralizada de prospectos hacia WhatsApp/Firestore, administración en tiempo real de planes comerciales y un motor de contenidos enfocado en posicionamiento orgánico (SEO local).

---

## Arquitectura y Stack Tecnológico

El sistema adopta una arquitectura Serverless decoupled basada en el framework Next.js (App Router), optimizada para ofrecer renderizado híbrido (SSR/SSG), tiempos de carga mínimos y alta disponibilidad.

```
[ Cliente Web / Mobile ]
        │
        ├── SSR / SSG (Next.js 16 + React 19)
        │     ├── Motor de Cotización (Client State & Components)
        │     └── Content Engine (Markdown + gray-matter)
        │
        ├── Capa de Persistencia & Gestión
        │     └── Firebase Firestore (NoSQL Plan Store & Lead Logs)
        │
        └── Capa de Telemetría & Conversión (CRO)
              ├── Google Analytics 4 (GA4)
              ├── Meta Pixel (Facebook Ads Attribution)
              ├── Microsoft Clarity (User Behavior Analytics)
              └── Vercel Analytics (Performance Metrics)
```

### Componentes del Stack

* **Next.js 16.1 (App Router) & React 19**: Framework base utilizado para el renderizado del lado del servidor (SSR) de las páginas públicas y estáticas, asegurando indexación SEO óptima y un rendimiento de cliente eficiente mediante React Server Components y Client Components segregados.
* **TypeScript & ES Modules**: Garantizan tipado estático en la estructura de datos de cotizaciones, clientes e interfaces de UI, minimizando errores en tiempo de ejecución.
* **Tailwind CSS v4 & Framer Motion**: Sistema de diseño responsivo basado en utility classes de alto rendimiento con animaciones fluidas para optimizar la retención y experiencia del usuario (UX) en dispositivos móviles y desktop.
* **Radix UI Primitives**: Componentes headless accesibles (`Dialog`, `Accordion`, `NavigationMenu`, `Separator`) que sirven como base funcional para modales administrativos y menús interactivos.
* **Firebase Firestore**: Base de datos NoSQL utilizada para la persistencia descentralizada y sincronización en tiempo real del catálogo de planes comerciales (`plans`), precios por persona y menús, permitiendo la edición remota mediante un panel administrativo embebido.
* **Motor de Contenidos (gray-matter & react-markdown)**: Pipeline de procesamiento de archivos Markdown locales en `content/posts/` para la generación dinámica de artículos de blog orientados a posicionamiento orgánico en motores de búsqueda.
* **Capa de SEO Estructurado & Telemetría (GA4, Meta Pixel, Clarity, Schema.org)**: Inyección de datos estructurados JSON-LD (`FoodEstablishment`, `WebSite`) y scripts de analítica para atribución multicanal de campañas publicitarias y optimización de la tasa de conversión (CRO).

---

## Guía de Despliegue a Prueba de Fallos

Siga los comandos exactos de terminal descritos a continuación para aprovisionar el entorno local, configurar las credenciales del sistema y ejecutar las migraciones de datos requeridas.

### Requisitos Previos

* **Node.js**: `v20.0.0` o superior.
* **npm**: `v10.0.0` o superior.

### 1. Clonación del Repositorio e Instalación de Dependencias

```bash
git clone https://github.com/CaCortez384/Socios-del-fuego-web.git
cd Socios-del-fuego-web
npm install
```

### 2. Configuración del Entorno de Variables (`.env`)

Cree el archivo de configuración local `.env.local` partiendo de la plantilla estandarizada `.env.example`:

```bash
cp .env.example .env.local
```

Asegúrese de definir los valores de conexión a Firebase en `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC0r1-i6ixsMM5CKNZePP3_5tdWvIN08mA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=socios-del-fuego.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=socios-del-fuego
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=socios-del-fuego.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=944971952910
NEXT_PUBLIC_FIREBASE_APP_ID=1:944971952910:web:037d5af070c86168595d5f
```

### 3. Migración y Sembrado de Datos (Firestore Seeding)

Para inicializar la base de datos Firestore con la estructura predeterminada de planes comerciales, ejecute el script de migración en Node.js:

```bash
node scripts/migrate.mjs
```

> **Nota:** Este comando poblará la colección `plans` en Firestore con las tarifas de cortes, entradas, formato cóctel y especificaciones de servicio.

### 4. Ejecución en Entorno de Desarrollo

Inicie el servidor de desarrollo local de Next.js:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### 5. Verificación de Calidad y Compilación para Producción

Para validar la ausencia de errores sintácticos y generar el bundle optimizado de producción:

```bash
# Análisis estático (ESLint)
npm run lint

# Compilación de producción
npm run build

# Inicio del servidor en modo producción
npm run start
```

---

## Estructura del Repositorio

```
socios-marketing/
├── app/                        # Rutas principales y layouts (Next.js App Router)
│   ├── blog/                   # Enrutamiento del motor de blogs (Lista y [slug])
│   ├── cotizar/                # Motor de cotización interactivo
│   ├── globals.css             # Estilos globales y directivas de Tailwind CSS
│   ├── layout.tsx              # Layout raíz (Fonts, Schema.org, GA4, Pixel, Clarity)
│   └── page.tsx                # Landing page principal de alta conversión
├── components/                 # Componentes modulares de interfaz de usuario
│   ├── cotizador/              # Pasos del flujo de cotización y panel administrativo
│   │   ├── AdminDashboard.jsx  # Vista de administración de cotizaciones
│   │   ├── AdminPlansEditor.jsx# Editor de precios y menús en tiempo real (Firestore)
│   │   ├── StepDateGuests.jsx  # Selección de fecha, comuna y número de invitados
│   │   ├── StepPlanSelection.jsx# Selección de plan gastronómico y filtros
│   │   └── StepSummary.jsx     # Resumen dinámico y despacho a WhatsApp/PDF
│   └── ui/                     # Primitivas accesibles de UI basadas en Radix UI
├── content/                    # Fuente de datos estáticos para Inbound Marketing
│   └── posts/                  # Artículos del blog en formato Markdown (.md)
├── lib/                        # Capa de utilidades, clientes de BD y esquemas
│   ├── blog.ts                 # Parser de archivos Markdown mediante gray-matter
│   ├── firebase.ts             # Inicialización del SDK cliente de Firebase/Firestore
│   ├── plans.js                # Esquema por defecto y estructura de datos de planes
│   └── utils.ts                # Funciones auxiliares de cálculo y Tailwind merge
├── public/                     # Recursos estáticos (Imágenes, íconos, robots.txt)
├── scripts/                    # Scripts de infraestructura y mantenimiento
│   └── migrate.mjs             # Script de migración y sembrado hacia Firebase Firestore
├── .env.example                # Plantilla oficial de variables de entorno
├── components.json             # Configuración de componentes Radix / Shadcn UI
├── next.config.ts              # Configuración del compilador y framework Next.js
├── package.json                # Definición de dependencias y scripts del proyecto
└── tsconfig.json               # Configuración de compilación de TypeScript
```

---

## Estándares de Código y Evaluaciones Operativas

1. **Gestión del Estado**: El estado del cotizador se mantiene en memoria del cliente durante la navegación entre etapas y se sincroniza con el catálogo de Firestore para garantizar valores tarifarios vigentes.
2. **Resiliencia ante Fallas de Red**: En caso de indisponibilidad temporal con la base de datos Firestore, el sistema conmuta automáticamente al catálogo de respaldo definido en `lib/plans.js`.
3. **Optimización de Conversión (CRO)**: La arquitectura está estructurada para reducir los pasos entre el interés inicial del cliente y la generación del requerimiento en WhatsApp en menos de 60 segundos.
