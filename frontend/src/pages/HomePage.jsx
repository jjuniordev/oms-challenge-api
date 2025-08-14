import React, { useState, useEffect, useCallback } from 'react';
import { getOrders, deleteOrder } from '../services/api';
import OrderList from '../components/OrderList';
import CreateOrderForm from '../components/CreateOrderForm';

function HomePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError('Falha ao carregar os pedidos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await deleteOrder(id);
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
      } catch (err) {
        alert('Falha ao excluir o pedido.');
      }
    }
  };
      
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-400">
          Sistema de Gestão de Pedidos
        </h1>
      </header>
      <main>
        <CreateOrderForm onOrderCreated={fetchOrders} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Pedidos Recentes</h2>
          <OrderList orders={orders} loading={loading} error={error} onDelete={handleDeleteOrder} />
        </div>
      </main>
    </>
  );
}

export default HomePage;