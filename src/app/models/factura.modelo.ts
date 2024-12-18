import { Cuota } from "./cuota.model";
import { Gasto } from "./gasto.model";

export class Factura {
    id: number;            // ID principal
    fecha_pago: string;      // Fecha de pago
    valor: number;         // Valor de la factura
    bill: string;          // Número o referencia de la factura
    success: boolean;      // Estado de éxito del pago
    cuota_id: number;      // ID de la cuota asociada
    cuota?: Cuota;         // Relación con Cuota (opcional)
    gasto?: Gasto;         // Relación con Gasto (opcional)
}