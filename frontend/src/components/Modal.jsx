import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-screen overflow-y-auto relative z-50">
        {children}
      </div>
    </div>
  );
}

export default Modal;
