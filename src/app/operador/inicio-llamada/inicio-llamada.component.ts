
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrabacionService } from '../../shared/services/grabacion.service';

import {Subscription} from 'rxjs';

import {DataSharedService} from '../../shared/services/data-shared.service';
import {Evento} from '../../models/evento.model';
import {Denunciante} from '../../models/denunciante.model';


@Component({
  selector: 'app-inicio-llamada',
  templateUrl: './inicio-llamada.component.html',
  styleUrls: ['./inicio-llamada.component.css']
})
export class InicioLlamadaComponent implements OnInit {

  public habilitar: boolean = false;

  public callId: string = '';
  lista = 'NINGUNO';
  prefolio = null;
  contadores;
  accion = 'Intermedio';
  estatusGrabacion :string ='';
  x = null;
  y = null;


  fechaInicioLlamada:any;
  public subscription: Subscription;


  inicioLlamada() {
    if (this.callId !== '') {


      $('#botonPuto').prop('disabled', false);
      $('#botonPuto').css({
        'cursor': 'pointer',
        'opacity': 'inherit'
      });
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



        
        this.obtenerUbicacion(this.callId);
        
        this.inicioGrabacion(this.prefolio, this.accion);

        $("#button_motivo").click();
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

  inicioGrabacion(pre, accion) {
    let fecha = new Date();
    let fActual = fecha.getDate() + '/' +
            fecha.getMonth() + '/' +
            fecha.getFullYear() + ' ' +
            fecha.getHours() + ':' +
            fecha.getMinutes() + ':' +
            fecha.getSeconds();
    // alert(pre + this.accion + fActual);

    this.estatusGrabacion = this.grabacionService.grabarAuronix(pre, fActual, accion);

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
        ev.fechaInicio=this.fechaInicioLlamada;
        

        this.callCreaLlamadaEvento(ev);
      });
  }


  constructor( public dataShared: DataSharedService,private http: HttpClient, private grabacionService: GrabacionService) {}




  ngOnInit() {
 

    this.subscription = this.dataShared.datosLlamadaObservable$.subscribe((data) =>{

      console.log(data);

    } );
  }

}
