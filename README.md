# AI Notes Assistant

> Mini app SaaS con IA para gestionar notas con funciones de inteligencia artificial. Demo técnica moderna construida con workflow cloud-first.

---

## 🚀 Demo

**Stack:** Next.js · Supabase · OpenAI · Vercel  
**Repo:** `theduodecim/ai-notes-assistant-cursor-claude`

---

## ✨ Funcionalidades

- 🔐 Auth completo — registro, login, logout, confirmación por email
- 🛡️ Dashboard protegido — rutas privadas con middleware
- 📝 CRUD de notas — crear, editar, eliminar
- 🤖 IA integrada — resumir, mejorar redacción, convertir en action items *(próximo)*
- ☁️ Deploy real en Vercel *(próximo)*

---

## 🧱 Stack

| Tecnología | Uso |
|-----------|-----|
| Next.js 16 + Turbopack | Frontend + Backend |
| TypeScript | Tipado |
| Tailwind CSS v4 | Estilos |
| Supabase | Auth + Base de datos (PostgreSQL) |
| OpenAI | Funciones de IA |
| GitHub Codespaces | Entorno cloud de desarrollo |
| Cursor | IDE con IA |
| Vercel | Deploy |

---

## ⚙️ Setup local

### 1. Clonar el repo
```bash
git clone https://github.com/theduodecim/ai-notes-assistant-cursor-claude
cd ai-notes-assistant-cursor-claude
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de entorno
Crear `.env.local` con:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
OPENAI_API_KEY=tu_openai_key
```

### 4. Migración de base de datos
Correr el SQL en Supabase → SQL Editor:
```bash
cat supabase/migrations/001_notes.sql
```

### 5. URLs en Supabase (Authentication → URL Configuration)
Agregar a **Redirect URLs**:
- `http://localhost:3000/auth/callback`
- `https://ai-notes-assistant-cursor-claude.vercel.app/auth/callback`

El reset de contraseña usa `/auth/callback?next=/auth/reset-password` para intercambiar el `code` por sesión.

### 6. Correr en desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura

```
src/
  app/
    auth/
      actions.ts          # login, signUp, logout
      confirm/            # confirmación de email
    dashboard/
      actions.ts          # CRUD de notas
      page.tsx            # Dashboard principal
    login/
      page.tsx            # Login y registro
    layout.tsx
    page.tsx
    globals.css
  components/
    notes/
      create-note-form.tsx
      note-card.tsx
      notes-list.tsx
  lib/
    supabase/
      client.ts           # Cliente browser
      server.ts           # Server Components
      admin.ts            # Service role
      middleware.ts       # Sesión y rutas protegidas
  types/
    note.ts
supabase/
  migrations/
    001_notes.sql         # Tabla notes + RLS
```

---

## 🤖 Prompts usados en Cursor Agent

### Inicializar Next.js
```
Quiero construir una mini app SaaS con IA llamada AI Notes Assistant.

Stack: Next.js con TypeScript y Tailwind, Supabase para auth y base de datos, OpenAI para IA, Deploy en Vercel.

Empezá por inicializar el proyecto Next.js en la carpeta actual con TypeScript, Tailwind, ESLint, App Router y src directory.
```

### Configurar Supabase + Auth
```
Configurá Supabase en el proyecto. Necesito:
1. Instalar @supabase/supabase-js y @supabase/ssr
2. Crear el cliente de Supabase para client y server
3. Auth completo con login/registro con email y password
4. Middleware para proteger rutas del dashboard
5. Página de login en /login
6. Dashboard protegido en /dashboard
7. Botón de logout
```

### CRUD de notas
```
Ahora construí el CRUD completo de notas. Necesito:
1. Tabla "notes" en Supabase con campos: id, user_id, title, content, created_at, updated_at
2. RLS activado (cada usuario solo ve sus propias notas)
3. En el dashboard: lista de notas, formulario para crear nota, editar y eliminar
4. Diseño limpio con Tailwind
```

---

## 🔜 Roadmap

- [x] Entorno cloud (Cursor + Codespaces via SSH)
- [x] Next.js + TypeScript + Tailwind
- [x] Supabase auth completo
- [x] CRUD de notas con RLS
- [ ] Integración OpenAI (resumir, mejorar redacción, action items)
- [ ] Deploy en Vercel

---

## 🌐 Workflow de desarrollo

```
GitHub Repo
    ↓
GitHub Codespaces (entorno cloud)
    ↓
Cursor Desktop conectado via SSH
    ↓
Cursor Agent (IA)
    ↓
Deploy en Vercel
```
