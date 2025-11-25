import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false, ...props }) {
    return (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" } : {}}
            className={`card p-6 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
