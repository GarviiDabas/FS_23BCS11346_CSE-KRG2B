// src/components/common/Button.jsx
import React from 'react';

/**
 * Reusable Button Component.
 * @param {string} type - 'primary', 'secondary', 'danger', 'admin'
 * @param {boolean} disabled - If the button should be disabled
 * @param {function} onClick - Click handler function
 * @param {string} children - The button text/content
 */
const Button = ({ 
  type = 'primary', 
  disabled = false, 
  onClick, 
  children,
  className = ''
}) => {
  let baseStyles = "px-4 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  let typeStyles = '';

  switch (type) {
    case 'primary':
      // Style for Call to Action: Join Queue (Module 1)
      typeStyles = 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-500';
      break;
    case 'secondary':
      // Style for less emphasized actions: Home link, Skip Token (Module 2)
      typeStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500';
      break;
    case 'danger':
      // Style for destructive actions: Cancel Token (Module 2, 5)
      typeStyles = 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500';
      break;
    case 'admin':
      // Style for core admin actions: Serve Token (Module 5)
      typeStyles = 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
      break;
    default:
      typeStyles = 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400';
  }

  // Handle disabled state styling
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';

  return (
    <button
      className={`${baseStyles} ${typeStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;