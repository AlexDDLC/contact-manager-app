#!/bin/sh
set -e

echo "Esperando a que la base de datos esté lista..."
until nc -z postgres 5432; do
  sleep 1
done

echo "Base de datos disponible."

echo "Ejecutando Prisma generate..."
npx prisma generate

echo "Ejecutando Prisma migrate..."
npx prisma migrate deploy

echo "Ejecutando seed..."
npx tsx prisma/seed.ts || echo " Seed falló, pero continuamos."

echo "Iniciando aplicación..."
npm start
