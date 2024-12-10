import { Vehiculo } from "./vehiculo.model";

export class Dueno {
    id?: number;
    nombre: string;
    email: string;
    fecha_nacimiento: string;
    cedula: string;
    security_id?: string;
    vehiculos?: Vehiculo[];
}
