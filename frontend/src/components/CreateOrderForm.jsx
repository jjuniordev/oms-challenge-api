import React, { useState } from 'react';
import { createOrder } from '../services/api';

function CreateOrderForm({ onOrderCreated }) {

  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null);

    if (!customerName || !product || !price) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrderData = {
        customerName,
        product,
        price: parseFloat(price)
      };
      await createOrder(newOrderData);

      setCustomerName('');
      setProduct('');
      setPrice('');

      onOrderCreated();

    } catch (err) {
      setError('Falha ao criar o pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Criar Novo Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-300">Nome do Cliente</label>
            <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" />
          </div>
          <div>
            <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-300">Produto</label>
            <input type="text" id="product" value={product} onChange={(e) => setProduct(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">Valor</label>
            <input type="number" step="0.01" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-500">
          {isSubmitting ? 'Criando...' : 'Criar Pedido'}
        </button>
      </form>
    </div>
  );
}

export default CreateOrderForm;