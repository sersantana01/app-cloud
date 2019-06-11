import { Component, OnInit, Input} from '@angular/core';
import { InicioLlamadaComponent } from '../../operador/inicio-llamada/inicio-llamada.component';
import { LlamadaComunService } from './llamada-comun.service';

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
  private accion = 'Fin';
  private uuid: string = '5';
  private tipoLlamadaComun: [];
  private llamadaNoPreferente: number = null;
  private observacionLlamada: string;
  private validar: boolean = false;
  private timer;
  private preventSimpleClick: boolean = false;

  constructor(
    public grabacion: InicioLlamadaComponent, 
    private llamadaComunService: LlamadaComunService) { }

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
    this.persisteLlamadaComun(id);
  }

  public getLlamadaComun(data: any): void {
    //let urlGetLlamadaComun = 'http://3.14.155.2:9093/obtenerCatalogoLlamadaComun';
    let urlGetLlamadaComun = 'http://localhost:9088/obtenerCatalogoLlamadaNoProcedente';

    this.llamadaComunService.getLlamadaComun(urlGetLlamadaComun, data).subscribe(
      response => {
        this.tipoLlamadaComun = response['items'];
        console.log(this.tipoLlamadaComun);
      }
    );
  }

  public persisteLlamadaComun(id: number): void {
    let setData = {};
    let params = [];
    let paramUno = {};
    let paramDos = {};
    let paramTres = {};
    let paramCuatro = {};
    let paramCinco = {};
    let paramSeis = {};
    let paramSiete = {};
    let paramOcho = {};
    //let urlSetLlamadaComun = 'http://3.14.155.2:9093/guardarLlamadaComun';
    let urlSetLlamadaComun = 'http://localhost:9088/guardarLlamadaComun';
    let telefono = $('#numeroTelefono').val();

    let prefo = this.prefolio;
    let coordX = this.x;
    let coordY = this.y;
    
    if(this.llamadaNoPreferente !== null) {
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

      paramSeis['nombreParametro'] = 'Observacion';
      paramSeis['tipo'] = 'String';
      paramSeis['valor'] = this.observacionLlamada;

      paramSiete['nombreParametro'] = 'LATITUD';
      paramSiete['tipo'] = 'String';
      paramSiete['valor'] = coordX;

      paramOcho['nombreParametro'] = 'LONGITUD';
      paramOcho['tipo'] = 'String';
      paramOcho['valor'] = coordY;

      params.push(paramUno);
      params.push(paramDos);
      params.push(paramTres);
      params.push(paramCuatro);
      params.push(paramCinco);
      params.push(paramSeis);
      params.push(paramSiete);
      params.push(paramOcho);

      setData['nombreMs'] = 'MS_Llamada_Comun';
      setData['nombrePaquete'] = 'telefonista';
      setData['nombreStoreProcedure'] = 'llamada_no_procedente';
      setData['tipo'] = 'POST';
      setData['param'] = params;

      this.llamadaComunService.setLlamadaComun(urlSetLlamadaComun, setData).subscribe(
        response => {
          let respuesta = response['ID_DIRECCION'];
          if(respuesta != '' || respuesta != null) {
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
