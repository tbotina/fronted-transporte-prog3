import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Dirlistaorden } from "../models/dirlistaorden.module";

@Injectable({
  providedIn: "root",
})
export class DirlistaordenService {
  constructor(private http: HttpClient) {}
  list(): Observable<Dirlistaorden[]> {
    return this.http
      .get<{ data: Dirlistaorden[] }>(
        `${environment.url_ms_negocio}/Dirlistaordenes`
      )
      .pipe(map((response) => response.data));
  }
  view(id: number): Observable<Dirlistaorden> {
    return this.http.get<Dirlistaorden>(
      `${environment.url_ms_negocio}/dirlistaordenes/${id}`
    );
  }
  create(newServicio: Dirlistaorden): Observable<Dirlistaorden> {
    return this.http.post<Dirlistaorden>(
      `${environment.url_ms_negocio}/dirlistaordenes`,newServicio
    );
  }
  update(theServicio: Dirlistaorden): Observable<Dirlistaorden> {
    return this.http.put<Dirlistaorden>(
      `${environment.url_ms_negocio}/dirlistaordenes/${theServicio.id}`,theServicio
    );
  }
  delete(id: number) {
    return this.http.delete<Dirlistaorden>(
      `${environment.url_ms_negocio}/dirlistaordenes/${id}`
    );
  }
}
