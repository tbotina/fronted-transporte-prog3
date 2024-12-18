import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoDuenoService {

  constructor(private http: HttpClient) { }

  create(id_vehiculo: number, id_dueno: number): Observable<string> {
    console.log("dueno_id: ", id_dueno);
    return this.http.post<string>(`${environment.url_ms_negocio}/vehiculoDuenos`, { "vehiculo_id": id_vehiculo, "dueno_id": id_dueno });

  }

  delete(id_vehiculo: number): Observable<string> {
    return this.http.delete<string>(`${environment.url_ms_negocio}/vehiculoDuenos/vehiculo/${id_vehiculo}`);
  }

}
