import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Vehiculo } from "src/app/models/vehiculo.model";

@Injectable({
  providedIn: "root",
})
export class VehiculoService {
  constructor(private http: HttpClient) {}
  
  list(): Observable<Vehiculo[]> {
    return this.http
      .get<{ data: Vehiculo[] }>(
        `${environment.url_ms_negocio}/vehiculos`
      )
      .pipe(map((response) => response.data));
  }

  vehiculosDuenos(id: number): Observable<Vehiculo[]> {
    return this.http
      .get<{ data: Vehiculo[] }>(
        `${environment.url_ms_negocio}/vehiculos/${id}/duenos`
      )
      .pipe(map((response) => response.data));
  }

  vehiculosConductores(id: number): Observable<Vehiculo[]> {
    return this.http
      .get<{ data: Vehiculo[] }>(
        `${environment.url_ms_negocio}/vehiculos/${id}/conductores`
      )
      .pipe(map((response) => response.data));
  }

  vehiculosContratos(id: number): Observable<Vehiculo[]> {
    return this.http
      .get<{ data: Vehiculo[] }>(
        `${environment.url_ms_negocio}/vehiculos/${id}/contratos`
      )
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(
      `${environment.url_ms_negocio}/vehiculos/${id}`
    );
  }
  create(nuevoVehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(
      `${environment.url_ms_negocio}/vehiculos`,nuevoVehiculo
    );
  }
  update(elVehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(
      `${environment.url_ms_negocio}/vehiculos/${elVehiculo.id}`,elVehiculo
    );
  }
  delete(id: number) {
    return this.http.delete<Vehiculo>(
      `${environment.url_ms_negocio}/vehiculos/${id}`
    );
  }
}
