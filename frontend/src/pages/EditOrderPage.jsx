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

  if (loading) return <p className="text-center text-xl text-neutral-black">Carregando formulário de edição...</p>;
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-neutral-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-neutral-black mb-4">Editar Pedido</h1>
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
            <button type="submit" disabled={isSubmitting} className="w-full text-neutral-white bg-primary-main hover:bg-primary-main/90 focus:ring-4 focus:outline-none focus:ring-primary-light/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400 transition-colors">
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="text-primary-light hover:text-primary-main font-medium transition-colors">
          &larr; Cancelar e voltar
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