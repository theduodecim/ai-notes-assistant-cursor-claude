# AI Notes Assistant

> Mini app SaaS con IA para gestionar notas con funciones de inteligencia artificial. Demo técnica moderna construida con workflow cloud-first.

---

## 🚀 Demo

**URL:** https://ai-notes-assistant-cursor-claude.vercel.app  
**Stack:** Next.js · Supabase · OpenAI · Vercel  
**Repo:** `theduodecim/ai-notes-assistant-cursor-claude`

---

## ✨ Funcionalidades

- 🔐 Auth completo — registro, login, logout, confirmación por email
- 🔑 Reset de contraseña — flujo completo con email (PKCE flow)
- 🛡️ Dashboard protegido — rutas privadas con middleware
- 📝 CRUD de notas — crear, editar, eliminar
- ✅ Validaciones en formularios — login y notas con mensajes de error inline
- 🤖 IA integrada — resumir, mejorar redacción, convertir en action items *(próximo)*

---

## 🧱 Stack

| Tecnología | Uso |
|-----------|-----|
| Next.js 16 + Turbopack | Frontend + Backend |
| TypeScript | Tipado |
| Tailwind CSS v4 | Estilos |
| Supabase | Auth + Base de datos (PostgreSQL) |
| OpenAI | Funciones de IA *(próximo)* |
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
      actions.ts              # login, signUp, logout, forgotPassword, updatePassword
      callback/
        route.ts              # Intercambia code PKCE por sesión
      confirm/
        route.ts              # Confirmación de email (token_hash)
        page.tsx              # Manejo de hash tokens (#access_token)
      reset-password/
        page.tsx              # Formulario de nueva contraseña
    dashboard/
      actions.ts              # CRUD de notas
      page.tsx                # Dashboard principal
    login/
      page.tsx                # Login y registro
    layout.tsx
    page.tsx
    globals.css
  components/
    auth-form.tsx             # Formulario de login/registro + olvidé contraseña
    logout-button.tsx
    notes/
      create-note-form.tsx
      note-card.tsx
      note-edit-form.tsx
      note-form-fields.tsx
      notes-list.tsx
  lib/
    notes-validation.ts       # Validaciones compartidas (título y contenido)
    supabase/
      client.ts               # Cliente browser
      server.ts               # Server Components
      admin.ts                # Service role
      session.ts              # Middleware de sesión
  types/
    note.ts
supabase/
  migrations/
    001_notes.sql             # Tabla notes + RLS
```

---

## 🔜 Roadmap

- [x] Entorno cloud (Cursor + Codespaces via SSH)
- [x] Next.js + TypeScript + Tailwind
- [x] Supabase auth completo
- [x] CRUD de notas con RLS
- [x] Validaciones en formularios
- [x] Reset de contraseña
- [x] Deploy en Vercel
- [ ] Integración OpenAI (resumir, mejorar redacción, action items)

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
Deploy automático en Vercel
```
