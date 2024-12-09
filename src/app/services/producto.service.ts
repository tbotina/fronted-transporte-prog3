import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  list(): Observable <Producto[]>{
    return this.http.get<Producto[]>(`${environment.url_ms_negocio}/productos`);
  }
  
  delete(id: number) {
    return this.http.delete<Producto>(`${environment.url_ms_negocio}/productos/${id}`);
  }
}
