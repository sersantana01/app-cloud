import { Component, OnInit, Input } from '@angular/core';
import { NotificacionService } from '../../../notificacion/notificacion.service';
import { InicioLlamadaComponent } from '../../../operador/inicio-llamada/inicio-llamada.component';
import { ShortcutsService } from './shortcuts.service';
declare var $:any;


@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css'],
  providers: [ ShortcutsService ],
  host:{ '(window:keydown)' : 'shortcut($event)' }
})
export class ShortcutsComponent implements OnInit {
  private readonly notifier: NotificacionService;
  private uuid: string = '5';
  private accion = 'Fin';
  private tipoLlamadaComun: [];
  @Input() prefolio: string;
  @Input() x: string;
  @Input() y: string;

  ngOnInit() {
    let json = {};
    json['uuid'] = this.uuid;
    
    this.getLlamadaComun(json);
  }

  constructor(
    private notifierService: NotificacionService, 
    private grabacion: InicioLlamadaComponent,
    private shortcutsService: ShortcutsService
    ) {
    this.notifier = notifierService;
  }

  public dobleClick(id: number) {
    this.sendIdLLamada(id);
    $('#shortcuts').modal('hide');
  }

  public getLlamadaComun(data: any) {
    let urlGetLlamadaComun = 'http://3.14.155.2:9093/obtenerCatalogoLlamadaNoProcedente';
    
    this.shortcutsService.getLlamadaComun(urlGetLlamadaComun, data).subscribe(
      response => {
        this.tipoLlamadaComun = response['items'];
      }
    );
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
    let urlSetLlamadaComun = 'http://3.14.155.2:9093/guardarLlamadaNoProcedente';
    let telefono = $('#numeroTelefono').val();

    
    let coordX = this.x;
    let coordY = this.y;

    let json = {};

    json['uuid'] = this.uuid;
    json['idTipoNoProcedente'] = id;
    json['numeroTelefono'] = telefono;
    json['idUsuario'] = 5;
    json['creadoPor'] = 2;
    json['LATITUD'] = coordX;
    json['LONGITUD'] = coordY;

    this.showAlert(json, urlSetLlamadaComun, id);
  }

  public showAlert(setData, urlSetLlamadaComun, idLlamadaComun) {
    this.shortcutsService.setLlamadaComun(urlSetLlamadaComun, setData).subscribe(
      response => {
        var valida = $('#numeroTelefono').val();
        let respuesta = response['ID_DIRECCION'];
        let prefo = this.prefolio;
        var nombreLlamada = '';
        if(respuesta !== '' || respuesta !== null) {
          if(valida.length != 0) {
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
          }
          $('#botonPuto').prop('disabled', true);
          $('#botonPuto').css({
            'cursor': 'pointer',
            'opacity': '0.6'
          });
          $('#llamadaNoProcedente').modal('hide');
          $('#numeroTelefono').val('');
          $('#numeroTelefono').prop('disabled', false);

          this.notifier.showNotification('top','center', nombreLlamada ,'success');
        }
      }
    );
  }
}
