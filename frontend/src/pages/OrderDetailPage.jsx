import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { getOrderById } from '../services/api';

function OrderDetailPage() {

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError('Pedido não encontrado ou falha ao carregar.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center text-xl">Carregando detalhes do pedido...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Detalhes do Pedido</h1>
        {order && (
          <div className="space-y-3 text-lg">
            <p><span className="font-bold text-gray-400">ID:</span> {order.id}</p>
            <p><span className="font-bold text-gray-400">Cliente:</span> {order.customerName}</p>
            <p><span className="font-bold text-gray-400">Produto:</span> {order.product}</p>
            <p><span className="font-bold text-gray-400">Valor:</span> R$ {order.price.toFixed(2)}</p>
            <p><span className="font-bold text-gray-400">Status:</span> {order.status}</p>
            <p><span className="font-bold text-gray-400">Data de Criação:</span> {new Date(order.creationDate).toLocaleString()}</p>
          </div>
        )}
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 font-medium">
          &larr; Voltar para a lista de pedidos
        </Link>
      </div>
    </div>
  );
}

export default OrderDetailPage;