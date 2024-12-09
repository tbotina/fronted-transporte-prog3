import { Vehiculo } from "./vehiculo.model";

export class Conductor {
    id?: number;
    nombre: string;
    email: string;
    fecha_nacimiento: string;
    cedula: string;
    security_id?: string;
    vehiculo?: Vehiculo;
    turno?: string;
}
