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
      <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-neutral-black whitespace-nowrap text-sm sm:text-base">{order.customerName}</td>
      <td className="py-3 sm:py-4 px-3 sm:px-6 text-neutral-black text-sm sm:text-base hidden sm:table-cell">{order.product}</td>
      <td className="py-3 sm:py-4 px-3 sm:px-6 text-neutral-black text-sm sm:text-base">R$ {order.price.toFixed(2)}</td>
      <td className="py-3 sm:py-4 px-3 sm:px-6 text-neutral-black text-sm sm:text-base hidden md:table-cell">{order.status}</td>
      <td className="py-3 sm:py-4 px-3 sm:px-6 text-right">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-end">
          <button onClick={handleEditClick} className="font-medium text-primary-light hover:text-primary-main text-xs sm:text-sm transition-colors">Editar</button>
          <button onClick={handleDeleteClick} className="font-medium text-red-500 hover:text-red-700 text-xs sm:text-sm transition-colors">Excluir</button>
        </div>
      </td>
    </tr>
  );
};

function OrderList({ orders, loading, error, onDelete }) {
  if (loading) return <p className="text-center text-lg sm:text-xl text-neutral-black">Carregando pedidos...</p>;
  if (error) return <p className="text-center text-lg sm:text-xl text-red-500">{error}</p>;
  if (orders.length === 0) return <p className="text-center text-gray-500">Nenhum pedido encontrado...</p>;

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-neutral-white">
      <table className="w-full text-sm text-left text-neutral-black">
        <thead className="text-xs uppercase bg-primary-main text-neutral-white">
          <tr>
            <th scope="col" className="py-3 px-3 sm:px-6">Cliente</th>
            <th scope="col" className="py-3 px-3 sm:px-6 hidden sm:table-cell">Produto</th>
            <th scope="col" className="py-3 px-3 sm:px-6">Valor</th>
            <th scope="col" className="py-3 px-3 sm:px-6 hidden md:table-cell">Status</th>
            <th scope="col" className="py-3 px-3 sm:px-6"><span className="sr-only">Ações</span></th>
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