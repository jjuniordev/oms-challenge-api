import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const OrderRow = ({ order }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/order/${order.id}`);
  };

  return (
    <tr onClick={handleRowClick} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 cursor-pointer">
      <td className="py-4 px-6 font-medium text-white whitespace-nowrap">{order.customerName}</td>
      <td className="py-4 px-6">{order.product}</td>
      <td className="py-4 px-6">R$ {order.price.toFixed(2)}</td>
      <td className="py-4 px-6">{order.status}</td>
    </tr>
  );
};


function OrderList({ orders, loading, error }) {
  if (loading) return <p className="text-center text-xl">Carregando pedidos...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="text-center text-gray-400">Nenhum pedido encontrado...</p>;

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
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;