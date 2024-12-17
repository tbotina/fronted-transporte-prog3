import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Direccion } from "../../models/direccion.module";

@Injectable({
  providedIn: "root",
})
export class DireccionService {
  constructor(private http: HttpClient) {}
  list(): Observable<Direccion[]> {
    return this.http
      .get<{ data: Direccion[] }>(
        `${environment.url_ms_negocio}/direcciones`
      )
      .pipe(map((response) => response.data));
  }
  view(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(
      `${environment.url_ms_negocio}/direcciones/${id}`
    );
  }
  create(newServicio: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(
      `${environment.url_ms_negocio}/direcciones`,newServicio
    );
  }
  update(theServicio: Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(
      `${environment.url_ms_negocio}/direcciones/${theServicio.id}`,theServicio
    );
  }
  delete(id: number) {
    return this.http.delete<Direccion>(
      `${environment.url_ms_negocio}/direcciones/${id}`
    );
  }
}
