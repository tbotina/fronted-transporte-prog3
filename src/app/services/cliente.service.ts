import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  list(): Observable<Cliente[]> {
    return this.http
      .get<{ data: Cliente[] }>(
        `${environment.url_ms_negocio}/Clientes`
      )
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.url_ms_negocio}/clientes/${id}`);
  }

  create(newCliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.url_ms_negocio}/clientes`, newCliente);
  }

  update(TheCliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.url_ms_negocio}/clientes/${TheCliente.id}`, TheCliente);
  }
  
  delete(id: number) {
    return this.http.delete<Cliente>(`${environment.url_ms_negocio}/clientes/${id}`);
  }
}

