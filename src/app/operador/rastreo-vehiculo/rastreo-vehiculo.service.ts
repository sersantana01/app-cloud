import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RastreoVehiculoService {

  constructor(private http: HttpClient) { }

  extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getCatalogoMotivo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  getCatalogoTipoVehiculo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  getCatalogoMarca(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  getCatalogoColorVehiculo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  getCatalogoTipoRastreo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  getCatalogoModeloPorIdModelo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  getCatalogoModeloPorNombre(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  busquedaRastreoVehiculo(url: string, data: any): Observable<any> {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  deleteVehiculo(url: string, data: any) {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

  actualizarVehiculo(url: string, data: any) {
    return this.http.post(url, data).pipe(
      map(this.extractData)
    );
  }

}
