import { Injectable } from '@angular/core';

import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

import {AuthService} from '../../pages/login/auth.service';
import { Observable } from 'rxjs';
import {Grabacion} from '../../models/grabacion.model'
import { HashLocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GrabacionService {
 

status:string = '';

private httpHeaders = new  HttpHeaders({'Content-Type': 'application/json'});



  constructor(private http: HttpClient, private authService: AuthService) { }


  private  agregarAuthorizationHeaer(){
    let token =   this.authService.token;


     if( token != null){
       return this.httpHeaders.append('Authorization', 'Bearer ' + token);
     }

     return this.httpHeaders;

  }


  public grabacion(grabacion : Grabacion):Observable<any>{
   
   let urlEndpoint = 'http://3.14.155.2:6769/solictudGrabacion';
    return this.http.post<any>(urlEndpoint, grabacion,  { headers: this.agregarAuthorizationHeaer()}).pipe();
  }





  }