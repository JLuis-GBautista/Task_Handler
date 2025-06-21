# Instrucciones

## Backend
Ejecutar script de docker-compose para crear y configurar base de datos mysql
```bash
docker-compose up -d
```

Establecer variables de entorno para la migracion de tablas (/.env.dev)
```env
PORT=
ENVIRONMENT=

MYSQL_HOST=
MYSQL_USER=
MYSQL_PORT=
MYSQL_PASSWORD=
MYSQL_DATABASE=
DATABASE_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```
Ejecutar migraciones
```bash
pnpm run kit:generate
pnpm run kit:migrate
```

Ejecutar con pnpm run start

## Frontend

Ejecutar
npm run start
