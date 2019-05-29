import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _usuario : Usuario;
   _token : string;

  constructor(private http : HttpClient) {

   }

   public  estaAutentificado():boolean{
    let payload = this.obtenerDatosPlayLoad(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
   }

   public get getUsuario(): Usuario{

    if(this._usuario != null ){
      return this._usuario;
    }else if (this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario=JSON.parse( sessionStorage.getItem('usuario')) as Usuario ;
      return this._usuario;
    }else{
      return new Usuario;
    }
   }


   public get token():string {

     if(this._token !=null){
        return this._token;
     }else if(this._token == null && sessionStorage.getItem('token') != null){
        this._token=sessionStorage.getItem('token');
        return this._token;

     }else {
        return null;
     }
   }





    public loginORDS(usuario: Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:9595/oauth/token';
    const credenciales = btoa( 'angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    params.set('uuid', usuario.uudi );

    console.log(params.toString());


   return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });

  }

  guardarUsuario(accesToken : string):void{

      let jsonPlayLoad= this.obtenerDatosPlayLoad(accesToken);
      this._usuario=new Usuario();
      this._usuario.apellido=jsonPlayLoad.apellido;
      this._usuario.email=jsonPlayLoad.email;
      this._usuario.nombre=jsonPlayLoad.nombre;
      this._usuario.username =jsonPlayLoad.user_name;
      this._usuario.roles=jsonPlayLoad.authorities;

      sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

      this._token=  this.obtenerDatosPlayLoad(accesToken)

  }
  guardarToken(accesToken: string){

    sessionStorage.setItem('token', accesToken);


  }

  obtenerDatosPlayLoad(accesToken:string ):any{
    if(accesToken != null ){
      return JSON.parse(atob((accesToken.split(".")[1]) ) ) ;
    }
  }
}
