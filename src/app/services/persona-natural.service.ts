import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PersonaNatural } from '../models/persona-natural.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {

  constructor(private http:HttpClient) { }

  list(): Observable<PersonaNatural[]> {
    return this.http
      .get<{ data: PersonaNatural[] }>(
        `${environment.url_ms_negocio}/PersonaNaturals`
      )
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<PersonaNatural> {
    return this.http.get<PersonaNatural>(`${environment.url_ms_negocio}/clientes/${id}`);
  }

  create(newPersonaNatural: PersonaNatural): Observable<PersonaNatural> {
    return this.http.post<PersonaNatural>(`${environment.url_ms_negocio}/clientes`, newPersonaNatural);
  }

  update(ThePersonaNatural: PersonaNatural): Observable<PersonaNatural> {
    return this.http.put<PersonaNatural>(`${environment.url_ms_negocio}/clientes/${ThePersonaNatural._id}`, ThePersonaNatural);
  }
  
  delete(id: number) {
    return this.http.delete<PersonaNatural>(`${environment.url_ms_negocio}/clientes/${id}`);
  }
}

