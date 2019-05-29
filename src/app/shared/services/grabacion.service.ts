import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrabacionService {

status:string = '';

  constructor(private http: HttpClient) { }

  grabarAuronix(pre, fActual, accion) {
    this.http
      .post('http://3.14.155.2:6769/grabarAuronix', {
        prefolio: pre,
        fechaGrabacion: fActual,
        accion: accion,
        ipOperador: '102.22.1.11'
      })
      .subscribe(data => {

        this.status = data['estatus'];
      
      });

      
      return this.status;
    }
  }