import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-800',
    secondary: 'bg-sky-500 text-white hover:bg-sky-600',
    outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-600 hover:bg-slate-100',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    ...props
}) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`
        btn inline-flex items-center justify-center gap-2 
        ${variants[variant]} 
        ${sizes[size]} 
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
            disabled={isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </motion.button>
    );
}
