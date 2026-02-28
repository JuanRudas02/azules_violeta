import { User } from '../entities/User';

export const validateInvoice = async (invoiceId: string, userId: string): Promise<boolean> => {
    // En un entorno real, aquí iría la llamada al servicio/API
    console.log(`Validating invoice ${invoiceId} for user ${userId}`);

    // Simulación de lógica de negocio pura
    if (!invoiceId.startsWith('FAC-')) {
        throw new Error('Formato de factura inválido');
    }

    return true;
};
