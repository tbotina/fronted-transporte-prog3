import { Injectable } from "@angular/core";
import { Servicios } from "../models/servicios";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ServiciosService {
  constructor(private http: HttpClient) {}
  list(): Observable<Servicios[]> {
    return this.http
      .get<{ data: Servicios[] }>(
        `${environment.url_ms_negocio}/servicios`
      )
      .pipe(map((response) => response.data));
  }
  view(id: number): Observable<Servicios> {
    return this.http.get<Servicios>(
      `${environment.url_ms_negocio}/servicios/${id}`
    );
  }
  create(newServicio: Servicios): Observable<Servicios> {
    return this.http.post<Servicios>(
      `${environment.url_ms_negocio}/servicios`,newServicio
    );
  }
  update(theServicio: Servicios): Observable<Servicios> {
    return this.http.put<Servicios>(
      `${environment.url_ms_negocio}/servicios/${theServicio.id}`,theServicio
    );
  }
  delete(id: number) {
    return this.http.delete<Servicios>(
      `${environment.url_ms_negocio}/servicios/${id}`
    );
  }
}
