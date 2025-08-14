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

  if (loading) return <p className="text-center text-xl text-neutral-black">Carregando detalhes do pedido...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-neutral-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-neutral-black mb-4">Detalhes do Pedido</h1>
        {order && (
          <div className="space-y-3 text-lg">
            <p><span className="font-bold text-gray-600">ID:</span> <span className="text-neutral-black">{order.id}</span></p>
            <p><span className="font-bold text-gray-600">Cliente:</span> <span className="text-neutral-black">{order.customerName}</span></p>
            <p><span className="font-bold text-gray-600">Produto:</span> <span className="text-neutral-black">{order.product}</span></p>
            <p><span className="font-bold text-gray-600">Valor:</span> <span className="text-neutral-black">R$ {order.price.toFixed(2)}</span></p>
            <p><span className="font-bold text-gray-600">Status:</span> <span className="text-neutral-black">{order.status}</span></p>
            <p><span className="font-bold text-gray-600">Data de Criação:</span> <span className="text-neutral-black">{new Date(order.creationDate).toLocaleString()}</span></p>
          </div>
        )}
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="text-primary-light hover:text-primary-main font-medium transition-colors">
          &larr; Voltar para a lista de pedidos
        </Link>
      </div>
    </div>
  );
}

export default OrderDetailPage;