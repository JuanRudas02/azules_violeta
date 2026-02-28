"use client";

import { useState } from 'react';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';

export const InvoiceForm = () => {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('uploading');
        setTimeout(() => setStatus('success'), 2000);
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl flex flex-col items-center text-center">
                <CheckCircle2 className="text-green-500 w-12 h-12 mb-2" />
                <h3 className="font-bold text-green-900">¡Factura Recibida!</h3>
                <p className="text-sm text-green-700">Estamos validando tus datos. Recibirás tus puntos en máximo 24h.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm font-bold text-green-600 hover:underline"
                >
                    Subir otra factura
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Número de Factura</label>
                    <input
                        required
                        type="text"
                        placeholder="Ej: FAC-12345"
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Foto de la Factura</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-violet-50 hover:border-primary/30 transition-all cursor-pointer">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" required />
                        <Upload className="text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500 font-medium">Pulsa para subir o arrastra</span>
                    </div>
                </div>
            </div>

            <button
                disabled={status === 'uploading'}
                className="w-full btn-primary flex items-center justify-center gap-2"
            >
                {status === 'uploading' ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Validando...
                    </>
                ) : (
                    'Subir y Sumar Puntos'
                )}
            </button>
        </form>
    );
};
