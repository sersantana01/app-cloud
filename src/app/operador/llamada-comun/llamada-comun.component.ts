import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { InicioLlamadaComponent } from '../../operador/inicio-llamada/inicio-llamada.component';

declare var $ : any;

@Component({
  selector: 'app-llamada-comun',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './llamada-comun.component.html',
  styleUrls: ['./llamada-comun.component.css']
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

  constructor(public http: HttpClient, public grabacion: InicioLlamadaComponent) { }

  ngOnInit() {
    $('#botonPuto').prop('disabled', true);
    let getData = {};
    let params = [];
    let param = {};

    param['nombreParametro'] = 'uuid';
    param['tipo'] = 'String';
    param['valor'] = this.uuid;

    params.push(param);

    getData['nombreMs'] = 'MS_Llamada_Comun';
    getData['nombrePaquete'] = 'catalogo';
    getData['nombreStoreProcedure'] = 'cat_tipo_no_procedente';
    getData['param'] = params;

    this.getLlamadaComun(getData);
  }

  public getLlamadaComun(data: any): void {
    let urlGetLlamadaComun = 'http://3.14.155.2:9093/obtenerCatalogoLlamadaComun';
    
    this.http.post(urlGetLlamadaComun, data).subscribe(
      (response) => {
        this.tipoLlamadaComun = response['items'];
      }
    );
  }

  public customSearchFn(busqueda: string, item: any) {
    busqueda = busqueda.toLocaleLowerCase();
    var cadena_idMotivo=item.id_tipo_no_procedente+"";
    var cadena_nombreMotivo=item.nombre.toLocaleLowerCase()+"";

    return cadena_idMotivo.indexOf(busqueda) > -1 || cadena_nombreMotivo.indexOf(busqueda) > -1;
  }

  public setLlamadaComun() {
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
    let urlSetLlamadaComun = 'http://3.14.155.2:9093/guardarLlamadaComun';
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
      paramDos['valor'] = this.llamadaNoPreferente;

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

      this.http.post(urlSetLlamadaComun, setData).subscribe(
        (response) => {
          let respuesta = response['ID_DIRECCION'];
          if(respuesta != '' || respuesta != null) {
            this.llamadaNoPreferente = null;
            this.observacionLlamada = '';
            this.validar = false;
            this.grabacion.inicioGrabacion(prefo, this.accion);
            $('#botonPuto').prop('disabled', true);
            $('#llamadaNoProcedente').modal('hide');
            $('#numeroTelefono').val('');
          }
        }
      );
    } else {
      $('#llamadaNoProcedente').modal('show');
      this.llamadaNoPreferente = null;
      this.validar = true;
    }
  }

}
