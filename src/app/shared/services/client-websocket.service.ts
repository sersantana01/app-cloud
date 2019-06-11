import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {  Mensaje} from '../../models/mensaje';
import {DataSharedService } from './data-shared.service';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ClientWebsocketService  {

  private client: Client;
  conectado: boolean = false;
  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];

  constructor(private dataSharedService: DataSharedService) {


    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS("http://3.14.155.2:8095/websocket");


    }

    this.client.onConnect = (frame) => {
      console.log('Conectados: ' + this.client.connected + ' : ' + frame);
      this.conectado = true;
      this.client.subscribe('/socket/mensaje', e => {
        let mensaje: Mensaje = JSON.parse(e.body) as Mensaje;

        ///this.mensajes.push(mensaje);
        console.log("Entra nuevo mensaje:"+mensaje.x);

        if(mensaje.x!=null && mensaje.y!=null){
          this.dataSharedService.setUbicacionLlamada(mensaje.x, mensaje.y,"");/////////////PONER ZONA PATRULLAJE EN EL 3er parametro
 
        } 
      });
      //this.mensaje.tipo = 'NUEVO_USUARIO';
      //this.mensaje.idUsuario = '76';
      this.client.publish({destination: '/app/mensaje', body: JSON.stringify(this.mensaje)});
    }

    this.client.onDisconnect = (frame) => {
      console.log('desconectados: ' + !this.client.connected + ' : ' + frame);
      this.conectado = false;
    }

  
  }

  conectar(): void {
    this.client.activate();
  }

  desconectar(): void {
    this.client.deactivate();
  }
  //{"x":-99.1394111884755,"y":19.276889635948,"ZP":0,"idUsuario":76}
  enviarMensaje(): void {
    //this.mensaje.tipo = 'MENSAJE';

    this.client.publish({destination: '/app/mensaje', body: JSON.stringify(this.mensaje)});
    //this.mensaje.texto = '';

  }

  escribiendoEvento(): void {
    this.client.publish({ destination: '/app/escribiendo', body: this.mensaje.idUsuario });
  }

}
