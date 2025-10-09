# 📇 Contact Manager App

**Contact Manager App** es una aplicación web construida con **Next.js 15**, **React 19**, **Prisma ORM**, y **PostgreSQL**, diseñada para gestionar contactos de manera sencilla, rápida y segura.  
Incluye autenticación mediante **NextAuth**, manejo de contraseñas con **bcrypt**, y una interfaz elegante gracias a **PrimeReact** y **TailwindCSS**.

---

## 🚀 Tecnologías principales

| Categoría | Tecnología |
|------------|-------------|
| Framework | [Next.js 15](https://nextjs.org/) (con Turbopack) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/), [PrimeReact](https://primereact.org/), [TailwindCSS 4](https://tailwindcss.com/), [React-Icons](https://react-icons.github.io/react-icons/), [Windster](https://themewagon.com/theme-framework/tailwind-css/)|
| ORM | [Prisma ORM](https://www.prisma.io/) |
| Base de Datos | [PostgreSQL 15](https://www.postgresql.org/) |
| Autenticación | [NextAuth](https://next-auth.js.org/) |
| Contenedores | [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/) |

---

## ⚙️ Estructura del Proyecto

```
contact-manager-app/
├── prisma/                 # Archivos del esquema de Prisma y seeds
│   ├── schema.prisma
│   └── seed.ts
├── src/                    # Código fuente (componentes, páginas, API routes)
│   ├── app/
│       ├── api/
│       ├── components/
│       ├── dashboard/
│       ├── login/
│   ├── generated/
│   ├── lib/
│   ├── types/
|   └── middleware
├── public/                 # Archivos estáticos
├── Dockerfile              # Configuración del contenedor de la app
├── docker-compose.yml      # Orquestación con Postgres y la app
├── entrypoint.sh           # Script de arranque del contenedor
├── package.json
└── .env                    # Variables de entorno
```

---

## 🐳 Ejecución con Docker

### 1️⃣ Requisitos previos
Asegúrate de tener instalado:
- [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2️⃣ Crear archivo `.env`
Antes de iniciar los contenedores, crea un archivo `.env` en la raíz con al menos estas variables:

```env
DATABASE_URL=postgresql://contactUser:contactPassword@postgres:5432/contacts_db?schema=public
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=la_mejor_clave_secreta_del_mundo_mundial_123
```

### 3️⃣ Levantar los servicios
Ejecuta el siguiente comando para construir e iniciar los contenedores:

```bash
docker compose up --build
```

Esto levantará dos contenedores:

| Servicio | Puerto | Descripción |
|-----------|---------|-------------|
| **postgres** | `5431` | Base de datos PostgreSQL |
| **contacts-app** | `3000` | Aplicación Next.js lista en `http://localhost:3000` |

> 💡 Puedes conectarte a la base de datos desde PgAdmin o DBeaver usando `localhost:5431`.

---

## 🧩 Scripts disponibles

Desde la raíz del proyecto puedes usar:

| Script | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con Turbopack |
| `npm run build` | Genera el build optimizado de producción |
| `npm start` | Inicia la aplicación en modo producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run db:generate` | Genera el cliente Prisma (`@prisma/client`) |
| `npm run db:migrate` | Aplica migraciones a la base de datos |
| `npm run db:seed` | Inserta datos iniciales (`prisma/seed.ts`) |

---

## 🗄️ Configuración de Prisma y Base de Datos

El esquema se encuentra en `prisma/schema.prisma`.  
Puedes generar el cliente de Prisma manualmente con:

```bash
npx prisma generate
```

Y aplicar las migraciones con:

```bash
npx prisma migrate deploy
```

Si necesitas hacer un `reset` o correr las seeds:

```bash
npx prisma migrate reset
npm run db:seed
```

---

## 🧱 Dockerfile – Multi-stage Build

Este proyecto usa un **Dockerfile multi-stage** que:
1. Construye la app (instalando dependencias y generando `.next`).
2. Crea una imagen final ligera solo con los archivos necesarios (`.next`, `node_modules`, `src`, `prisma` y `public`).
3. Usa `entrypoint.sh` como punto de entrada para ejecutar el servidor.

Esto reduce el tamaño final del contenedor y mejora el rendimiento.

---

## 🧠 Notas importantes

- Si tienes PostgreSQL instalado localmente, asegúrate de **no usar el puerto 5432** (usa el 5431 mapeado por Docker).
- Prisma usa el `DATABASE_URL` definido en `.env` o en el `docker-compose.yml`.
- El entorno `NODE_ENV=production` se define automáticamente en la imagen final.
- Puedes acceder a los logs del contenedor con:
  ```bash
  docker logs -f contacts-app
  ```

---

## 🧑‍💻 Autor

**Nelson Alexander Díaz De La Cruz**  
