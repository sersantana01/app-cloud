import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PersonaModel } from './persona.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
// import * as $ from 'jquery';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] =
      ['nombre_tipo_persona', 'color_cabello', 'color_tez',
        'estatura', 'complexion', 'tipo_cabello', 'nombre_color_ojos', 'nombre_forma_cara', 'nombre_tipo_nariz', 'nombre',
        'apellido_paterno', 'apellido_materno', 'sexo', 'edad', 'Editar', 'Eliminar'];
  editedIndex: number;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  itemsSelectPersona = [];
  itemsSelectColor = [];
  itemsSelectTez = [];
  itemsSelectEstatura = [];
  itemsSelectComplexion = [];
  itemsSelectTipoCabello = [];
  itemsSelectColOjos = [];
  itemsSelectFormaCara = [];
  itemsSelectTipoNariz = [];
  itemsSelectVestPies = [];
  itemsSelectVestTalla = [];
  itemsSelectVestHead = [];
  itemsSelectVestLegs = [];
  itemsSelectVestColor = [];
  itemsSexo = [
    {id_sex: 1, name_sex: 'HOMBRE'},
    {id_sex: 2, name_sex: 'MUJER'}
  ];
  editedItem: {
    nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    edad: '',
    id_color_cabello: '',
    id_color_ojos: '',
    id_color_tez: '',
    id_color_vestimenta_cabeza: '',
    id_color_vestimenta_calzado: '',
    id_color_vestimenta_inferior: '',
    id_color_vestimenta_talle: '',
    id_complexion: '',
    id_estatura: '',
    id_forma_cara: '',
    id_persona_involucrada: '',
    id_tipo_cabello: '',
    id_tipo_nariz: '',
    id_tipo_persona: '',
    id_vestimenta_cabeza: '',
    id_vestimenta_calzado: '',
    id_vestimenta_inferior: '',
    id_vestimenta_talle: '',
    senia_particular: '',
    sexo: ''
  };
  defaultItem: {
    nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    edad: '',
    id_color_cabello: '',
    id_color_ojos: '',
    id_color_tez: '',
    id_color_vestimenta_cabeza: '',
    id_color_vestimenta_calzado: '',
    id_color_vestimenta_inferior: '',
    id_color_vestimenta_talle: '',
    id_complexion: '',
    id_estatura: '',
    id_forma_cara: '',
    id_persona_involucrada: '',
    id_tipo_cabello: '',
    id_tipo_nariz: '',
    id_tipo_persona: '',
    id_vestimenta_cabeza: '',
    id_vestimenta_calzado: '',
    id_vestimenta_inferior: '',
    id_vestimenta_talle: '',
    senia_particular: '',
    sexo: ''
  };
  idInvolvePerson = '';
  uuid = 5;
  dataRow = [];
  // id_evento = 64359;
  model = new PersonaModel(null, null, null, null, null, null,
      null, null, null, null, null, null,
      null, null, null, null, null, null,
      '', '', '', '', '');
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.personaInvol();
    this.getHairColor();
    this.getColorTez();
    this.getEstatura();
    this.getComplexion();
    this.getHairType();
    this.getEyeColor();
    this.getFaceShape();
    this.getNoseType();
    this.getVestLegs();
    this.getVestPies();
    this.getVestTalla();
    this.getVestHead();
    this.getVestColor();
    this.fetchPersonas();
  }
  public personaInvol() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getTipoPersonaInvolucrada';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectPersona = data['items'];
          console.log(this.itemsSelectPersona);
        });
  }
  public getHairColor() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getColorCabello';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectColor = data['items'];
          console.log(this.itemsSelectColor);
        });
  }
  public getColorTez() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getColorTez';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectTez = data['items'];
          console.log(this.itemsSelectTez);
        });
  }
  public getEstatura() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getEstatura';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectEstatura = data['items'];
          console.log(this.itemsSelectEstatura);
        });
  }
  public getComplexion() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getComplexion';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectComplexion = data['items'];
          console.log(this.itemsSelectComplexion);
        });
  }
  public getHairType() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getTipoCabello';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectTipoCabello = data['items'];
          console.log(this.itemsSelectTipoCabello);
        });
  }
  public getEyeColor() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getColorOjos';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectColOjos = data['items'];
          console.log(this.itemsSelectColOjos);
        });
  }
  public getFaceShape() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getFormaCara';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectFormaCara = data['items'];
          console.log(this.itemsSelectFormaCara);
        });
  }
  public getNoseType() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getTipoNariz';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectTipoNariz = data['items'];
          console.log(this.itemsSelectTipoNariz);
        });
  }
  public getVestPies() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getVestimentaPies';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectVestPies = data['items'];
          console.log(this.itemsSelectVestPies);
        });
  }
  public getVestTalla() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getVestimentaTalle';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectVestTalla = data['items'];
          console.log(this.itemsSelectVestTalla);
        });
  }
  public getVestHead() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getVestimentaCabeza';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectVestHead = data['items'];
          console.log(this.itemsSelectVestHead);
        });
  }
  public getVestLegs() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getVestimentaPiernas';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectVestLegs = data['items'];
          console.log(this.itemsSelectVestLegs);
        });
  }
  public getVestColor() {
    const json = { 'uuid': this.uuid};
    const endpointPersona = 'http://localhost:8989/api/personainvolucrada/getVestimentaColor';
    this.http.post(endpointPersona, json).subscribe(
        (data) => {
          this.itemsSelectVestColor = data['items'];
          console.log(this.itemsSelectVestColor);
        });
  }
  public fetchPersonas() {
    // $('#id_evento').html().trim();
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': 64359
    };
    const endpointArmas = 'http://localhost:8989/api/personainvolucrada/getRegistros';
    this.http.post(endpointArmas, jsonchain).subscribe(
        (x) => {
          this.dataRow = x['items'];
          console.log('Registros Personas');
          console.log(this.dataRow);
          ELEMENT_DATA = this.dataRow;
          console.log('ELEMENT DATA');
          console.log(ELEMENT_DATA);
          this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        });
  }
  public insertPersona() {
    const jsonchain = {
      'uuid': 5,
      'idEvento': 64359,
      'idTipoPersona': this.model.selectedPersona,
      'nombre': this.model.nombre,
      'apellidoPaterno': this.model.aPaterno,
      'apellidoMaterno': this.model.aMaterno,
      'idTipoCabello': this.model.selectedTipoCabello,
      'idColorCabello': this.model.selectedColor,
      'idColorTez': this.model.selectedTez,
      'idEstatura': this.model.selectedEstatura,
      'idComplexion': this.model.selectedComplexion,
      'seniaParticular': this.model.seniaParticular,
      'sexo': this.model.selectedSexo,
      'edad': this.model.edad,
      'idColorOjos': this.model.selectedColOjos,
      'idFormaCara': this.model.selectedFormaCara,
      'idTipoNariz': this.model.selectedTipoNariz,
      'idVestimentaCabeza': this.model.selectedVestHead,
      'idVestimentaTalle': this.model.selectedVestTalla,
      'idVestimentaInferior': this.model.selectedVestLegs,
      'idVestimentaCalzado': this.model.selectedVestPies,
      'idColorVestimentaCabeza': this.model.selectedColorVestHead,
      'idColorVestimentaTalle': this.model.selectedColorVestTalla,
      'idColorVestimentaInferior': this.model.selectedColorVestLegs,
      'idColorVestimentaCalzado': this.model.selectedColorVestPies
    };
    const endpointPersonaData = 'http://localhost:8989/api/personainvolucrada/insertarRegistroPersona';
    this.http.post(endpointPersonaData, jsonchain).subscribe(
        (data) => {
          console.log('Status');
          console.log(data);
          if (data !== null) {
            this.erase();
            this.fetchPersonas();
          } else {
            console.log('Error al enviar registro');
          }
        }
    );
  }
  editPersona(item) {
    const shadesE1 = document.querySelector('.boton-editar-persona');
    const shadesE2 = document.querySelector('.tabla-persona');
    const shadesE3 = document.querySelector('.add-boton-persona');
    shadesE1.classList.remove('hide');
    shadesE2.classList.add('hide');
    shadesE3.classList.add('hide');
    console.log('Edit item');
    console.log(item);
    this.editedIndex = this.dataRow.indexOf(item);
    this.editedItem = Object.assign({}, item);
    console.log('Edited Item');
    console.log(this.editedItem);
    this.fillForm();
  }
  deletePersona(item) {
    const index = this.dataRow.indexOf(item);
    console.log(index);
    this.idInvolvePerson = item.id_persona_involucrada;
    console.log(this.idInvolvePerson);
    const choise = confirm('¿Estás seguro de querer eliminar este registro?');
    if (choise !== false) {
      const jsonchain = {
        'uuid': this.uuid,
        'idPersonaInvolucrada': this.idInvolvePerson
      };
      const endpointPersonaData = 'http://localhost:8989/api/personainvolucrada/borrarRegistroPersona';
      this.http.post(endpointPersonaData, jsonchain).subscribe(
          (data) => {
            console.log(data);
            this.dataRow.splice(index, 1);
            this.fetchPersonas();
          }
      );
    }
  }
  erase() {
    this.model.selectedPersona = null;
    this.model.selectedSexo = null;
    this.model.selectedColor = null;
    this.model.selectedTez = null;
    this.model.selectedEstatura = null;
    this.model.selectedComplexion = null;
    this.model.selectedTipoCabello = null;
    this.model.selectedColOjos = null;
    this.model.selectedFormaCara = null;
    this.model.selectedTipoNariz = null;
    this.model.selectedVestPies = null;
    this.model.selectedVestTalla = null;
    this.model.selectedVestHead = null;
    this.model.selectedVestLegs = null;
    this.model.selectedColorVestHead = null;
    this.model.selectedColorVestTalla = null;
    this.model.selectedColorVestLegs = null;
    this.model.selectedColorVestPies = null;
    this.model.seniaParticular = '';
    this.model.nombre = '';
    this.model.aPaterno = '';
    this.model.aMaterno = '';
    this.model.edad = '';
  }
  fillForm() {
    this.model.selectedPersona = this.editedItem.id_tipo_persona;
    this.model.selectedSexo = this.editedItem.sexo;
    this.model.selectedColor = this.editedItem.id_color_cabello;
    this.model.selectedTez = this.editedItem.id_color_tez;
    this.model.selectedEstatura = this.editedItem.id_estatura;
    this.model.selectedComplexion = this.editedItem.id_complexion;
    this.model.selectedTipoCabello = this.editedItem.id_tipo_cabello;
    this.model.selectedColOjos = this.editedItem.id_color_ojos;
    this.model.selectedFormaCara = this.editedItem.id_forma_cara;
    this.model.selectedTipoNariz = this.editedItem.id_tipo_nariz;
    this.model.selectedVestPies = this.editedItem.id_vestimenta_calzado;
    this.model.selectedVestTalla = this.editedItem.id_vestimenta_talle;
    this.model.selectedVestHead = this.editedItem.id_vestimenta_cabeza;
    this.model.selectedVestLegs = this.editedItem.id_vestimenta_inferior;
    this.model.selectedColorVestHead = this.editedItem.id_color_vestimenta_cabeza;
    this.model.selectedColorVestTalla = this.editedItem.id_color_vestimenta_talle;
    this.model.selectedColorVestLegs = this.editedItem.id_color_vestimenta_inferior;
    this.model.selectedColorVestPies = this.editedItem.id_color_vestimenta_calzado;
    this.model.seniaParticular = this.editedItem.senia_particular;
    this.model.nombre = this.editedItem.nombre;
    this.model.aPaterno = this.editedItem.apellido_materno;
    this.model.aMaterno = this.editedItem.apellido_materno;
    this.model.edad = this.editedItem.edad;
  }
  close() {
    const shadesE1 = document.querySelector('.boton-editar-persona');
    const shadesE2 = document.querySelector('.tabla-persona');
    const shadesE3 = document.querySelector('.add-boton-persona');
    shadesE1.classList.add('hide');
    shadesE2.classList.remove('hide');
    shadesE3.classList.remove('hide');
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    }, 300);
  }
  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.dataRow[this.editedIndex], this.editedItem);
      console.log(this.editedItem);
    } else {
      this.dataRow.push(this.editedItem);
    }
    const jsonchain = {
      'uuid': 5,
      'idEvento': 64359,
      'idPersonaInvolucrada': this.editedItem.id_persona_involucrada,
      'idTipoPersona': this.model.selectedPersona,
      'nombre': this.model.nombre,
      'apellidoPaterno': this.model.aPaterno,
      'apellidoMaterno': this.model.aMaterno,
      'idTipoCabello': this.model.selectedTipoCabello,
      'idColorCabello': this.model.selectedColor,
      'idColorTez': this.model.selectedTez,
      'idEstatura': this.model.selectedEstatura,
      'idComplexion': this.model.selectedComplexion,
      'seniaParticular': this.model.seniaParticular,
      'sexo': this.model.selectedSexo,
      'edad': this.model.edad,
      'idColorOjos': this.model.selectedColOjos,
      'idFormaCara': this.model.selectedFormaCara,
      'idTipoNariz': this.model.selectedTipoNariz,
      'idVestimentaCabeza': this.model.selectedVestHead,
      'idVestimentaTalle': this.model.selectedVestTalla,
      'idVestimentaInferior': this.model.selectedVestLegs,
      'idVestimentaCalzado': this.model.selectedVestPies,
      'idColorVestimentaCabeza': this.model.selectedColorVestHead,
      'idColorVestimentaTalle': this.model.selectedColorVestTalla,
      'idColorVestimentaInferior': this.model.selectedColorVestLegs,
      'idColorVestimentaCalzado': this.model.selectedColorVestPies
    };
    const endpointPersonaData = 'http://localhost:8989/api/personainvolucrada/actualizarRegistroPersona';
    this.http.post(endpointPersonaData, jsonchain).subscribe(
        (data) => {
          console.log(data);
          this.fetchPersonas();
        }
    );
    const shadesE1 = document.querySelector('.boton-editar-persona');
    const shadesE2 = document.querySelector('.tabla-persona');
    const shadesE3 = document.querySelector('.add-boton-persona');
    shadesE1.classList.add('hide');
    shadesE2.classList.remove('hide');
    shadesE3.classList.remove('hide');
    this.erase();
  }
}
export interface PeriodicElement {
  nombre_tipo_persona: string;
  color_cabello: string;
  color_tez: string;
  estatura: string;
  complexion: number;
  tipo_cabello: string;
  nombre_color_ojos: number;
  nombre_forma_cara: string;
  nombre_tipo_nariz: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  edad: string;
}
let ELEMENT_DATA: PeriodicElement[];
