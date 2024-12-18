import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtempService {

  constructor( private http: HttpClient) { }

  setAtemp(): Observable<string> {
      return this.http.post<string>(
        `https://3f4a-2803-1800-4010-f45e-bd3c-4a4f-d6e3-aa5f.ngrok-free.app/update/fbc`,{});
    }
}
