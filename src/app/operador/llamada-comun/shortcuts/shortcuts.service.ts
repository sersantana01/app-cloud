import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShortcutsService {
    constructor(private http: HttpClient) {}

    public getLlamadaComun(url: string, data: any): Observable<any> {
        return this.http.post(url, data);
    }

    public setLlamadaComun(url: string, data: any): Observable<any> {
        return this.http.post(url, data);
    }
}