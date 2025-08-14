import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderRow = ({ order, onDelete }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/order/${order.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/order/${order.id}/edit`);
  };
  
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(order.id);
  };

  return (
    <tr onClick={handleRowClick} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 cursor-pointer">
      <td className="py-4 px-6 font-medium text-white whitespace-nowrap">{order.customerName}</td>
      <td className="py-4 px-6">{order.product}</td>
      <td className="py-4 px-6">R$ {order.price.toFixed(2)}</td>
      <td className="py-4 px-6">{order.status}</td>
      <td className="py-4 px-6 text-right">
        <button onClick={handleEditClick} className="font-medium text-cyan-500 hover:underline mr-4">Editar</button>
        <button onClick={handleDeleteClick} className="font-medium text-red-500 hover:underline">Excluir</button>
      </td>
    </tr>
  );
};

function OrderList({ orders, loading, error, onDelete }) {
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
            <th scope="col" className="py-3 px-6"><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;