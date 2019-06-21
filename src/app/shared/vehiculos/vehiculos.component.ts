import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AutoModel } from './auto.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
// declare var $: any;

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  displayedColumns: string[] = ['nombre_tipo', 'marca', 'modelo', 'numero_placa', 'numero_serie', 'nombre_color', 'antiguedad', 'anio',
    'senias_particulares', 'nombre_estatus_rastreo', 'Editar', 'Eliminar'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  editedIndex: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  uuid = 5;
  idInvolveAuto = '';
  item = [];
  dataRow = [];
  editedIdInvolveAuto = '';
  itemsSelectTipo = [];
  itemsSelectMarca = [];
  itemsSelectModelo = [];
  itemsSelectColor = [];
  itemsSelectRastreo = [];
  model = new AutoModel(null, null, null, null, null, null, '', '', '', '');
  itemsAntiquity = [
    {id_antiquity: 1, name_antiquity: 'NO_ESPECIFICADO'},
    {id_antiquity: 2, name_antiquity: 'VIEJO'},
    {id_antiquity: 3, name_antiquity: 'SEMINUEVO'},
    {id_antiquity: 4, name_antiquity: 'NUEVO'}
  ];
  editedItem: {
    id_vehiculo_involucrado: '',
    id_tipo_vehiculo: '',
    nombre_tipo: '',
    id_marca: '',
    marca: '',
    id_modelo: '',
    modelo: '',
    numero_placa: '',
    numero_serie: '',
    id_color: '',
    nombre_color: '',
    antiguedad: '',
    anio: '',
    senias_particulares: '',
    id_estatus_rastreo: '',
    nombre_estatus_rastreo: ''
  };
  defaultItem: {
    id_vehiculo_involucrado: '',
    id_tipo_vehiculo: '',
    nombre_tipo: '',
    id_marca: '',
    marca: '',
    id_modelo: '',
    modelo: '',
    numero_placa: '',
    numero_serie: '',
    id_color: '',
    nombre_color: '',
    antiguedad: '',
    anio: '',
    senias_particulares: '',
    id_estatus_rastreo: '',
    nombre_estatus_rastreo: ''
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getCarType();
    this.getCarBrand();
    this.getCarModel();
    this.getCarColor();
    this.getCarTrack();
    this.fetchAutos();
  }
  close() {
    const shadesE1 = document.querySelector('.envolventeAgregarVehiculo');
    const shadesE2 = document.querySelector('.EditarAuto');
    const shadesE3 = document.querySelector('.tabla-auto');
    shadesE1.classList.remove('hide');
    shadesE1.classList.add('show');
    shadesE2.classList.remove('show');
    shadesE2.classList.add('hide');
    shadesE3.classList.remove('hide');
    shadesE3.classList.add('show');
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    }, 300);
    this.model.selectedTipo = null;
    this.model.selectedMarca = null;
    this.model.selectedModelo = null;
    this.model.selectedRastreo = null;
    this.model.selectedColor = null;
    this.model.antiguedad = null;
    this.model.numSerie = '';
    this.model.placa = '';
    this.model.signs = '';
    this.model.Year = '';
  }
  public getCarType() {
    const json = {
      'uuid': this.uuid
    };
    const endpointAuto = 'http://localhost:3201/obtenerCatalogoTipoVehiculo';
    this.http.post(endpointAuto, json).subscribe(
        (data) => {
          this.itemsSelectTipo = data['items'];
          console.log(this.itemsSelectTipo);
        });
  }
  public getCarBrand() {
    const json = {
      'uuid': this.uuid
    };
    const endpointAuto = 'http://localhost:3201/obtenerCatalogoMarca';
    this.http.post(endpointAuto, json).subscribe(
        (data) => {
          this.itemsSelectMarca = data['items'];
          console.log(this.itemsSelectMarca);
        });
  }
  public getCarModel() {
    const json = {
      'uuid': this.uuid
    };
    const endpointAuto = 'http://localhost:3201/obtenerModeloVehiculo';
    this.http.post(endpointAuto, json).subscribe(
        (data) => {
          this.itemsSelectModelo = data['items'];
          console.log(this.itemsSelectModelo);
        });
  }
  public getCarColor() {
    const json = {
      'uuid': this.uuid
    };
    const endpointAuto = 'http://localhost:3201/obtenerCatalogoColorVehiculo';
    this.http.post(endpointAuto, json).subscribe(
        (data) => {
          this.itemsSelectColor = data['items'];
          console.log(this.itemsSelectColor);
        });
  }
  public getCarTrack() {
    const json = {
      'uuid': this.uuid
    };
    const endpointAuto = 'http://localhost:3201/obtenerCatalogoTipoRastreo';
    this.http.post(endpointAuto, json).subscribe(
        (data) => {
          this.itemsSelectRastreo = data['items'];
          console.log(this.itemsSelectRastreo);
        });
  }
  public insertAuto() {
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': 162,
      'idTipoVehiculo': this.model.selectedTipo,
      'numeroPlaca': this.model.placa,
      'numeroSerie': this.model.numSerie,
      'seniasParticulares': this.model.signs,
      'anio': this.model.Year,
      'idEstatusRastreo':  this.model.selectedRastreo,
      'fechaRastreo': '',
      'idMarca': this.model.selectedMarca,
      'idModelo': this.model.selectedModelo,
      'antiguedad': this.model.antiguedad,
      'idColor': this.model.selectedColor
    };
    const endpointAutos = 'http://localhost:3201/insertarRegistroVehiculo';
    console.log(jsonchain);
    this.http.post(endpointAutos, jsonchain).subscribe(
        (data) => {
          if (data !== null) {
            this.model.selectedMarca = null;
            this.model.selectedRastreo = null;
            this.model.selectedModelo = null;
            this.model.antiguedad = null;
            this.model.selectedColor = null;
            this.model.selectedTipo = null;
            this.model.placa = '';
            this.model.numSerie = '';
            this.model.signs = '';
            this.model.Year = '';
            this.fetchAutos();
          } else {
            console.log('Error al enviar registro');
          }
        }
    );
  }
  public fetchAutos() {
    // $('#id_evento').html().trim()
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': 162
    };
    const endpointAutos = 'http://localhost:3201/obtenerRegistroVehiculo';
    this.http.post(endpointAutos, jsonchain).subscribe(
        (x) => {
          this.dataRow = x['items'];
          ELEMENT_DATA = this.dataRow;
          console.log(ELEMENT_DATA);
          this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        });
  }
  editAuto(item) {
    const shadesEl = document.querySelector('.envolventeAgregarVehiculo');
    const shadesE2 = document.querySelector('.EditarAuto');
    const shadesE3 = document.querySelector('.tabla-auto');
    shadesEl.classList.add('hide');
    shadesE3.classList.add('hide');
    shadesE2.classList.remove('hide');
    shadesE2.classList.add('show');
    console.log('Edit item');
    console.log(item);
    this.editedIndex = this.dataRow.indexOf(item);
    this.editedItem = Object.assign({}, item);
    console.log('Edited Item');
    console.log(this.editedItem);
    this.model.selectedTipo = this.editedItem.id_tipo_vehiculo;
    this.model.selectedColor = this.editedItem.id_color;
    this.model.selectedMarca = this.editedItem.id_marca;
    this.model.selectedModelo = this.editedItem.id_modelo;
    this.model.selectedRastreo = this.editedItem.id_estatus_rastreo;
    this.model.antiguedad = this.editedItem.antiguedad;
    this.model.placa = this.editedItem.numero_placa;
    this.model.Year = this.editedItem.anio;
    this.model.signs = this.editedItem.senias_particulares;
    this.model.numSerie = this.editedItem.numero_serie;
  }
  save() {
    this.editedIdInvolveAuto = this.editedItem.id_vehiculo_involucrado;
    if (this.editedIndex > -1) {
      Object.assign(this.dataRow[this.editedIndex], this.editedItem);
      console.log(this.editedItem);
    } else {
      this.dataRow.push(this.editedItem);
    }
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': 162,
      'idVehiculoInvolucrado': this.editedIdInvolveAuto,
      'idTipoVehiculo': this.model.selectedTipo,
      'numeroPlaca': this.model.placa,
      'numeroSerie': this.model.numSerie,
      'seniasParticulares': this.model.signs,
      'anio':  this.model.Year,
      'idEstatusRastreo':  this.model.selectedRastreo,
      'fechaRastreo': '',
      'idMarca': this.model.selectedMarca,
      'idModelo': this.model.selectedModelo,
      'antiguedad': this.model.antiguedad,
      'idColor': this.model.selectedColor,
      'modificadoPor': ''
    };
    const endpointAutos = 'http://localhost:3201/actualizarRegistroVehiculo';
    this.http.post(endpointAutos, jsonchain).subscribe(
        (data) => {
          console.log(data);
          this.fetchAutos();
        }
    );
    const shadesE1 = document.querySelector('.envolventeAgregarVehiculo');
    const shadesE2 = document.querySelector('.EditarAuto');
    const shadesE3 = document.querySelector('.tabla-auto');
    shadesE1.classList.remove('hide');
    shadesE2.classList.add('hide');
    shadesE3.classList.remove('hide');
    this.model.selectedTipo = null;
    this.model.selectedMarca = null;
    this.model.selectedModelo = null;
    this.model.selectedRastreo = null;
    this.model.selectedColor = null;
    this.model.antiguedad = null;
    this.model.numSerie = '';
    this.model.placa = '';
    this.model.signs = '';
    this.model.Year = '';
  }
  deleteAuto(item) {
    console.log('Delete item');
    console.log(item);
    const index = this.dataRow.indexOf(item);
    console.log(index);
    this.idInvolveAuto = item.id_vehiculo_involucrado;
    console.log(this.idInvolveAuto);
    const choise = confirm('¿Estás seguro de querer eliminar este registro?');
    if (choise !== false) {
      const endpointAutos = 'http://localhost:3201/eliminarRegistroVehiculo';
      const jsonchain = {
        'uuid': this.uuid,
        'idVehiculoInvolucrado': this.idInvolveAuto
      };
      this.http.post(endpointAutos, jsonchain).subscribe(
          (data) => {
            console.log(data);
            this.dataRow.splice(index, 1);
            this.fetchAutos();
          }
      );
    }
  }
}
export interface PeriodicElement {
  nombre_tipo: string;
  marca: string;
  modelo: string;
  numero_placa: string;
  numero_serie: number;
  nombre_color: string;
  antiguedad: string;
  anio: number;
  senias_particulares: string;
  nombre_estatus_rastreo: string;
}
let ELEMENT_DATA: PeriodicElement[];
