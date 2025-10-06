# Usamos una imagen ligera de Node.js (Alpine) para construir la aplicación
# 'AS builder' nombra esta fase para poder copiar archivos desde aquí en la fase de producción
FROM node:20-alpine AS builder

# Definimos el directorio de trabajo dentro del contenedor
# Todas las instrucciones posteriores se ejecutarán dentro de /app
WORKDIR /app

# 1. Copiamos únicamente los archivos de dependencias
# Esto permite que Docker cachee la instalación de dependencias si package.json no cambia
COPY package*.json ./

# 2. Copiamos la carpeta prisma con schema.prisma
# ESTE PASO ES CRUCIAL. Debe ir ANTES de npm install para que 'prisma generate' tenga acceso al archivo.
COPY prisma ./prisma

# 3. Instalamos todas las dependencias del proyecto
# Aquí se ejecuta 'prisma generate' (si está en postinstall) y ahora tiene el schema disponible.
RUN npm install

# 4. Copiamos el resto de los archivos del proyecto al contenedor
# Incluye: src/, public/, next.config.js, etc.
COPY . .

# Ejecutamos el build de Next.js para producción
# Esto genera la carpeta .next con los archivos optimizados para producción
RUN npm run build

# --- FASE DE PRODUCCIÓN (Más ligera y segura) ---

# Usamos nuevamente Node.js Alpine para un contenedor limpio y ligero
FROM node:20-alpine

# Definimos el directorio de trabajo en la fase de producción
WORKDIR /app

# package.json y package-lock.json: necesarios para los scripts y dependencias
COPY --from=builder /app/package*.json ./

# node_modules: dependencias instaladas en la fase de build
# Esto evita tener que instalar dependencias de nuevo en producción
COPY --from=builder /app/node_modules ./node_modules

# .next: carpeta con el build optimizado de Next.js
# Contiene páginas, server components, SSR y todo listo para producción
COPY --from=builder /app/.next ./.next

# public: archivos estáticos (imágenes, fuentes, favicon, etc.)
COPY --from=builder /app/public ./public

# src: código fuente del proyecto
# Importante si usas Server Components, rutas dinámicas o Prisma
COPY --from=builder /app/src ./src

# prisma: necesario para ejecutar migraciones o generar cliente
COPY --from=builder /app/prisma ./prisma

# Copiamos el script de arranque
COPY entrypoint.sh ./entrypoint.sh

# Damos permisos de ejecución
RUN chmod +x ./entrypoint.sh

# Definimos el entorno como producción para optimizar Next.js
ENV NODE_ENV=production

# Indicamos el puerto en el que la aplicación escuchará dentro del contenedor
EXPOSE 3000

# Usamos el script como punto de entrada (reemplaza el CMD anterior)
CMD ["./entrypoint.sh"]
