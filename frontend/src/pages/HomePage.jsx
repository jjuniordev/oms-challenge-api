import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getOrders, deleteOrder } from '../services/api';
import OrderList from '../components/OrderList';
import CreateOrderForm from '../components/CreateOrderForm';
import ConfirmModal from '../components/ConfirmModal';
import AlertModal from '../components/AlertModal';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { toast } from 'react-toastify';

function HomePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, orderId: null });
  const [alertModal, setAlertModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });
  const connectionRef = useRef(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError('Falha ao carregar os pedidos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (!connectionRef.current) {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:8080/notificationHub")
        .configureLogging(LogLevel.Information)
        .build();

      connectionRef.current = connection;

      const handleOrderStatusUpdate = (updatedOrder) => {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
        toast.info(`O pedido de "${updatedOrder.customerName}" foi atualizado para: ${updatedOrder.status}`);
      };

      connection.on("ReceiveOrderStatusUpdate", handleOrderStatusUpdate);

      async function startConnection() {
        try {
          await connection.start();
          console.log("Conectado ao SignalR!");
        } catch (err) {
          console.error("Falha ao conectar ao SignalR: ", err);
          setTimeout(startConnection, 5000);
        }
      }

      startConnection();
    }
    
    return () => {
      if (connectionRef.current && connectionRef.current.state === 'Connected') {
        connectionRef.current.stop()
          .then(() => console.log("Conexão SignalR parada."))
          .catch(err => console.error("Erro ao parar SignalR: ", err));
      }
    };
  }, []);

  const handleDeleteOrder = async (id) => {
    setConfirmModal({ isOpen: true, orderId: id });
  };

  const confirmDelete = async () => {
    try {
      await deleteOrder(confirmModal.orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== confirmModal.orderId));
      setAlertModal({
        isOpen: true,
        title: 'Sucesso',
        message: 'Pedido excluído com sucesso!',
        type: 'success'
      });
    } catch (err) {
      setAlertModal({
        isOpen: true,
        title: 'Erro',
        message: 'Falha ao excluir o pedido. Tente novamente.',
        type: 'error'
      });
    } finally {
      setConfirmModal({ isOpen: false, orderId: null });
    }
  };
      
  return (
    <>
      <main>
        <CreateOrderForm onOrderCreated={fetchOrders} />
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-black px-4 sm:px-0">Pedidos Recentes</h2>
          <OrderList orders={orders} loading={loading} error={error} onDelete={handleDeleteOrder} />
        </div>
      </main>
      
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, orderId: null })}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
      />
      
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ isOpen: false, title: '', message: '', type: 'info' })}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </>
  );
}

export default HomePage;