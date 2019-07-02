import { Component, OnInit, ViewChild } from '@angular/core';
import { RastreoVehiculoService } from './rastreo-vehiculo.service';
import { RegistroLlamadaService } from '../llamadaReal/registro-llamada/registro-llamada.service';
import { NotificacionService } from '../../notificacion/notificacion.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-rastreo-vehiculo',
  templateUrl: './rastreo-vehiculo.component.html',
  styleUrls: ['./rastreo-vehiculo.component.css'],
  providers: [ RastreoVehiculoService ]
})
export class RastreoVehiculoComponent implements OnInit {
  busquedaVehiculo: [];
  uuid: number = 5;
  desdeFolio: number;
  hastaFolio: number;
  desdeFecha: any;
  hastaFecha: any;
  motivos: [];
  motivosUpdate: [];
  calle: string;
  colonia: [];
  tipoVehiculo: [];
  marca: [];
  modelo: [];
  busqueda: [];
  numeroPlaca: string;
  numeroSerie: string;
  color: [];
  rastreo: [];
  rastreoUpdate: [];
  anio: number;
  seniasParticulares: string;
  antiguedad = [];
  motivoSeleccionado: any;
  motivoUpdateSeleccionado: any;
  tipoVehiculoSeleccionado: any;
  marcaSeleccionada: any;
  colorSeleccionado: any;
  rastreoSeleccionado: any;
  rastreoUpdateSeleccionado: any;
  antiguedadSeleccionada: any;
  modeloSeleccionado: any;
  jsonActualizar = {};
  private readonly notifier: NotificacionService;
  public displayedColumns: string[] = ['nombre_tipo', 'marca', 'modelo', 'numero_placa', 'nombre_color', 'nombre_estatus_rastreo', 'iconoSelect', 'iconoDelete' ]; 
  public dataSource: any;
  @ViewChild(MatSort ) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public footerFilterFlag: boolean = true;

  constructor(private rastreoVehiculoService: RastreoVehiculoService, 
    private restCaller: RegistroLlamadaService,
    private notifierService: NotificacionService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.getCatalogoMotivo();
    this.getCatalogoTipoVehiculo();
    this.getCatalogoMarca();
    this.getCatalogoColorVehiculo();
    this.getCatalogoTipoRastreo();
    this.getCatalogoAntiguedad();
  }

  getCatalogoMotivo() {
    let urlGetMotivo ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos";
    let call = {};
    let params=[];
    let param= {};
    let callMotivos={};

    param["nombreParametro"]="uuid";
    param["tipo"]="String";
    param["valor"]=this.uuid;
    params.push(param);

    call["nombrePaquete"] = "catalogo";
    call["nombreStoreProcedure"] = "cat_motivo";
    call["nombreMs"] = "MS-LLAMADA-REAL";
    call["param"] = params;

    callMotivos["uuid"] = this.uuid;  

    this.restCaller.sendCall(callMotivos, urlGetMotivo).subscribe(
      (data) => { 
        var lista = JSON.parse(data["responseData"]);
        this.motivos = lista["items"];
        this.motivosUpdate = lista["items"];
      }
    );
  }

  getCatalogoTipoVehiculo() {
    let urlGetTipoVehiculo = 'http://3.14.155.2:9098/obtenerCatalogoTipoVehiculo';
    let json = {};

    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoTipoVehiculo(urlGetTipoVehiculo, json).subscribe(
      (response) => {
        this.tipoVehiculo = response["items"];
      }
    );
  }

  getCatalogoMarca() {
    let urlGetMarca = 'http://3.14.155.2:9098/obtenerCatalogoMarca';
    let json = {};

    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoMarca(urlGetMarca, json).subscribe(
      (response) => {
        this.marca = response['items'];
      }
    );
  }

  getCatalogoColorVehiculo() {
    let urlGetColorVehiculo = 'http://3.14.155.2:9098/obtenerCatalogoColorVehiculo';
    let json = {};

    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoColorVehiculo(urlGetColorVehiculo, json).subscribe(
      (response) => {
        this.color = response['items'];
      }
    );
  }

  getCatalogoTipoRastreo() {
    let urlGetTipoRastreo = 'http://3.14.155.2:9098/obtenerCatalogoTipoRastreo';
    let json = {};

    json['uuid'] = this.uuid;

    this.rastreoVehiculoService.getCatalogoTipoRastreo(urlGetTipoRastreo, json).subscribe(
      (response) => {
        this.rastreo = response['items'];
        this.rastreoUpdate = response['items'];
      }
    );
  }

