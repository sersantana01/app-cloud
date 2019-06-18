import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RastreoVehiculoService } from './rastreo-vehiculo.service';
import { RegistroLlamadaService } from '../llamadaReal/registro-llamada/registro-llamada.service';

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-rastreo-vehiculo',
  templateUrl: './rastreo-vehiculo.component.html',
  styleUrls: ['./rastreo-vehiculo.component.css'],
  providers: [ RastreoVehiculoService ]
})
export class RastreoVehiculoComponent implements OnInit {
  private uuid: string = '5';
  private desdeFolio: string;
  private hastaFolio: string;
  private desdeFecha: string;
  private hastaFecha: string;
  private motivos: [];
  private calle: string;
  private colonia: string;
  private tipoVehiculo: [];
  private marca: [];
  private modelo: [];
  private numeroPlaca: string;
  private numeroSerie: string;
  private color: [];
  private rastreo: [];
  private anio: string;
  private seniasParticulares: string;
  public antiguedad = [];

  public motivoSeleccionado: any;
  public tipoVehiculoSeleccionado: any;
  public marcaSeleccionada: any;
  public colorSeleccionado: any;
  public rastreoSeleccionado: any;
  public antiguedadSeleccionada: any;
  public modeloSeleccionado: any;

  public ocultarModelo = true;

  constructor(private rastreoVehiculoService: RastreoVehiculoService, public restCaller: RegistroLlamadaService) { }

  ngOnInit() {
    this.getCatalogoMotivo();
    this.getCatalogoTipoVehiculo();
    this.getCatalogoMarca();
    this.getCatalogoColorVehiculo();
    this.getCatalogoTipoRastreo();
    this.getCatalogoAntiguedad();
  }

  public enviar() {
    
  }

  public getCatalogoMotivo() {
    let urlGetMotivo = 'http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos';

    var call = {};
    var params=[];

    var param= {};
    param["nombreParametro"]="uuid";
    param["tipo"]="String";
    param["valor"]=this.uuid;

    params.push(param);

    call["nombrePaquete"] = "catalogo";
    call["nombreStoreProcedure"] = "cat_motivo";
    call["nombreMs"] = "MS-LLAMADA-REAL";
    call["param"] = params;

    this.restCaller.sendCall(call, urlGetMotivo).subscribe(
      (data) => { 
          var lista = JSON.parse(data["responseData"]);
          this.motivos = lista["items"];
      }
    );
  }

  public getCatalogoTipoVehiculo() {
    let urlGetTipoVehiculo = 'http://localhost:9087/obtenerCatalogoTipoVehiculo';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoTipoVehiculo(urlGetTipoVehiculo, json).subscribe(
      (response) => {
        this.tipoVehiculo = response["items"];
      }
    );
  }

  public getCatalogoMarca() {
    let urlGetMarca = 'http://localhost:9087/obtenerCatalogoMarca';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoMarca(urlGetMarca, json).subscribe(
      (response) => {
        this.marca = response['items'];
      }
    );
  }

  public getCatalogoColorVehiculo() {
    let urlGetColorVehiculo = 'http://localhost:9087/obtenerCatalogoColorVehiculo';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoColorVehiculo(urlGetColorVehiculo, json).subscribe(
      (response) => {
        this.color = response['items'];
      }
    );
  }

  public getCatalogoTipoRastreo() {
    let urlGetTipoRastreo = 'http://localhost:9087/obtenerCatalogoTipoRastreo';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoTipoRastreo(urlGetTipoRastreo, json).subscribe(
      (response) => {
        this.rastreo = response['items'];
        console.log(this.rastreo);
      }
    );
  }

  public getCatalogoAntiguedad() {
    var anti1 = { 'nombre_antiguedad': 'NO_ESPECIFICADO' };
    var anti2 = { 'nombre_antiguedad': 'NUEVO' };
    var anti3 = { 'nombre_antiguedad': 'SEMI_NUEVO' };
    var anti4 = { 'nombre_antiguedad': 'VIEJO' };

    this.antiguedad.push(anti1);
    this.antiguedad.push(anti2);
    this.antiguedad.push(anti3);
    this.antiguedad.push(anti4);
  }

  public insertaIdMarca() {
    let urlInsertaIdMarca = 'http://localhost:9087/obtenerCatalogoModeloPorIdMarca';

    let json = {};
    json['uuid'] = this.uuid;
    json['idMarca'] = this.marcaSeleccionada["id_marca"];

    this.rastreoVehiculoService.getCatalogoModeloPorIdModelo(urlInsertaIdMarca, json).subscribe(
      (response) => {
        this.modelo = response['items'];
      }
    );
  }

  public customSearchFn(busqueda: string, item: any) { 
    busqueda = busqueda.toLocaleLowerCase();
    var cadena_idMotivo=item.id_catologo_nacional+"";
    var cadena_nombreMotivo=item.nombre_motivo.toLocaleLowerCase()+"";

    return cadena_idMotivo.indexOf(busqueda) > -1 || cadena_nombreMotivo.indexOf(busqueda) > -1;
  }

  public borrar() {
    this.desdeFolio = null;
    this.hastaFolio = '';
    this.desdeFecha = '';
    this.hastaFecha = '';
    this.motivoSeleccionado = null;
    this.calle = '';
    this.colonia = '';
    this.tipoVehiculoSeleccionado = null;
    this.marcaSeleccionada = null;
    this.modeloSeleccionado = null;
    this.numeroPlaca = '';
    this.numeroSerie = '';
    this.colorSeleccionado = null;
    this.rastreoSeleccionado = null;
    this.anio = '';
    this.antiguedadSeleccionada = null;
    this.seniasParticulares = null;
  }

  public buscarPorNombre(busqueda: string, item: any) {
    busqueda = busqueda.toLocaleUpperCase();

    let urlBuscarPorNombre = 'http://localhost:9087/obtenerCatalogoModeloPorNombre';

    let json = {};
    json['uuid'] = this.uuid;
    json['modelo'] = busqueda;

    this.rastreoVehiculoService.getCatalogoModeloPorNombre(urlBuscarPorNombre, json).subscribe(
      (response) => {
        this.modelo = response['items'];
      }
    );

  }

}
