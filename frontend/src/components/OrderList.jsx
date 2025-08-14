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
    <tr onClick={handleRowClick} className="bg-neutral-white border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
      <td className="py-4 px-6 font-medium text-neutral-black whitespace-nowrap">{order.customerName}</td>
      <td className="py-4 px-6 text-neutral-black">{order.product}</td>
      <td className="py-4 px-6 text-neutral-black">R$ {order.price.toFixed(2)}</td>
      <td className="py-4 px-6 text-neutral-black">{order.status}</td>
      <td className="py-4 px-6 text-right">
        <button onClick={handleEditClick} className="font-medium text-primary-light hover:text-primary-main mr-4 transition-colors">Editar</button>
        <button onClick={handleDeleteClick} className="font-medium text-red-500 hover:text-red-700 transition-colors">Excluir</button>
      </td>
    </tr>
  );
};

function OrderList({ orders, loading, error, onDelete }) {
  if (loading) return <p className="text-center text-xl text-neutral-black">Carregando pedidos...</p>;
  if (error) return <p className="text-center text-xl text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="text-center text-gray-500">Nenhum pedido encontrado...</p>;

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-neutral-white">
      <table className="w-full text-sm text-left text-neutral-black">
        <thead className="text-xs text-neutral-white uppercase bg-primary-main">
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