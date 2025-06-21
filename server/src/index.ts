import express from 'express';
import cors from 'cors';
import ENV from './config/env';
import userRoutes from './module/router/user.routes';
import cookieParser from 'cookie-parser';
import taskRoutes from './module/router/task.routes';

const app = express();

const allowedOrigins = ['http://localhost:4200'];

app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    // Permite solicitudes sin origen (como Postman) o que estén en la lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true, // Muy importante para permitir cookies y auth headers
}));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/', taskRoutes);

app.listen(ENV.PORT, () => console.log("Servidor activo en puerto:", ENV.PORT));