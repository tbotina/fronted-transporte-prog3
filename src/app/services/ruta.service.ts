import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruta } from '../models/ruta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Ruta[]>{
    return this.http.get<Ruta[]>(`${environment.url_ms_negocio}/rutas`);
  }

  delete(id: number) {
    return this.http.delete<Ruta>(`${environment.url_ms_negocio}/rutas/${id}`);
  }
}
