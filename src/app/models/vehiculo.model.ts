import { Conductor } from "./conductor.model";
import { Dueño } from "./dueño.model";
import { Ruta } from "./ruta.model";

export class Vehiculo {
    id?: number;
    placa:string;
    tipo_vehiculo: string;
    municipio_id?: number;
    municipio?: string;
    dueño?: Dueño;
    conductor?: Conductor;
    ruta?: Ruta;
}
