import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Dueno } from "src/app/models/dueno.model";

@Injectable({
  providedIn: "root",
})
export class DuenoService {
  constructor(private http: HttpClient) {}

  list(): Observable<Dueno[]> {
    return this.http
      .get<{ data: Dueno[] }>(
        `${environment.url_ms_negocio}/duenos`
      )
      .pipe(map((response) => response.data));
  }

  duenosVehiculos(id: number): Observable<Dueno[]> {  
    return this.http
      .get<{ data: Dueno[] }>(
        `${environment.url_ms_negocio}/duenos/${id}/vehiculos`
      )
      .pipe(map((response) => response.data));
  }

  view(id: number): Observable<Dueno> {
    return this.http.get<Dueno>(
      `${environment.url_ms_negocio}/duenos/${id}`
    );
  }
  create(nuevoDueno: Dueno): Observable<Dueno> {
    return this.http.post<Dueno>(
      `${environment.url_ms_negocio}/duenos`,nuevoDueno
    );
  }
  update(elDueno: Dueno): Observable<Dueno> {
    return this.http.put<Dueno>(
      `${environment.url_ms_negocio}/duenos/${elDueno.id}`,elDueno
    );
  }
  delete(id: number) {
    return this.http.delete<Dueno>(
      `${environment.url_ms_negocio}/duenos/${id}`
    );
  }
}
