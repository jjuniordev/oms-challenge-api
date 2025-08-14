import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/api';

function OrderList() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data); 
      } catch (err) {
        setError('Falha ao carregar os pedidos.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, []);

  
  if (loading) {
    return <p className="text-center text-xl">Carregando pedidos...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs text-gray-100 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">Cliente</th>
            <th scope="col" className="py-3 px-6">Produto</th>
            <th scope="col" className="py-3 px-6">Valor</th>
            <th scope="col" className="py-3 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap">{order.customerName}</td>
              <td className="py-4 px-6">{order.product}</td>
              <td className="py-4 px-6">R$ {order.price.toFixed(2)}</td>
              <td className="py-4 px-6">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;