import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Input({ label, error, success, className = '', ...props }) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== '');
    };

    const getBorderColor = () => {
        if (error) return 'border-red-500 focus:border-red-500 focus:ring-red-200';
        if (success) return 'border-green-500 focus:border-green-500 focus:ring-green-200';
        if (isFocused) return 'border-blue-500 focus:border-blue-500 focus:ring-blue-200';
        return 'border-slate-300 focus:border-blue-500 focus:ring-blue-200';
    };

    return (
        <div className="w-full relative">
            {label && (
                <motion.label
                    initial={false}
                    animate={{
                        top: isFocused || hasValue || props.value ? '0.5rem' : '1rem',
                        fontSize: isFocused || hasValue || props.value ? '0.75rem' : '1rem',
                        color: isFocused ? '#3b82f6' : error ? '#ef4444' : '#64748b'
                    }}
                    className="absolute left-3 bg-white px-1 pointer-events-none font-medium transition-all"
                >
                    {label}
                </motion.label>
            )}
            <div className="relative">
                <input
                    className={`w-full px-4 ${label ? 'pt-6 pb-2' : 'py-3'} border-2 rounded-lg transition-all duration-200 outline-none ${getBorderColor()} ${className}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {success && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"
                    >
                        ✓
                    </motion.div>
                )}
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                >
                    <span>⚠</span> {error}
                </motion.p>
            )}
        </div>
    );
}
