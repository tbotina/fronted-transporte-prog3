import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoConductorService {

  constructor(private http: HttpClient) { }

  create(id_vehiculo: number, id_conductor: number): Observable<string> {
    console.log("conductor_id: ", id_conductor);
    return this.http.post<string>(`${environment.url_ms_negocio}/vehiculoConductores`, { "vehiculo_id": id_vehiculo, "conductor_id": id_conductor });

  }

  delete(id_vehiculo: number): Observable<string> {
    return this.http.delete<string>(`${environment.url_ms_negocio}/vehiculoConductores/vehiculo/${id_vehiculo}`);
  }

}
