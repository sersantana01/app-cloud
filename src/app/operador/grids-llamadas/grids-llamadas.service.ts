import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GridsLlamadasService {
    constructor(private http: HttpClient) {}

    public getLlamadasAtendidas(url: string, data: any): Observable<any> {
        return this.http.post(url, data);
    }
    public getLlamadasActivas(url: string, data: any): Observable<any> {
        return this.http.post(url, data);
    }
}
