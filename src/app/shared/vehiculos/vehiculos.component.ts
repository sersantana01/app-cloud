import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { AutoModel } from './vehiculo.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import swal from 'sweetalert2';

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
// Servicios
  endpointAutoType = 'http://localhost:9098/obtenerCatalogoTipoVehiculo'; // 'http://3.14.155.2:9098/obtenerCatalogoTipoVehiculo';
  endpointAutoMarca = 'http://localhost:9098/obtenerCatalogoMarca'; // 'http://3.14.155.2:9098/obtenerCatalogoMarca';
  endpointAutoModelo = 'http://localhost:9098/obtenerModeloVehiculo'; // 'http://3.14.155.2:9098/obtenerModeloVehiculo'
  endpointAutoColor = 'http://localhost:9098/obtenerCatalogoColorVehiculo'; // 'http://3.14.155.2:9098/obtenerCatalogoColorVehiculo';
  endpointAutoRastreo = 'http://localhost:9098/obtenerCatalogoTipoRastreo'; // 'http://3.14.155.2:9098/obtenerCatalogoTipoRastreo';
  endpointInsertAuto =     'http://localhost:9098/insertarRegistroVehiculo'; // 'http://3.14.155.2:9098/insertarRegistroVehiculo';
  endpointfetchAutos = 'http://localhost:9098/obtenerRegistroVehiculo'; // 'http://3.14.155.2:9098/obtenerRegistroVehiculo';
  endpointActualizarAuto = 'http://localhost:9098/actualizarRegistroVehiculo';  // 'http://3.14.155.2:9098/actualizarRegistroVehiculo';
  endpointDeleteAuto =  'http://localhost:9098/eliminarRegistroVehiculo'; // 'http://3.14.155.2:9098/eliminarRegistroVehiculo';
// -----------
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
    document.getElementById('EditarAutoTitle').style.display = 'none';
    document.getElementById('botonesEditarAuto').style.display = 'none';
    this.dataSource.paginator = this.paginator;
    this.getCarType();
    this.getCarBrand();
    this.getCarModel();
    this.getCarColor();
    this.getCarTrack();
    this.fetchAutos();
  }
  close() {
    document.getElementById('envolventeAgregarVehiculo').style.display = 'block';
    document.getElementById('tabla-auto').style.display = 'block';
    document.getElementById('RegistroAutoTitle').style.display = 'block';
    document.getElementById('botonInsertarAuto').style.display = 'block';
    document.getElementById('botonesEditarAuto').style.display = 'none';
    document.getElementById('EditarAutoTitle').style.display = 'none';
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
    this.http.post(this.endpointAutoType, json).subscribe(
        (data) => {
          this.itemsSelectTipo = data['items'];
          console.log(this.itemsSelectTipo);
        });
  }
  public getCarBrand() {
    const json = {
      'uuid': this.uuid
    };
    this.http.post(this.endpointAutoMarca, json).subscribe(
        (data) => {
          this.itemsSelectMarca = data['items'];
          console.log(this.itemsSelectMarca);
        });
  }
  public getCarModel() {
    const json = {
      'uuid': this.uuid
    };
    this.http.post(this.endpointAutoModelo, json).subscribe(
        (data) => {
          this.itemsSelectModelo = data['items'];
          console.log(this.itemsSelectModelo);
        });
  }
  public getCarColor() {
    const json = {
      'uuid': this.uuid
    };
    this.http.post(this.endpointAutoColor, json).subscribe(
        (data) => {
          this.itemsSelectColor = data['items'];
          console.log(this.itemsSelectColor);
        });
  }
  public getCarTrack() {
    const json = {
      'uuid': this.uuid
    };
    this.http.post(this.endpointAutoRastreo, json).subscribe(
        (data) => {
          this.itemsSelectRastreo = data['items'];
          console.log(this.itemsSelectRastreo);
        });
  }
  public insertAuto() {
    const jsonchain = {
      'uuid': this.uuid,
      'idEvento': $('#id_evento').html().trim(),
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
    console.log(jsonchain);
    this.http.post(this.endpointInsertAuto, jsonchain).subscribe(
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
      'idEvento': $('#id_evento').html().trim()
    };
    this.http.post(this.endpointfetchAutos, jsonchain).subscribe(
        (x) => {
          this.dataRow = x['items'];
          ELEMENT_DATA = this.dataRow;
          console.log(ELEMENT_DATA);
          this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
        });
  }
  editAuto(item) {
    document.getElementById('RegistroAutoTitle').style.display = 'none';
    document.getElementById('tabla-auto').style.display = 'none';
    document.getElementById('EditarAutoTitle').style.display = 'block';
    document.getElementById('envolventeAgregarVehiculo').style.display = 'block';
    document.getElementById('botonInsertarAuto').style.display = 'none';
    document.getElementById('botonesEditarAuto').style.display = 'block';
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
      'idEvento': $('#id_evento').html().trim(),
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
    this.http.post(this.endpointActualizarAuto, jsonchain).subscribe(
        (data) => {
          console.log(data);
          this.fetchAutos();
        }
    );
    document.getElementById('envolventeAgregarVehiculo').style.display = 'block';
    document.getElementById('tabla-auto').style.display = 'block';
    document.getElementById('RegistroAutoTitle').style.display = 'block';
    document.getElementById('botonInsertarAuto').style.display = 'block';
    document.getElementById('botonesEditarAuto').style.display = 'none';
    document.getElementById('EditarAutoTitle').style.display = 'none';
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
    this.showSwal(item);
    /*console.log('Delete item');
    console.log(item);
    const index = this.dataRow.indexOf(item);
    console.log(index);
    this.idInvolveAuto = item.id_vehiculo_involucrado;
    console.log(this.idInvolveAuto);
    const choise = confirm('¿Estás seguro de querer eliminar este registro?');
    if (choise !== false) {
      const jsonchain = {
        'uuid': this.uuid,
        'idVehiculoInvolucrado': this.idInvolveAuto
      };
      this.http.post(this.endpointDeleteAuto, jsonchain).subscribe(
          (data) => {
            console.log(data);
            this.dataRow.splice(index, 1);
            this.fetchAutos();
          }
      );
    }*/
  }

  // SweetAlert
  showSwal(item) {
  this.idInvolveAuto = item.id_vehiculo_involucrado;
    const jsonchain = {
      'uuid': this.uuid,
      'idVehiculoInvolucrado': this.idInvolveAuto
    };
    const index = this.dataRow.indexOf(item);
    swal({
      title: '¿Estás seguro?',
      text: 'Esta acción es irreversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: '¡Si, borrar registro!',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.http.post(this.endpointDeleteAuto, jsonchain).subscribe(
            (data) => {
              console.log(data);
              this.dataRow.splice(index, 1);
              this.fetchAutos();
            }
        );
        swal(
            {
              title: '¡Borrado!',
              text: 'El registro ha sido eliminado.',
              type: 'success',
              confirmButtonClass: 'btn btn-success',
              buttonsStyling: false
            }
        );
      }
    });
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
