import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cuota } from 'src/app/models/cuota.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Cuota[]> {
    return this.http.get<{data: Cuota[]}>(`${environment.url_ms_negocio}/cuotas`).pipe(map((response) => response.data));
  }

  view(id: number): Observable<Cuota> {
    return this.http.get<Cuota>(`${environment.url_ms_negocio}/cuotas/${id}`);
  }

  create(nuevaCuota: Cuota): Observable<Cuota> {
    return this.http.post<Cuota>(`${environment.url_ms_negocio}/cuotas`, nuevaCuota);
  }

  update(laCuota: Cuota): Observable<Cuota> {
    return this.http.put<Cuota>(`${environment.url_ms_negocio}/cuotas/${laCuota.id}`, laCuota);
  }

  delete(id: number) {
    return this.http.delete(`${environment.url_ms_negocio}/cuotas/${id}`);
  }
}
