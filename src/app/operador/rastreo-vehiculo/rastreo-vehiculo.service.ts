import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RastreoVehiculoService {

  constructor(private http: HttpClient) { }

  public extractData(res: Response) {
    let body = res;
    return body || { };
  }

  public getCatalogoMotivo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoTipoVehiculo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoMarca(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoColorVehiculo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoTipoRastreo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoModeloPorIdModelo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  public getCatalogoModeloPorNombre(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

}
