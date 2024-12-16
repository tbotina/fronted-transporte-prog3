import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Conductor } from "src/app/models/conductor.model";

@Injectable({
  providedIn: "root",
})
export class ConductorService {
  constructor(private http: HttpClient) {}
  list(): Observable<Conductor[]> {
    return this.http
      .get<{ data: Conductor[] }>(
        `${environment.url_ms_negocio}/conductores`
      )
      .pipe(map((response) => response.data));
  }

  conductoresVehiculos(id: number): Observable<Conductor[]> {
    return this.http
      .get<{ data: Conductor[] }>(
        `${environment.url_ms_negocio}/conductores/${id}/vehiculos`
      )
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<Conductor> {
    return this.http.get<Conductor>(
      `${environment.url_ms_negocio}/conductores/${id}`
    );
  }
  create(nuevoConductor: Conductor): Observable<Conductor> {
    return this.http.post<Conductor>(
      `${environment.url_ms_negocio}/conductores`,nuevoConductor
    );
  }
  update(elConductor: Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(
      `${environment.url_ms_negocio}/conductores/${elConductor.id}`,elConductor
    );
  }
  delete(id: number) {
    return this.http.delete<Conductor>(
      `${environment.url_ms_negocio}/conductores/${id}`
    );
  }
}
