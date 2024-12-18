import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ruta } from '../../models/ruta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Ruta[]> {
    return this.http.get<{ data: Ruta[] }>(`${environment.url_ms_negocio}/rutas`).pipe(map((response) => response.data));
  }

  rutasVehiculos(id: any) {
    return this.http.get<{ data: Ruta[] }>(`${environment.url_ms_negocio}/rutas/${id}/vehiculos`).pipe(map((response) => response.data));
  }

  setRecorrido(id: number, rec: boolean): Observable<any> {
    return this.http.post(`${environment.url_ms_negocio}/rutas/${id}/recorrido`, {recorrido:rec});
  }

  view(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${environment.url_ms_negocio}/rutas/${id}`);
  }

  create(newRuta: Ruta): Observable<Ruta> {
    newRuta.contrato_id = Number(newRuta.contrato_id);
    newRuta.vehiculo_id = Number(newRuta.vehiculo_id);
    console.log('Desde el create de ruta.service.ts', newRuta);
    return this.http.post<Ruta>(`${environment.url_ms_negocio}/rutas`, newRuta);
  }

  update(TheRuta: Ruta): Observable<Ruta> {
    return this.http.put<Ruta>(`${environment.url_ms_negocio}/rutas/${TheRuta.id}`, TheRuta);
  }

  delete(id: number) {
    return this.http.delete<Ruta>(`${environment.url_ms_negocio}/rutas/${id}`);
  }
}
