import { Injectable } from '@angular/core';
import { Administrador } from '../models/administrador';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) {   }
  list(): Observable<Administrador[]> {
    return this.http.get< Administrador[] >(`${environment.url_ms_negocio}/administradores`) 
  
  }
  
  view(_id:string): Observable<Administrador>{
    return this.http.get< Administrador >(`${environment.url_ms_negocio}/administradores/${_id}`) ;
   }
   create(newAdministrador: Administrador):Observable<Administrador>{
    return this.http.post<Administrador>(`${environment.url_ms_negocio}/administradores` ,newAdministrador);
   }
   update(TheAdministrador: Administrador):Observable<Administrador>{

    return this.http.put<Administrador>(`${environment.url_ms_negocio}/administradores/${TheAdministrador._id}`,TheAdministrador );
   }
  delete(_id:string){

    return this.http.delete<Administrador>(`${environment.url_ms_negocio}/administradores/${_id}` );
  }
}
