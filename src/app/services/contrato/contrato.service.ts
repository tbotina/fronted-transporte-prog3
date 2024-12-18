import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Contrato } from "src/app/models/contrato.model";

@Injectable({
  providedIn: "root",
})
export class ContratoService {
  constructor(private http: HttpClient) {}
  
  list(): Observable<Contrato[]> {
    return this.http
      .get<{ data: Contrato[] }>(
        `${environment.url_ms_negocio}/contratos`
      )
      .pipe(map((response) => response.data));
  }
  view(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(
      `${environment.url_ms_negocio}/contratos/${id}`
    );
  }
  create(nuevoContrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(
      `${environment.url_ms_negocio}/contratos`,nuevoContrato
    );
  }
  update(elContrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(
      `${environment.url_ms_negocio}/contratos/${elContrato.id}`,elContrato
    );
  }
  delete(id: number) {
    return this.http.delete<Contrato>(
      `${environment.url_ms_negocio}/contratos/${id}`
    );
  }
  
}
