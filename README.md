# Portafolio - Daniel de León

Template de portafolio personal moderno, minimalista y de alto rendimiento, desarrollado con **Nuxt 4**, **Nuxt UI**, **Tailwind CSS** y **Nuxt Content**. Diseñado para destacar proyectos, artículos y experiencia profesional con soporte multi-idioma y notificaciones directas a **Telegram**.

---

## 🚀 Características

- **Nuxt 4 & Nuxt UI** – Interfaz moderna, fluida y con modo oscuro por defecto.
- **Formulario con Notificaciones por Telegram** – Recibe al instante todos los mensajes de contacto en tu chat o grupo de Telegram mediante un bot.
- **Nuxt Content** – Administración ágil de artículos, proyectos y preguntas frecuentes mediante archivos Markdown y JSON.
- **Soporte Multi-idioma (i18n)** – Configurado para Español e Inglés.
- **Seguridad** – Verificación humana mediante Google reCAPTCHA v2.
- **SEO & Performance** – Generación automática de `sitemap.xml`, Open Graph Image dinámica y optimización de recursos.

---

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
- [pnpm](https://pnpm.io/) (o npm / bun)

---

## 🛠️ Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/photodangt-web/daniel-porfafolio-old.git
cd daniel-porfafolio-old
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
Crea tu archivo `.env` a partir de la plantilla:
```bash
cp .env.example .env
```

Configura tus credenciales en el archivo `.env`:
```env
# Telegram Bot (Requerido para recibir mensajes de contacto)
TELEGRAM_BOT_TOKEN=tu_bot_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui

# Google reCAPTCHA v2
RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET=tu_secret_key_aqui

# Resend (Opcional - respaldo por correo electrónico)
NUXT_PRIVATE_RESEND_API_KEY=
```

### 4. Iniciar en modo desarrollo
```bash
pnpm dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📦 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local con recarga en vivo |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm start` | Inicia el servidor compilado de producción en Node.js |
| `pnpm generate` | Prerenderiza y genera la versión estática del sitio |
| `pnpm run typecheck` | Ejecuta la verificación estática de tipos con TypeScript |
| `pnpm lint` | Analiza el código con ESLint |

---

## 📝 Personalización del Contenido

Todo el contenido se gestiona desde el directorio `content/`:
- **Artículos:** `content/articles/` (español) y `content/en/articles/` (inglés).
- **Proyectos:** `content/projects/` y `content/projects_webapps/`.
- **Información general y redes:** Configurable en `app.config.ts`.
