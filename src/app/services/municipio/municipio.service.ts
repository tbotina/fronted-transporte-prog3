import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Municipio } from 'src/app/models/municipio.modelo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }

  list(id:number): Observable<Municipio[]> {
    return this.http.get< Municipio[]>(`${environment.url_ms_negocio}/municipios/${id}/departamentos`)
  }
}
