import { Component, OnInit, Input} from '@angular/core';
import { InicioLlamadaComponent } from '../../operador/inicio-llamada/inicio-llamada.component';
import { LlamadaComunService } from './llamada-comun.service';
import {NotificacionService} from '../../notificacion/notificacion.service';

declare var $ : any;

@Component({
  selector: 'app-llamada-comun',
  templateUrl: './llamada-comun.component.html',
  styleUrls: ['./llamada-comun.component.css'],
  providers: [ LlamadaComunService ]
})
export class LlamadaComunComponent implements OnInit {
  @Input() prefolio: string;
  @Input() x: string;
  @Input() y: string;
  @Input() fechaInicioLlamada: any;
  private accion = 'Fin';
  private uuid: string = '5';
  public tipoLlamadaComun: [];
  private llamadaNoPreferente: number = null;
  public observacionLlamada: string;
  public validar: boolean = false;
  private timer;
  private preventSimpleClick: boolean = false;
  private readonly notifier: NotificacionService;

  constructor(public grabacion: InicioLlamadaComponent, private llamadaComunService: LlamadaComunService, private notifierService: NotificacionService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    $('#botonPuto').prop('disabled', true);
    $('#botonPuto').css({
      'cursor': 'pointer',
      'opacity': '0.6'
    });

    let json = {};
    json['uuid'] = this.uuid;

    this.getLlamadaComun(json);
  }

  public eventoClick(id: number) {
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 200;

    this.timer = setTimeout(() => {
      if(!this.preventSimpleClick) {
        this.llamadaNoPreferente = id;
      }
    }, delay);
  }

  public eventoDobleClick(id: number) {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    this.llamadaNoPreferente = id;
    this.persisteLlamadaComun(id);
  }

  public getLlamadaComun(data: any): void {
    let urlGetLlamadaComun = 'http://3.14.155.2:9093/obtenerCatalogoLlamadaNoProcedente';

    this.llamadaComunService.getLlamadaComun(urlGetLlamadaComun, data).subscribe(
      (response) => {
        this.tipoLlamadaComun = response['items'];
      }
    );
  }

  public persisteLlamadaComun(id: number): void {
    let urlSetLlamadaComun = 'http://3.14.155.2:9093/guardarLlamadaNoProcedente';
    let telefono = $('#numeroTelefono').val();

    let prefo = this.prefolio;
    let coordX = this.x;
    let coordY = this.y;
    let fechaInicio = this.fechaInicioLlamada;
    let fechaFin = (new Date()).getTime();

    let json = {};
    
    if(this.llamadaNoPreferente !== null) {
      json['uuid'] = this.uuid;
      json['idTipoNoProcedente'] = id;
      json['numeroTelefono'] = telefono;
      json['idUsuario'] = 5;
      json['creadoPor'] = 2;
      json['observacion'] = this.observacionLlamada;
      json['latitud'] = coordX;
      json['longitud'] = coordY;
      json['fechaInicio'] = fechaInicio;
      json['fechaFin'] = fechaFin;

      this.llamadaComunService.setLlamadaComun(urlSetLlamadaComun, json).subscribe(
        response => {
          console.log(response);
          let respuesta = response['INSERTADO'];
          if(respuesta == 1 ) {
            this.llamadaNoPreferente = null;
            this.observacionLlamada = '';
            this.validar = false;
            this.grabacion.inicioGrabacion(prefo, this.accion);
            $('#botonPuto').prop('disabled', true);
            $('#botonPuto').css({
              'cursor': 'pointer',
              'opacity': '0.6'
            });
            $('#llamadaNoProcedente').modal('hide');
            $('#numeroTelefono').val('');
            $('#numeroTelefono').prop('disabled', false);
            this.notifier.showNotification ('top','center', 'Se ha generado una llamada no procedente', 'success' );
          }
        }
      );
    } else {
      $('#llamadaNoProcedente').modal('show');
      this.llamadaNoPreferente = null;
      this.validar = true;
    }
  }

  public setLlamadaComun() {
    this.persisteLlamadaComun(this.llamadaNoPreferente);
  }

}
