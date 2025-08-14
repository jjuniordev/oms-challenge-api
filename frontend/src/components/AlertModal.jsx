import React from 'react';
import Modal from './Modal';

function AlertModal({ isOpen, onClose, title, message, type = "info" }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-primary-main bg-blue-50 border-blue-200';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-6">
        <div className={`p-4 rounded-lg border mb-4 ${getTypeStyles()}`}>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm sm:text-base">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 text-neutral-white bg-primary-main hover:bg-primary-main/90 rounded-lg font-medium transition-colors text-sm sm:text-base"
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AlertModal;
