import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
};

export default api;