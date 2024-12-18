import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Departamentos } from '../models/departamentos.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(private http: HttpClient) {   }
  list(): Observable<Departamentos[]> {
    return this.http.get<{ data: Departamentos[] }>(`${environment.url_ms_negocio}/departamentos`) .pipe(
    map(response => response.data)
  );
  }
  
  view(id:number): Observable<Departamentos>{
    return this.http.get< Departamentos >(`${environment.url_ms_negocio}/departamentos/${id}`) ;
   }
   create(newDepartamento: Departamentos):Observable<Departamentos>{
    return this.http.post<Departamentos>(`${environment.url_ms_negocio}/departamentos` ,newDepartamento);
   }
   update(TheDepartamento: Departamentos):Observable<Departamentos>{
    return this.http.put<Departamentos>(`${environment.url_ms_negocio}/departamentos/${TheDepartamento.id}`,TheDepartamento );
   }
  delete(id:number){
    return this.http.delete<Departamentos>(`${environment.url_ms_negocio}/departamentos/${id}` );
  }
}
