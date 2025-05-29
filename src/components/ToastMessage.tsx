import React, { useState } from 'react';

interface ToastMessageProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, type = 'info' }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    visible && (
      <div
        className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg ${typeStyles[type]} transition-opacity duration-300`}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button
            className="ml-4 text-white hover:text-gray-200"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default ToastMessage;
