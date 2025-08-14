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

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o pedido ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o pedido ${id}:`, error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar o pedido ${id}:`, error);
    throw error;
  }
};

export default api;