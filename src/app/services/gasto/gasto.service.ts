import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Gasto } from 'src/app/models/gasto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Gasto[]> {
    return this.http.get<{ data: Gasto[] }>(`${environment.url_ms_negocio}/gastos`).pipe(map(response => response.data));
  }

  view(id: number): Observable<Gasto> {
    return this.http.get<Gasto>(`${environment.url_ms_negocio}/gastos/${id}`);
  }

  create(newGasto: Gasto): Observable<Gasto> {
    return this.http.post<Gasto>(`${environment.url_ms_negocio}/gastos`, newGasto);
  }

  update(theGasto: Gasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${environment.url_ms_negocio}/gastos/${theGasto.id}`, theGasto);
  }

  delete(id: number) {
    return this.http.delete<Gasto>(`${environment.url_ms_negocio}/gastos/${id}`);
  }

  serviciosDuenos(id: number): Observable<Gasto[]> {
    return this.http.get<{ data: Gasto[] }>(`${environment.url_ms_negocio}/gastos/${id}/duenos`).pipe(map(response => response.data));
  }

  serviciosConductores(id: number): Observable<Gasto[]> {
    return this.http.get<{ data: Gasto[] }>(`${environment.url_ms_negocio}/gastos/${id}/conductores`).pipe(map(response => response.data));
  }
}
