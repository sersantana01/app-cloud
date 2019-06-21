import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Arma } from './arma.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-armas',
  templateUrl: './armas.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./armas.component.css']
})
export class ArmasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['nombre_tipo', 'nombre_categoria', 'marca', 'modelo', 'matricula', 'observaciones',
    'nombre_portador', 'apellido_paterno', 'apellido_materno', 'vigencia_registro', 'Editar', 'Eliminar'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  uuid = 5;
  itemsSelectArmas = [];
  itemsCatArmas = [];
  rowData = [];
  private validate = false;
  fecha = '';
  idweapon: '';
  editedIndex: number;
  model = new Arma(null, null, '', '', '', '', '', '', '', '', '');

  editedItem: {
    id_arma_involucrada: '',
    id_tipo_arma: '',
    id_categoria_arma: '',
    marca: '',
    modelo: '',
    matricula: '',
    observaciones: '',
    nombre_portador: '',
    apellido_paterno: '',
    apellido_materno: '',
    vigencia_registro: ''
  };
  defaultItem: {
    id_arma_involucrada: '',
    id_tipo_arma: '',
    id_categoria_arma: '',
    marca: '',
    modelo: '',
    matricula: '',
    observaciones: '',
    nombre_portador: '',
    apellido_paterno: '',
    apellido_materno: '',
    vigencia_registro: ''
  };
  item = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getArmas();
    this.getCatArmas();
    this.fetchArmas();
  }
  public getCatArmas() {
    const json = {};
    const endpointArmas = 'http://localhost:8686/api/arma/getCategoriaArmas';
    json['uuid'] = this.uuid;
    this.http.post(endpointArmas, json).subscribe(
        (data) => {
          this.itemsCatArmas = data['items'];
        });
  }
  public getArmas() {
    const json = {};
    const endpointArmas = 'http://localhost:8686/api/arma/getTipoArma';
    json['uuid'] = this.uuid;
    this.http.post(endpointArmas, json).subscribe(
        (data) => {
          this.itemsSelectArmas = data['items'];
        });
  }
  public insertArmas() {
    this.fecha = this.model.vigencia;
    if (this.model.selectedArma !== '' || this.model.selectedArma !== null) {
      this.validate = false;
    }
    console.log(this.validate);
    this.validate = true;
    const fechaInvertida = this.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    const thenum = fechaInvertida.replace( '/', ''); // replace all leading non-digits with nothing
    this.fecha = thenum.replace('/', '');
    const jsonchain = {
      'uuid':  this.uuid,
      'idEvento': '64359',
      'idTipoArma': this.model.selectedArma,
      'idCategoriaArma': this.model.selectedCat,
      'marca': this.model.marca,
      'modelo': this.model.modelo,
      'matricula': this.model.matricula,
      'observaciones': this.model.observaciones,
      'nombrePortador': this.model.nombre,
      'apellidoPaterno': this.model.aPaterno,
      'apellidoMaterno': this.model.aMaterno,
      'vigenciaRegistro': this.fecha
    };
    const endpointArmas = 'http://localhost:8686/api/arma/insertarRegistroArma';
    console.log(jsonchain);
    this.http.post(endpointArmas, jsonchain).subscribe(
        (data) => {
          console.log(data);
          if (data !== null) {
            this.model.selectedArma = null;
            this.model.selectedCat = null;
            this.model.marca = '';
            this.model.modelo = '';
            this.model.matricula = '';
            this.model.observaciones = '';
            this.model.nombre = '';
            this.model.aPaterno = '';
            this.model.aMaterno = '';
            this.model.vigencia = '';
            this.fetchArmas();
          } else {
            console.log('Error al enviar registro');
          }
        }
    );
  }
  fetchArmas () {
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': 64359
    };
    // $('#id_evento').html().trim()
    const endpointArmas = 'http://localhost:8686/api/arma/getRegistrosArmas';
    console.log(jsonchain);
    this.http.post(endpointArmas, jsonchain).subscribe(
        (x) => {
          this.rowData = x['items'];
          console.log('Items');
          console.log(this.rowData);
          ELEMENT_DATA = this.rowData;
          console.log('ELEMENT DATA');
          console.log(ELEMENT_DATA);
          this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        });
  }
  editArma(item) {
    const shadesE1 = document.querySelector('.boton-editar');
    const shadesE2 = document.querySelector('.tabla-arma');
    const shadesE3 = document.querySelector('.boton-add');
    shadesE1.classList.remove('hide');
    shadesE2.classList.add('hide');
    shadesE3.classList.add('hide');
    console.log('Edit item');
    console.log(item);
    this.editedIndex = this.rowData.indexOf(item);
    this.editedItem = Object.assign({}, item);
    console.log('Edited Item');
    console.log(this.editedItem);
    this.model.selectedArma = this.editedItem.id_tipo_arma;
    this.model.selectedCat = this.editedItem.id_categoria_arma;
    this.model.marca = this.editedItem.marca;
    this.model.modelo = this.editedItem.modelo;
    this.model.matricula = this.editedItem.matricula;
    this.model.observaciones = this.editedItem.observaciones;
    this.model.nombre = this.editedItem.nombre_portador;
    this.model.aPaterno = this.editedItem.apellido_paterno;
    this.model.aMaterno = this.editedItem.apellido_materno;
    this.model.vigencia = this.editedItem.vigencia_registro;
  }
  deleteArma(item) {
    this.idweapon = item.id_arma_involucrada;
    const jsonchain = {
      'uuid': this.uuid,
      'idArmaInvolucrada': this.idweapon
    };
    /*const call = {};
    const param = {};
    const param2 = {};
    const params = [];
    console.log(item); */
    const index = this.rowData.indexOf(item);
    console.log(index);
    console.log(this.idweapon);
    const choise = confirm('¿Estás seguro de querer eliminar este registro?');
    if (choise !== false) {
      const endpointArmas = 'http://localhost:8686/api/arma/borrarRegistroArma';
      this.http.post(endpointArmas, jsonchain).subscribe(
          (data) => {
            console.log(data);
            this.rowData.splice(index, 1);
            this.fetchArmas();
          }
      );
    }
  }
  save() {
    this.idweapon = this.editedItem.id_arma_involucrada;
    this.fecha = this.model.vigencia;
    const fechaInvertida = this.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3/$2/$1');
    const thenum = fechaInvertida.replace( '/', ''); // replace all leading non-digits with nothing
    this.fecha = thenum.replace('/', '');
    /*const call = {};
    const param = {};
    const param1 = {};
    const param2 = {};
    const param3 = {};
    const param4 = {};
    const param5 = {};
    const param6 = {};
    const param7 = {};
    const param8 = {};
    const param9 = {};
    const param10 = {};
    const param11 = {};
    const param12 = {};
    const params = [];*/
    if (this.editedIndex > -1) {
      Object.assign(this.rowData[this.editedIndex], this.editedItem);
      console.log(this.editedItem);
    } else {
      this.rowData.push(this.editedItem);
    }
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': 64359,
      'idArmaInvolucrada': this.idweapon,
      'idCategoriaArma': this.model.selectedCat,
      'idTipoArma': this.model.selectedArma,
      'marca':  this.model.marca,
      'modelo': this.model.modelo,
      'matricula': this.model.matricula,
      'observaciones': this.model.observaciones,
      'nombrePortador': this.model.nombre,
      'apellidoPaterno': this.model.aPaterno,
      'apellidoMaterno': this.model.aMaterno,
      'vigenciaRegistro': this.fecha
    };

    /*param['nombreParametro'] = 'uuid';
    param['tipo'] = 'String';
    param['valor'] = this.uuid;
    params.push(param);
    param1['nombreParametro'] = 'id_evento';
    param1['tipo'] = 'int';
    param1['valor'] = $('#id_evento').html().trim();
    params.push(param1);
    param2['nombreParametro'] = 'id_arma_involucrada';
    param2['tipo'] = 'String';
    param2['valor'] = this.idweapon;
    params.push(param2);
    param11['nombreParametro'] = 'id_tipo_arma';
    param11['tipo'] = 'int';
    param11['valor'] = this.model.selectedArma;
    params.push(param11);
    param12['nombreParametro'] = 'id_categoria_arma';
    param12['tipo'] = 'int';
    param12['valor'] = this.model.selectedCat;
    params.push(param12);
    param3['nombreParametro'] = 'marca';
    param3['tipo'] = 'String';
    param3['valor'] = this.model.marca;
    params.push(param3);
    param4['nombreParametro'] = 'modelo';
    param4['tipo'] = 'String';
    param4['valor'] = this.model.modelo;
    params.push(param4);
    param5['nombreParametro'] = 'matricula';
    param5['tipo'] = 'String';
    param5['valor'] = this.model.matricula;
    params.push(param5);
    param6['nombreParametro'] = 'observaciones';
    param6['tipo'] = 'String';
    param6['valor'] = this.model.observaciones;
    params.push(param6);
    param10['nombreParametro'] = 'nombre_portador';
    param10['tipo'] = 'String';
    param10['valor'] = this.model.nombre;
    params.push(param10);
    param7['nombreParametro'] = 'apellido_paterno';
    param7['tipo'] = 'String';
    param7['valor'] = this.model.aPaterno;
    params.push(param7);
    param8['nombreParametro'] = 'apellido_materno';
    param8['tipo'] = 'String';
    param8['valor'] = this.model.aMaterno;
    params.push(param8);
    param9['nombreParametro'] = 'vigencia_registro';
    param9['tipo'] = 'String';
    param9['valor'] = this.fecha;
    params.push(param9);
    call['tipo'] = 'PUT';
    call['nombrePaquete'] = 'telefonista';
    call['nombreStoreProcedure'] = 'arma_involucrada';
    call['nombreMs'] = 'ms_demo';
    call['param'] = params;
    console.log(call);*/
    const endpointArmas = 'http://localhost:8686/api/arma/actualizarRegistroArma';
    this.http.post(endpointArmas, jsonchain).subscribe(
        (data) => {
          console.log(data);
          this.fetchArmas();
        }
    );
    const shadesE1 = document.querySelector('.boton-editar');
    const shadesE2 = document.querySelector('.tabla-arma');
    const shadesE3 = document.querySelector('.boton-add');
    shadesE1.classList.add('hide');
    shadesE2.classList.remove('hide');
    shadesE3.classList.remove('hide');
    this.model.selectedArma = null;
    this.model.selectedCat = null;
    this.model.marca = '';
    this.model.modelo = '';
    this.model.matricula = '';
    this.model.observaciones = '';
    this.model.nombre = '';
    this.model.aPaterno = '';
    this.model.aMaterno = '';
    this.model.vigencia = '';
  }
  close() {
    const shadesE1 = document.querySelector('.boton-editar');
    const shadesE2 = document.querySelector('.tabla-arma');
    const shadesE3 = document.querySelector('.boton-add');
    shadesE1.classList.add('hide');
    shadesE2.classList.remove('hide');
    shadesE3.classList.remove('hide');
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    }, 300);
    this.model.selectedArma = null;
    this.model.selectedCat = null;
    this.model.marca = '';
    this.model.modelo = '';
    this.model.matricula = '';
    this.model.observaciones = '';
    this.model.nombre = '';
    this.model.aPaterno = '';
    this.model.aMaterno = '';
    this.model.vigencia = '';
  }



}
export interface PeriodicElement {
  id_arma_involucrada: number;
  id_tipo_arma: number;
  nombre_tipo: string;
  id_categoria_arma: number;
  nombre_categoria: string;
  nombre_portador: string;
  apellido_paterno: string;
  apellido_materno: string;
  vigencia_registro: number;
  marca: string;
  modelo: String;
  matricula: string;
  observaciones: string;
}
let ELEMENT_DATA: PeriodicElement[];
