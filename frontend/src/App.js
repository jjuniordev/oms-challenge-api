import OrderList from './components/OrderList';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Sistema de Gestão de Pedidos
        </h1>
      </header>
      <main>
        <OrderList />
      </main>
    </div>
  );
}

export default App;