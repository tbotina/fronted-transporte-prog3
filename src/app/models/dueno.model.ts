import { Vehiculo } from "./vehiculo.model";

export class Dueno {
    id?: number;
    nombre: string;
    //email: string;
    fecha_nacimiento: Date;
    cedula: string;
    security_id?: string;
    vehiculos?: Vehiculo[];
}
