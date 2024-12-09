import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirListaOrden } from '../models/dir-lista-orden.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirListaOrdenService {

  constructor(private http:HttpClient) { }

  list(): Observable <DirListaOrden[]>{
    return this.http.get<DirListaOrden[]>(`${environment.url_ms_negocio}/dir-lista-ordenes`);
  }

  delete(id: number) {
    return this.http.delete<DirListaOrden>(`${environment.url_ms_negocio}/dir-lista-ordenes/${id}`);
  }
}
