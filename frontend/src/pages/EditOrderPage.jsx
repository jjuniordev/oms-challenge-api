import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderById, updateOrder } from '../services/api';

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
      navigate('/');
    } catch (err) {
      setError('Falha ao atualizar o pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-xl">Carregando formulário de edição...</p>;
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Editar Pedido</h1>
        <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-4">
              <div>
                <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-300">Nome do Cliente</label>
                <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" />
              </div>
              <div>
                <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-300">Produto</label>
                <input type="text" id="product" name="product" value={formData.product} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" />
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">Valor</label>
                <input type="number" step="0.01" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-500">
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300 font-medium">
          &larr; Cancelar e voltar
        </Link>
      </div>
    </div>
  );
}

export default EditOrderPage;