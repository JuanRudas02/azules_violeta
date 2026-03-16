"use client";

import { useState } from 'react';
import { Upload, CheckCircle2, Loader2, DollarSign, FileImage } from 'lucide-react';

export const InvoiceForm = () => {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [amountSpent, setAmountSpent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;
        setFile(f);
        if (f) setPreview(URL.createObjectURL(f));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !amountSpent) return;
        setStatus('uploading');
        setErrorMsg('');

        try {
            const token = localStorage.getItem('auth_token');
            const formData = new FormData();
            formData.append('invoice', file);
            formData.append('amountSpent', amountSpent.replace(/\D/g, ''));
            if (invoiceNumber) formData.append('invoiceNumber', invoiceNumber);

            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (res.ok) {
                setStatus('success');
            } else {
                const data = await res.json();
                setErrorMsg(data.message || 'Error al subir la factura');
                setStatus('error');
            }
        } catch {
            setErrorMsg('Error de conexión. Intenta de nuevo.');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl flex flex-col items-center text-center">
                <CheckCircle2 className="text-green-500 w-12 h-12 mb-2" />
                <h3 className="font-bold text-green-900">¡Factura Recibida!</h3>
                <p className="text-sm text-green-700">Estamos validando tus datos. Recibirás tus puntos en máximo 24h.</p>
                <button
                    onClick={() => {
                        setStatus('idle');
                        setFile(null);
                        setPreview(null);
                        setInvoiceNumber('');
                        setAmountSpent('');
                    }}
                    className="mt-4 text-sm font-bold text-green-600 hover:underline"
                >
                    Subir otra factura
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-sm text-rose-700 font-medium">
                    {errorMsg}
                </div>
            )}

            <div>
                <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">Número de Factura (opcional)</label>
                <input
                    type="text"
                    value={invoiceNumber}
                    onChange={e => setInvoiceNumber(e.target.value)}
                    placeholder="Ej: FAC-12345"
                    className="input-field"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-makeup-brown mb-2 ml-1">
                    Valor Total <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        required
                        type="text"
                        value={amountSpent}
                        onChange={e => setAmountSpent(e.target.value)}
                        placeholder="Ej: 150000"
                        className="input-field pl-10"
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Ganarás 1 punto por cada $1.000 pesos.</p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Foto de la Factura <span className="text-rose-500">*</span>
                </label>
                {preview ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                        <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                        <button
                            type="button"
                            onClick={() => { setFile(null); setPreview(null); }}
                            className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-violet-50 hover:border-primary/30 transition-all cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            required
                            onChange={handleFileChange}
                        />
                        <FileImage className="text-gray-400 mb-2" size={32} />
                        <span className="text-sm text-gray-500 font-medium">Pulsa para subir o arrastra</span>
                        <span className="text-[10px] text-gray-400 mt-1">JPG, PNG, WEBP hasta 10MB</span>
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={status === 'uploading'}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {status === 'uploading' ? (
                    <>
                        <Loader2 className="animate-spin" size={18} />
                        Subiendo factura...
                    </>
                ) : (
                    <>
                        <Upload size={18} />
                        Subir y Sumar Puntos
                    </>
                )}
            </button>
        </form>
    );
};
