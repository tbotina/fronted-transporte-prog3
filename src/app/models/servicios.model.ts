import { Hotel } from "./hotel.model"
import { Restaurante } from "./restaurante.model"

export class Servicios {
    id?:number
    descripcion:string
    estado_servicio:boolean
    hotel?:Hotel
    restaurante?:Restaurante
}
