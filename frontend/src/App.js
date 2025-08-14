import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderDetailPage from './pages/OrderDetailPage';
import EditOrderPage from './pages/EditOrderPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order/:orderId" element={<OrderDetailPage />} />
          <Route path="/order/:orderId/edit" element={<EditOrderPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;