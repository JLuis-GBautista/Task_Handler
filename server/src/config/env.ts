// interfaz de variables de entorno
interface Env {
  [name: string]: string;
  PORT: string;
  ENVIRONMENT: string;
  HOST: string;
  MYSQL_HOST: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  O_LLAMA_URL: string;
}

const ENV = process.env as Env;

export default ENV;
