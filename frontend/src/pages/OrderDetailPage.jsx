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

  if (loading) return <p className="text-center text-lg sm:text-xl text-neutral-black px-4">Carregando detalhes do pedido...</p>;
  if (error) return <p className="text-center text-lg sm:text-xl text-red-500 px-4">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-neutral-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-black mb-4">Detalhes do Pedido</h1>
        {order && (
          <div className="space-y-3 text-base sm:text-lg">
            <p><span className="font-bold text-gray-600">ID:</span> <span className="text-neutral-black break-all">{order.id}</span></p>
            <p><span className="font-bold text-gray-600">Cliente:</span> <span className="text-neutral-black break-words">{order.customerName}</span></p>
            <p><span className="font-bold text-gray-600">Produto:</span> <span className="text-neutral-black break-words">{order.product}</span></p>
            <p><span className="font-bold text-gray-600">Valor:</span> <span className="text-neutral-black">R$ {order.price.toFixed(2)}</span></p>
            <p><span className="font-bold text-gray-600">Status:</span> <span className="text-neutral-black">{order.status}</span></p>
            <p><span className="font-bold text-gray-600">Data de Criação:</span> <span className="text-neutral-black text-sm sm:text-base">{new Date(order.creationDate).toLocaleString()}</span></p>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-4 py-2 text-primary-light hover:text-primary-main font-medium transition-colors text-sm sm:text-base bg-gray-50 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para Lista
        </Link>
        <Link 
          to={`/order/${order?.id}/edit`}
          className="inline-flex items-center justify-center px-4 py-2 text-neutral-white bg-primary-main hover:bg-primary-main/90 font-medium transition-colors text-sm sm:text-base rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editar Pedido
        </Link>
      </div>
    </div>
  );
}

export default OrderDetailPage;