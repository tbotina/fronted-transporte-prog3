import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  list(): Observable<Producto[]> {
    return this.http
      .get<{ data: Producto[] }>(
        `${environment.url_ms_negocio}/productos`
      )
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${environment.url_ms_negocio}/productos/${id}`);
  }

  create(newProducto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${environment.url_ms_negocio}/productos`, newProducto);
  }

  update(TheProducto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${environment.url_ms_negocio}/productos/${TheProducto.id}`, TheProducto);
  }
  
  delete(id: number) {
    return this.http.delete<Producto>(`${environment.url_ms_negocio}/productos/${id}`);
  }
}