  getCatalogoAntiguedad() {
    let anti1 = { 'nombre_antiguedad': 'NO_ESPECIFICADO' };
    let anti2 = { 'nombre_antiguedad': 'NUEVO' };
    let anti3 = { 'nombre_antiguedad': 'SEMI_NUEVO' };
    let anti4 = { 'nombre_antiguedad': 'VIEJO' };

    this.antiguedad.push(anti1);
    this.antiguedad.push(anti2);
    this.antiguedad.push(anti3);
    this.antiguedad.push(anti4);
  }

  insertaIdMarca() {
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

  customSearchFn(busqueda: string, item: any) { 
    let cadena_idMotivo=item.id_catologo_nacional+"";
    let cadena_nombreMotivo=item.nombre_motivo.toLocaleLowerCase()+"";

    busqueda = busqueda.toLocaleLowerCase();
    
    return cadena_idMotivo.indexOf(busqueda) > -1 || cadena_nombreMotivo.indexOf(busqueda) > -1;
  }

  borrar() {
    this.desdeFolio = null;
    this.hastaFolio = null;
    this.desdeFecha = '';
    this.hastaFecha = '';
    this.motivoSeleccionado = null;
    this.calle = '';
    this.colonia = null;
    this.tipoVehiculoSeleccionado = null;
    this.marcaSeleccionada = null;
    this.modeloSeleccionado = null;
    this.numeroPlaca = '';
    this.numeroSerie = '';
    this.colorSeleccionado = null;
    this.rastreoSeleccionado = null;
    this.anio = null;
    this.antiguedadSeleccionada = null;
    this.seniasParticulares = null;
    this.dataSource = null;
  }

  getFechaIni() {
    return this.desdeFecha;
  }

  getFechaFin() {
    return this.hastaFecha;
  }

  fechaCorrecta(fecha1, fecha2){
    if(fecha1 === null || fecha2 === null) {
      return false;
    } else {
      let x = fecha1.split('/');
      let z = fecha2.split('/');
  
      fecha1 = x[1] + '/' + x[0] + '/' + x[2];
      fecha2 = z[1] + '/' + z[0] + '/' + z[2];
  
      if(Date.parse(fecha1) > Date.parse(fecha2)) {
        return true;
      } else {
        return false;
      }
    }
  }

  buscarRastreoVehiculo() {
    let urlBuscarRegistroVehiculo = 'http://3.14.155.2:9098/buscarRegistroVehiculo';
    let json = {};
    let fechaInicio = this.getFechaIni();
    let fechaFin = this.getFechaFin();
    let fechaFormeteadaInicio = null;
    let fechaFormeteadaFin = null;
    let fechaCompararInicio = null;
    let fechaCompararFin = null;

    if(typeof fechaInicio !== 'undefined' && fechaInicio !== null && fechaInicio !== '' && typeof fechaFin !== 'undefined' && fechaFin !== null && fechaFin !== '') {
      fechaFormeteadaInicio = moment(fechaInicio).format('DD/MM/YYYY HH:mm:ss');
      fechaFormeteadaFin = moment(fechaFin).format('DD/MM/YYYY HH:mm:ss');
      fechaCompararInicio = moment(fechaInicio).format('DD/MM/YYYY');
      fechaCompararFin = moment(fechaFin).format('DD/MM/YYYY');
    }
    

    if(this.fechaCorrecta(fechaCompararInicio, fechaCompararFin)) {
      this.notifier.showNotification('top','center', 'La fecha fin no puede ser mayor que la fecha inicio', 'danger');
    } else {
      if(typeof fechaFormeteadaInicio !== 'undefined' && fechaFormeteadaInicio !== null) {
        json['desdeFecha'] = fechaFormeteadaInicio;
      } else {
        json['desdeFecha'] = null;
      }

      if(typeof fechaFormeteadaFin !== 'undefined' && fechaFormeteadaFin !== null) {
        json['hastaFecha'] = fechaFormeteadaFin;
      } else {
        json['hastaFecha'] = null;
      }

      json['uuid'] = this.uuid;
      json['desdeFolio'] = this.desdeFolio;
      json['hastaFolio'] = this.hastaFolio;

      if(typeof this.motivoSeleccionado !== "undefined" && this.motivoSeleccionado !== null) {
        json['idMotivo'] = this.motivoSeleccionado['id_motivo'];
      } else {
        json['idMotivo'] = null;
      }
  
      if(typeof this.tipoVehiculoSeleccionado !== "undefined" && this.tipoVehiculoSeleccionado !== null) {
        json['idTipoVehiculo'] = this.tipoVehiculoSeleccionado['id_tipo_vehiculo'];
      } else {
        json['idTipoVehiculo'] = null;
      }
      
      if(typeof this.marcaSeleccionada !== "undefined" && this.marcaSeleccionada !== null) {
        json['idMarca'] = this.marcaSeleccionada['id_marca'];
      } else {
        json['idMarca'] = null;
      }
      
      if(typeof this.modeloSeleccionado !== "undefined" && this.modeloSeleccionado !== null) {
        json['idModelo'] = this.modeloSeleccionado['id_modelo'];
      } else {
        json['idModelo'] = null;
      }
      
      json['numeroPlaca'] = this.numeroPlaca;
      json['numeroSerie'] = this.numeroSerie;
  
      if(typeof this.colorSeleccionado !== "undefined" && this.colorSeleccionado !== null) {
        json['idColor'] = this.colorSeleccionado['id_color'];
      } else {
        json['idColor'] = null;
      }
      
      if(typeof this.rastreoSeleccionado !== "undefined" && this.rastreoSeleccionado !== null) {
        json['idEstatusRastreo'] = this.rastreoSeleccionado['id_estatus_rastreo'];
      } else {
        json['idEstatusRastreo'] = null;
      }
      
      json['anio'] = this.anio;
  
      if(typeof this.antiguedadSeleccionada !== "undefined" && this.antiguedadSeleccionada !== null) {
        json['antiguedad'] = this.antiguedadSeleccionada['nombre_antiguedad'];
      } else {
        json['antiguedad'] = null;
      }
      
      json['seniasParticulares'] = this.seniasParticulares;

      this.rastreoVehiculoService.busquedaRastreoVehiculo(urlBuscarRegistroVehiculo, json).subscribe(
        (response) => {
          this.dataSource = new MatTableDataSource(
            this.busquedaVehiculo = response["vSalida"]
          );   
          this.dataSource.sort = this.sort;   
          this.dataSource.paginator = this.paginator;
        }
      );
    }
  }

  buscarPorNombre(busqueda: string, item: any) {
    let urlBuscarPorNombre = 'http://3.14.155.2:9098/obtenerCatalogoModeloPorNombre';
    let json = {};

    busqueda = busqueda.toLocaleUpperCase();

    json['uuid'] = this.uuid;
    json['modelo'] = busqueda;
    
    this.rastreoVehiculoService.getCatalogoModeloPorNombre(urlBuscarPorNombre, json).subscribe(
      (response) => {
        this.modelo = response['items'];
      }
    );
  }

  eliminarVehiculo(uuid, id) {
    let urlEliminar = 'http://3.14.155.2:9098/eliminarRegistroVehiculo';
    let json = {};

    json['uuid'] = uuid;
    json['idVehiculoInvolucrado'] = id;

    this.rastreoVehiculoService.deleteVehiculo(urlEliminar, json).subscribe(
      (response) => {
        if(response['ELIMINADO'] === "1") {
          this.buscarRastreoVehiculo();
          this.notifier.showNotification('top','center', 'Se ha eliminado correctamente', 'success');
        }
      }
    );
  }

  actualizarVehiculo(vehiculo) {
    this.jsonActualizar['uuid'] = vehiculo['uuid'];
    this.jsonActualizar['idEvento'] = vehiculo['id_evento'];
    this.jsonActualizar['idVehiculoInvolucrado'] = vehiculo['id_vehiculo_involucrado'];
    this.jsonActualizar['modificadoPor'] = 2;
    
  }

  actualizarVehiculoPorRastreo() {
    let urlEditar = 'http://3.14.155.2:9098/actualizarVehiculo';
    this.jsonActualizar['idEstatusRastreo'] = this.rastreoUpdateSeleccionado['id_estatus_rastreo'];
    console.log(this.jsonActualizar);
    this.rastreoVehiculoService.actualizarVehiculo(urlEditar, this.jsonActualizar).subscribe(
      (response) => {
        console.log(response);
        if(response['ACTUALIZADO'] === "1") {
          this.rastreoUpdateSeleccionado = null;
          this.buscarRastreoVehiculo();
          this.notifier.showNotification('top','center', 'Se ha actualizado correctamente', 'success');
        }
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.filteredData.length < 1){ 
      this.footerFilterFlag=false;
    }else{
      this.footerFilterFlag=true;
    }
  }

  
}
