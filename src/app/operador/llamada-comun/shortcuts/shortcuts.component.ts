import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NotificacionService} from '../../../notificacion/notificacion.service';
import { InicioLlamadaComponent } from '../../../operador/inicio-llamada/inicio-llamada.component';
declare var $:any;


@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css'],
  host:{ '(window:keydown)' : 'shortcut($event)' }
})
export class ShortcutsComponent implements OnInit {
  private readonly notifier: NotificacionService;
  private uuid: number;
  private accion = 'Fin';
  @Input() prefolio: string;
  @Input() x: string;
  @Input() y: string;

  ngOnInit() {
  }
  constructor(
    private http: HttpClient, 
    notifierService: NotificacionService, 
    public grabacion: InicioLlamadaComponent
    ) {
    this.notifier = notifierService;
  }

  public shortcut(e: any) {
    e = e || event;
    if(e.altKey && e.keyCode == 49) {
      this.sendIdLLamada(1);
    } else if(e.altKey && e.keyCode == 50) {
      this.sendIdLLamada(2);
    }
    else if(e.altKey && e.keyCode == 51) {
      this.sendIdLLamada(3);
    }
    else if(e.altKey && e.keyCode == 52) {
      this.sendIdLLamada(4);
    }
    else if(e.altKey && e.keyCode == 53) {
      this.sendIdLLamada(5);
    }
    else if(e.altKey && e.keyCode == 54) {
      this.sendIdLLamada(6);
    }
    else if(e.altKey && e.keyCode == 55) {
      this.sendIdLLamada(7);
    }
    else if(e.altKey && e.keyCode == 56) {
      this.sendIdLLamada(8);
    } else if(e.altKey && (e.keyCode == 115 || e.keyCode == 83)) {
      $('#shortcuts').modal('show');
    }
  }

  public sendIdLLamada(id) {
    let setData = {};
    let params = [];
    let paramUno = {};
    let paramDos = {};
    let paramTres = {};
    let paramCuatro = {};
    let paramCinco = {};
    let paramSeis = {};
    let paramSiete = {};
    let urlSetLlamadaComun = 'http://3.14.155.2:9093/guardarLlamadaComun';
    let telefono = $('#numeroTelefono').val();

    
    let coordX = this.x;
    let coordY = this.y;

    paramUno['nombreParametro'] = 'uuid';
    paramUno['tipo'] = 'String';
    paramUno['valor'] = this.uuid;

    paramDos['nombreParametro'] = 'id_tipo_no_procedente';
    paramDos['tipo'] = 'int';
    paramDos['valor'] = id;

    paramTres['nombreParametro'] = 'numero_telefono';
    paramTres['tipo'] = 'String';
    paramTres['valor'] = telefono;

    paramCuatro['nombreParametro'] = 'id_usuario';
    paramCuatro['tipo'] = 'int';
    paramCuatro['valor'] = 5;

    paramCinco['nombreParametro'] = 'creado_por';
    paramCinco['tipo'] = 'int';
    paramCinco['valor'] = 2;

    paramSeis['nombreParametro'] = 'LATITUD';
    paramSeis['tipo'] = 'String';
    paramSeis['valor'] = coordX;

    paramSiete['nombreParametro'] = 'LONGITUD';
    paramSiete['tipo'] = 'String';
    paramSiete['valor'] = coordY;

    params.push(paramUno);
    params.push(paramDos);
    params.push(paramTres);
    params.push(paramCuatro);
    params.push(paramCinco);
    params.push(paramSeis);
    params.push(paramSiete);

    setData['nombreMs'] = 'MS_Llamada_Comun';
    setData['nombrePaquete'] = 'catalogo';
    setData['nombreStoreProcedure'] = 'cat_tipo_no_procedente';
    setData['tipo'] = 'POST';
    setData['param'] = params;

    this.showAlert(setData, urlSetLlamadaComun, id);
  }

  public showAlert(setData, urlSetLlamadaComun, idLlamadaComun) {
    this.http.post(urlSetLlamadaComun, setData).subscribe(
      (response) => {
        let respuesta = response['VID'];
        let prefo = this.prefolio;
        var nombreLlamada = '';
        if(respuesta != '' || respuesta != null) {
          this.grabacion.inicioGrabacion(prefo, this.accion);
          switch(idLlamadaComun) {
            case 1:
              nombreLlamada = 'LLAMADA DE PRUEBA';
            break;
            case 2:
              nombreLlamada = 'LLAMADA DE BROMA POR NIÑOS';
            break;
            case 3:
              nombreLlamada = 'OTRAS LLAMADAS IMPROCEDENTES';
            break;
            case 4:
              nombreLlamada = 'INSULTOS POR ADULTOS/LLAMADA OBSCENA';
            break;
            case 5:
              nombreLlamada = 'LLAMADA INCOMPLETA';
            break;
            case 6:
              nombreLlamada = 'JOVENES/ADULTOS JUGANDO';
            break;
            case 7:
              nombreLlamada = 'TRANSFERENCIA DE LLAMADA';
            break;
            case 8:
              nombreLlamada = 'LLAMADA MUDA';
            break;
          }
          $('#botonPuto').prop('disabled', true);
          $('#llamadaNoProcedente').modal('hide');
          $('#numeroTelefono').val('');

          this.notifier.showNotification('top','center', nombreLlamada );
        }
      }
    );
  }
}
