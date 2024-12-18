import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '../models/lote.model';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private http: HttpClient) { }
  
  list(): Observable <Lote[]>{
    return this.http.get<{data: Lote[]}>(`${environment.url_ms_negocio}/lotes`).pipe(map((response) => response.data));
  }

  view(id: number): Observable<Lote> {
    return this.http.get<Lote>(`${environment.url_ms_negocio}/lotes/${id}`);
  }

  create(newLote: Lote): Observable<Lote> {
    console.log(newLote);
    return this.http.post<Lote>(`${environment.url_ms_negocio}/lotes`, newLote);
  }

  update(TheLote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${environment.url_ms_negocio}/lotes/${TheLote.id}`, TheLote);
  }

  delete(id: number) {
    return this.http.delete<Lote>(`${environment.url_ms_negocio}/lotes/${id}`);
  }

  
 lotesRutas(id: number): Observable<Lote[]> {
      return this.http
        .get<{ data: Lote[] }>(
          `${environment.url_ms_negocio}/lotes/${id}/rutas`
        )
        .pipe(map((response) => response.data));
    }
  
lotesDirlistaOrden(id: number): Observable<Lote[]> {
      return this.http
        .get<{ data: Lote[] }>(
          `${environment.url_ms_negocio}/Lotes/${id}/dirlistar`
        )
        .pipe(map((response) => response.data));
    }
  
lotesProductos(id: number): Observable<Lote[]> {
      return this.http
        .get<{ data: Lote[] }>(
          `${environment.url_ms_negocio}/Lotess/${id}/ptoductos`
        )
        .pipe(map((response) => response.data));
    }

}
