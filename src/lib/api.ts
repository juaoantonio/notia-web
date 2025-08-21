import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request (ex: anexar headers adicionais futuramente)
api.interceptors.request.use((config) => {
  // Ex: config.headers["X-Client"] = "Notia-Frontend";
  return config;
});

// Interceptor de response para tratamento central de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui você pode normalizar erros, emitir toasts, etc.
    // Ex.: redirecionar para login quando 401 em rotas privadas
    if (error?.response?.status === 401) {
      // window.location.href = "/login"; // opcional
    }
    return Promise.reject(error);
  },
);
