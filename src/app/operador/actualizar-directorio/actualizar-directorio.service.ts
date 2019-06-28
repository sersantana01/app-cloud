import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDirectorioService {

  constructor(private http: HttpClient) { }

  public extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public getEstados(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getMunicipios(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getColonias(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public insertDirectorio(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoColoniaPorIdMunicipio(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }
}
