import React, { useState } from 'react';
import { createOrder } from '../services/api';
import AlertModal from './AlertModal';

function CreateOrderForm({ onOrderCreated }) {

  const [customerName, setCustomerName] = useState('');
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null);

    if (!customerName || !product || !price) {
      setAlertModal({
        isOpen: true,
        title: 'Campos Obrigatórios',
        message: 'Todos os campos são obrigatórios.',
        type: 'warning'
      });
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

      setAlertModal({
        isOpen: true,
        title: 'Sucesso',
        message: 'Pedido criado com sucesso!',
        type: 'success'
      });

    } catch (err) {
      setAlertModal({
        isOpen: true,
        title: 'Erro',
        message: 'Falha ao criar o pedido. Tente novamente.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-neutral-black">Criar Novo Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-neutral-black">Nome do Cliente</label>
            <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="bg-neutral-white border border-gray-300 text-neutral-black text-sm rounded-lg focus:ring-primary-light focus:border-primary-light block w-full p-2.5" />
          </div>
          <div>
            <label htmlFor="product" className="block mb-2 text-sm font-medium text-neutral-black">Produto</label>
            <input type="text" id="product" value={product} onChange={(e) => setProduct(e.target.value)} className="bg-neutral-white border border-gray-300 text-neutral-black text-sm rounded-lg focus:ring-primary-light focus:border-primary-light block w-full p-2.5" />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-neutral-black">Valor</label>
            <input type="number" step="0.01" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-neutral-white border border-gray-300 text-neutral-black text-sm rounded-lg focus:ring-primary-light focus:border-primary-light block w-full p-2.5" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="w-full text-neutral-white bg-primary-main hover:bg-primary-main/90 focus:ring-4 focus:outline-none focus:ring-primary-light/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 transition-colors">
          {isSubmitting ? 'Criando...' : 'Criar Pedido'}
        </button>
      </form>
      
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ isOpen: false, title: '', message: '', type: 'info' })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  );
}

export default CreateOrderForm;