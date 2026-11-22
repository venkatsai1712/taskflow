# TaskFlow

TaskFlow is a beginner-friendly full-stack distributed job queue project built with React and Spring Boot.

## Repository structure

```text
TaskFlow/
├── backend/          # Spring Boot API and workers
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/         # React and Vite dashboard
│   ├── src/
│   ├── public/
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Run locally

Start PostgreSQL and RabbitMQ:

```powershell
docker compose up -d postgres rabbitmq
```

Start the backend:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Start the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment

Configure the backend with `SPRING_DATASOURCE_*`, `SPRING_RABBITMQ_*`, `PORT`, and `APP_CORS_ALLOWED_ORIGINS`.

For a separately hosted frontend, set `VITE_API_URL` to the backend origin.

## Production build

```powershell
cd backend
.\mvnw.cmd clean package
cd ..\frontend
npm install
npm run build
```
