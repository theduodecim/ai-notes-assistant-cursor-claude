# AI Notes Assistant

Mini app SaaS con IA para gestionar notas y tareas.

## Stack

- **Next.js** (TypeScript, App Router, `src/`)
- **Tailwind CSS**
- **Supabase** — auth, notas con RLS
- **OpenAI** — resumir, mejorar redacción, action items (próximo paso)
- **Vercel** — deploy

## Funcionalidades

- Login / registro con email y contraseña
- Dashboard protegido con CRUD de notas
- Botones IA (próximo paso): resumir, mejorar redacción, action items

## Base de datos (Supabase)

En el [SQL Editor](https://supabase.com/dashboard) de tu proyecto, ejecutá el contenido de:

`supabase/migrations/001_notes.sql`

Crea la tabla `notes`, el trigger de `updated_at` y las políticas RLS (cada usuario solo accede a sus notas).

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando        | Descripción              |
| -------------- | ------------------------ |
| `npm run dev`  | Servidor de desarrollo   |
| `npm run build`| Build de producción      |
| `npm run start`| Servidor de producción   |
| `npm run lint` | ESLint                   |

## Estructura

```
src/
  app/          # App Router (páginas y layouts)
  ...
```
