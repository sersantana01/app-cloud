
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrabacionService } from '../../shared/services/grabacion.service';

import {Subscription} from 'rxjs';

import {DataSharedService} from '../../shared/services/data-shared.service';
import {Evento} from '../../models/evento.model';
import {Denunciante} from '../../models/denunciante.model';
import { Grabacion } from '../../models/grabacion.model';


@Component({
  selector: 'app-inicio-llamada',
  templateUrl: './inicio-llamada.component.html',
  styleUrls: ['./inicio-llamada.component.css']
})
export class InicioLlamadaComponent implements OnInit {

  public habilitar: boolean = false;

  grabacion: Grabacion;
  public callId: string = '';
  lista = 'NINGUNO';
  prefolio = null;
  contadores;
  accion = 'INICIO';

  x = null;
  y = null;
  fechaInicioLlamada:any;
  public subscription: Subscription;


  inicioLlamada() {
    if (this.callId !== '') {
      $('#botonPuto').prop('disabled', false);
      $('#numeroTelefono').prop('disabled', true);
      this.fechaInicioLlamada= (new Date()).getTime();

      this.obtenerLista();
      this.obtenerContadores();
      this.obtenerPrefolioIncidente();
    } else {
      this.lista = 'NINGUNO';
      this.contadores = null;
      this.prefolio = null;
    }
  }

  obtenerLista() {
    this.http
      .post('http://3.14.155.2:8687/obtenerListaBlancaNegra', {
        nombreMs: 'ms-recibir-incidente',
        nombrePaquete: 'telefonista',
        nombreStoreProcedure: 'listas_NB',
        tipo: 'POST',
        param: [
          {
            nombreParametro: 'uuid',
            tipo: 'String',
            valor: '5'
          },
          {
            nombreParametro:'numero_telefono',
            tipo: 'String',
            valor: this.callId
          }
        ]
      })
      .subscribe(data => {
        this.lista = data['RESULTADO'];
      });
  }

  obtenerContadores() {
    this.http
      .post('http://3.14.155.2:8687/obtenerContadorLlamadas', {
        nombreMs: 'ms-recibir-incidente',
        nombrePaquete: 'test',
        nombreStoreProcedure: 'PCON',
        tipo: 'POST',
        param: [
          {
            nombreParametro: 'uuid',
            tipo: 'String',
            valor: '5'
          },
          {
            nombreParametro: 'numero_telefono',
            tipo: 'String',
            valor: this.callId
          }
        ]
      })
      .subscribe(data => {
        this.contadores = data;
      });
  }

  obtenerPrefolioIncidente() {
    this.http
      .post('http://3.14.155.2:8687/obtenerPrefolioIncidente', {
        nombreMs: 'ms-recibir-incidente',
        nombrePaquete: 'telefonista',
        nombreStoreProcedure: 'prefolio',
        tipo: 'POST',
        param: [
          {
            nombreParametro: 'uuid',
            tipo: 'String',
            valor: '5'
          },
          {
            nombreParametro: 'numero_telefono',
            tipo: 'String',
            valor: this.callId
          }
        ]
      })
      .subscribe(data => {
        this.prefolio = data['RESULTADO'];

        // $("#button_motivo").click();
        this.inicioGrabacion(this.prefolio, this.accion);

         
        /////////////////////////////////////////SE CREA NUEVA INSTANCIA DE EVENTO
        let ev=new Evento();
        ev.numeroTelefonico=this.callId;
        ev.prefolio = this.prefolio;
 
       
        let denun= new Denunciante();
        denun.latitudDenunciante= '19.4336368';
        denun.longitudDenunciante='-99.1836388';
 
        ev.denunciante = denun;
        ev.fechaInicio=this.fechaInicioLlamada;
        
 
        this.callCreaLlamadaEvento(ev);
 
         let btnMotivo=  <HTMLInputElement>(document.getElementById("button_motivo"));
         btnMotivo.click();
      });
      
  }

  public setPrefolio(): string {
    return this.prefolio;
  }

  public callCreaLlamadaEvento(evento){

    this.dataShared.crearLlamada(evento); 


  }

  public callResetLlamada(){

    $("#button_pizq_reset").click();
    $("#numeroTelefono").prop('disabled',false);

    $("#numeroTelefono").val("");

  }

  public inicioGrabacion(pre: string, accion : string) : void{

   let localIp=localStorage.getItem('LOCAL_IP');

    let fecha = new Date();
    let fActual = fecha.getDate() + '/' +
            fecha.getMonth() + '/' +
            fecha.getFullYear() + ' ' +
            fecha.getHours() + ':' +
            fecha.getMinutes() + ':' +
            fecha.getSeconds();
    // alert(pre + this.accion + fActual);


    this.grabacion = new Grabacion();

   this.grabacion.accion = accion;
   this.grabacion.prefolio=pre;
   this.grabacion.fechaGrabacion=fActual;
   this.grabacion.ip = localIp;
   this.grabacion.nombreUsuario = "OPERADOR1";
   this.grabacion.idUsuario = "";



     
    this.grabacionService.grabacion(this.grabacion).subscribe(response => {
     // let jsonRespuesta = JSON.parse(atob(response ) ) ;
     
  
    }, error =>{
     
           if(error.status == 400){
           
           }else if(error.status == 401) {
           
           }
          }
      
      );
    
    

  }

  obtenerUbicacion(numero) {

    this.http
      .post('http://3.14.155.2:6769/solicitarUbicacion', {
        numero
      })
      .subscribe(data => {
        this.x = data['x'];//latitud
        this.y = data['y'];//longitud


        
        /////////////////////////////////////////SE CREA NUEVA INSTANCIA DE EVENTO
        let ev=new Evento();
        ev.numeroTelefonico=this.callId;
        ev.prefolio = this.prefolio;


        let denun= new Denunciante();
        denun.latitudDenunciante=this.x;
        denun.longitudDenunciante=this.y;

        ev.denunciante = denun;
        

        this.callCreaLlamadaEvento(ev);
      });
  }

b
  constructor( public dataShared: DataSharedService,private http: HttpClient, private grabacionService: GrabacionService) {
  
  
  }




  ngOnInit() {
 

    this.subscription = this.dataShared.datosLlamadaObservable$.subscribe((data) =>{

      console.log(data);

    } );
  }

}
