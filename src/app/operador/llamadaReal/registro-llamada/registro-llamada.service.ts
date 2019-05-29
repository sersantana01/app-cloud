import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroLlamadaService {
  constructor(private http: HttpClient) { }

  public extractData(res: Response) {
    let body = res;
    return body || { };
  }
 
  public sendCall(json: any, endpoint: string) {
    return this.http.post(endpoint, json).pipe(
      map(this.extractData)
    );
  }
 }
 