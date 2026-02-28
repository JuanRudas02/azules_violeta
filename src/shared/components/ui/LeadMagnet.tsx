"use client";

import { motion } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import { useState } from 'react';

export const LeadMagnet = () => {
    const [show, setShow] = useState(true);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
            <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-accent relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                    <button onClick={() => setShow(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-full text-gold-deep">
                        <Gift size={32} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-primary">¡Regalo de Bienvenida!</h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Únete al <span className="font-bold text-primary">Club Violeta</span> y recibe una guía gratuita de cuidado de piel + <span className="text-gold-deep font-bold">500 puntos</span> para tu primer labial.
                        </p>
                        <button
                            onClick={() => setShow(false)}
                            className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Reclamar mi regalo
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
