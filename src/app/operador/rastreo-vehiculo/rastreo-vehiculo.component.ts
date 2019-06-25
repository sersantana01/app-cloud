import { Component, OnInit } from '@angular/core';
import { RastreoVehiculoService } from './rastreo-vehiculo.service';
import { RegistroLlamadaService } from '../llamadaReal/registro-llamada/registro-llamada.service';

@Component({
  selector: 'app-rastreo-vehiculo',
  templateUrl: './rastreo-vehiculo.component.html',
  styleUrls: ['./rastreo-vehiculo.component.css'],
  providers: [ RastreoVehiculoService ]
})
export class RastreoVehiculoComponent implements OnInit {
  public uuid: string = '5';
  public desdeFolio: string;
  public hastaFolio: string;
  public desdeFecha: string;
  public hastaFecha: string;
  public motivos: [];
  public calle: string;
  public colonia: string;
  public tipoVehiculo: [];
  public marca: [];
  public modelo: [];
  public numeroPlaca: string;
  public numeroSerie: string;
  public color: [];
  public rastreo: [];
  public anio: string;
  public seniasParticulares: string;
  public antiguedad = [];

  public motivoSeleccionado: any;
  public tipoVehiculoSeleccionado: any;
  public marcaSeleccionada: any;
  public colorSeleccionado: any;
  public rastreoSeleccionado: any;
  public antiguedadSeleccionada: any;
  public modeloSeleccionado: any;

  public ocultarModelo = true;

  constructor(public rastreoVehiculoService: RastreoVehiculoService, public restCaller: RegistroLlamadaService) { }

  ngOnInit() {
    this.getCatalogoMotivo();
    this.getCatalogoTipoVehiculo();
    this.getCatalogoMarca();
    this.getCatalogoColorVehiculo();
    this.getCatalogoTipoRastreo();
    this.getCatalogoAntiguedad();
  }

  public getCatalogoMotivo() {
    let urlGetMotivo ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos";

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

    

    var callMotivos={};
    callMotivos["uuid"] = this.uuid;    
    this.restCaller.sendCall(callMotivos, urlGetMotivo).subscribe(
      (data) => { 
        var lista = JSON.parse(data["responseData"]);
        this.motivos = lista["items"];
      }
    );
  }


  

  public getCatalogoTipoVehiculo() {
    let urlGetTipoVehiculo = 'http://3.14.155.2:9098/obtenerCatalogoTipoVehiculo';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoTipoVehiculo(urlGetTipoVehiculo, json).subscribe(
      (response) => {
        this.tipoVehiculo = response["items"];
      }
    );
  }

  public getCatalogoMarca() {
    let urlGetMarca = 'http://3.14.155.2:9098/obtenerCatalogoMarca';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoMarca(urlGetMarca, json).subscribe(
      (response) => {
        this.marca = response['items'];
      }
    );
  }

  public getCatalogoColorVehiculo() {
    let urlGetColorVehiculo = 'http://3.14.155.2:9098/obtenerCatalogoColorVehiculo';

    let json = {};
    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoColorVehiculo(urlGetColorVehiculo, json).subscribe(
      (response) => {
        this.color = response['items'];
      }
    );
  }

  public getCatalogoTipoRastreo() {
    let urlGetTipoRastreo = 'http://3.14.155.2:9098/obtenerCatalogoTipoRastreo';

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
    let urlInsertaIdMarca = 'http://3.14.155.2:9098/obtenerCatalogoModeloPorIdMarca';

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
    this.desdeFolio = '';
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

  public buscar() {
    let urlBuscarRegistroVehiculo = 'http://3.14.155.2:9098/buscarRegistroVehiculo';

    let json = {};
    json['uuid'] = this.uuid;
    json['desdeFolio'] = this.desdeFolio;
    json['hastaFolio'] = this.hastaFolio;
    json['desdeFecha'] = this.desdeFecha;
    json['hastaFecha'] = this.hastaFecha;
    json['idMotivo'] = this.motivoSeleccionado;
    json['idMarca'] = this.marcaSeleccionada;
    json['idModelo'] = this.modeloSeleccionado;
    json['numeroPlaca'] = this.numeroPlaca;
    json['numeroSerie'] = this.numeroSerie;
    json['idColor'] = this.colorSeleccionado;
    json['idEstatusRastreo'] = this.rastreoSeleccionado;
    json['anio'] = this.anio;
    json['antiguedad'] = this.antiguedadSeleccionada;
    json['seniasParticulares'] = this.seniasParticulares;

    this.rastreoVehiculoService.getCatalogoModeloPorNombre(urlBuscarRegistroVehiculo, json).subscribe(
      (response) => {
        this.modelo = response['items'];
      }
    );
  }

  public buscarPorNombre(busqueda: string, item: any) {
    busqueda = busqueda.toLocaleUpperCase();

    let urlBuscarPorNombre = 'http://3.14.155.2:9098/obtenerCatalogoModeloPorNombre';

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
