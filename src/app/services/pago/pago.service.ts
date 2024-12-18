import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from 'src/app/models/factura.modelo';
import { Pago } from 'src/app/models/pago.modelo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http:HttpClient) { }

  create(pago: Pago): Observable<Factura> {
    console.log(pago)
    return this.http.post<Factura>(`${environment.url_ms_negocio}/pagar`, pago);
  }
}
