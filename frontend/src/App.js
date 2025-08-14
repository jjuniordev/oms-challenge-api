import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderDetailPage from './pages/OrderDetailPage';
import EditOrderPage from './pages/EditOrderPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-neutral-light text-neutral-black font-sans flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order/:orderId" element={<OrderDetailPage />} />
            <Route path="/order/:orderId/edit" element={<EditOrderPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;