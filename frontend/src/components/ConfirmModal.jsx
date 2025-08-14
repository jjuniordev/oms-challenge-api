import React from 'react';
import Modal from './Modal';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-bold text-neutral-black mb-4">{title}</h3>
        <p className="text-neutral-black mb-6 text-sm sm:text-base">{message}</p>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors text-sm sm:text-base order-2 sm:order-1"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-neutral-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors text-sm sm:text-base order-1 sm:order-2"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
