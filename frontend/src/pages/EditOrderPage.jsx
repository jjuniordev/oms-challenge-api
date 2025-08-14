import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderById, updateOrder } from '../services/api';
import AlertModal from '../components/AlertModal';

function EditOrderPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    product: '',
    price: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setFormData({
          customerName: data.customerName,
          product: data.product,
          price: data.price
        });
      } catch (err) {
        setError('Falha ao carregar dados do pedido.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const updatedData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      await updateOrder(orderId, updatedData);
      
      setAlertModal({
        isOpen: true,
        title: 'Sucesso',
        message: 'Pedido atualizado com sucesso!',
        type: 'success'
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setAlertModal({
        isOpen: true,
        title: 'Erro',
        message: 'Falha ao atualizar o pedido. Tente novamente.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-lg sm:text-xl text-neutral-black px-4">Carregando formulário de edição...</p>;
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-neutral-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-black mb-4">Editar Pedido</h1>
        <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-4">
              <div>
                <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-neutral-black">Nome do Cliente</label>
                <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} className="bg-neutral-white border border-gray-300 text-neutral-black text-sm rounded-lg focus:ring-primary-light focus:border-primary-light block w-full p-2.5" />
              </div>
              <div>
                <label htmlFor="product" className="block mb-2 text-sm font-medium text-neutral-black">Produto</label>
                <input type="text" id="product" name="product" value={formData.product} onChange={handleChange} className="bg-neutral-white border border-gray-300 text-neutral-black text-sm rounded-lg focus:ring-primary-light focus:border-primary-light block w-full p-2.5" />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-neutral-black">Valor</label>
                <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-neutral-white border border-gray-300 text-neutral-black text-sm rounded-lg focus:ring-primary-light focus:border-primary-light block w-full p-2.5" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full text-neutral-white bg-primary-main hover:bg-primary-main/90 focus:ring-4 focus:outline-none focus:ring-primary-light/30 font-medium rounded-lg text-sm sm:text-base px-4 sm:px-5 py-2.5 text-center disabled:bg-gray-400 transition-colors">
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base bg-gray-50 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar
        </Link>
        <Link 
          to={`/order/${orderId}`}
          className="inline-flex items-center justify-center px-4 py-2 text-primary-light hover:text-primary-main font-medium transition-colors text-sm sm:text-base bg-blue-50 hover:bg-blue-100 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Ver Detalhes
        </Link>
      </div>
      
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

export default EditOrderPage;