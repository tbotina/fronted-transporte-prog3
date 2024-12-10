import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DirListaOrden } from '../models/dir-lista-orden.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirListaOrdenService {

  constructor(private http: HttpClient) { }
  list(): Observable<DirListaOrden[]> {
    return this.http.get<{ data: DirListaOrden[] }>(`${environment.url_ms_negocio}/DirListaOrdenes`)
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<DirListaOrden> {
    return this.http.get<DirListaOrden>(
      `${environment.url_ms_negocio}/dirlistaordenes/${id}`
    );
  }

  create(newServicio: DirListaOrden): Observable<DirListaOrden> {

    return this.http.post<DirListaOrden>(
      `${environment.url_ms_negocio}/dirlistaordenes`, newServicio
    );
  }

  update(theServicio: DirListaOrden): Observable<DirListaOrden> {
    return this.http.put<DirListaOrden>(
      `${environment.url_ms_negocio}/dirlistaordenes/${theServicio.id}`, theServicio
    );
  }

  delete(id: number) {
    return this.http.delete<DirListaOrden>(
      `${environment.url_ms_negocio}/dirlistaordenes/${id}`
    );
  }
}
