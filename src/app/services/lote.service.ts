import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '../models/lote.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private http: HttpClient) { }
  
  list(): Observable <Lote[]>{
    return this.http.get<Lote[]>(`${environment.url_ms_negocio}/lotes`);
  }

  delete(id: number) {
    return this.http.delete<Lote>(`${environment.url_ms_negocio}/lotes/${id}`);
  }
}
