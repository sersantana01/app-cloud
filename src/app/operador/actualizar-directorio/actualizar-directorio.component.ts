import { Component, OnInit } from '@angular/core';
import { ActualizarDirectorioService } from './actualizar-directorio.service';
import { NotificacionService } from 'src/app/notificacion/notificacion.service';

@Component({
  selector: 'app-actualizar-directorio',
  templateUrl: './actualizar-directorio.component.html',
  styleUrls: ['./actualizar-directorio.component.css'],
  providers: [ ActualizarDirectorioService ]
})
export class ActualizarDirectorioComponent implements OnInit {
  uuid: string = '5';
  telefono: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  estados: [];
  municipios: [];
  colonias: [];
  callePrincipal: string;
  entreCalle: string;
  yCalle: string;
  numero: string;
  tiposTelefono = [];
  sexo = [];
  edad: string;
  telefonoSeleccionado: any;
  estadoSeleccionado: any;
  municipioSeleccionado: any;
  coloniaSeleccionada: any;
  sexoSeleccionado: any;
  validarTelefono: boolean = false;
  validarEstado: boolean = false;
  validarMunicipio: boolean = false;
  validarTipoNumero: boolean = false;
  validarNombre: boolean = false;
  validarApellidoPaterno: boolean = false;
  validarApellidoMaterno: boolean = false;
  validarColonia: boolean = false;
  validarCallePrincipal: boolean = false;
  validarEntreCalle: boolean = false;
  validarYCalle: boolean = false;
  validarNumero: boolean = false;
  validarSexo: boolean = false;
  validarEdad: boolean = false;
  readonly notifier: NotificacionService;

  constructor(private actualizarDirectorioService: ActualizarDirectorioService, 
    private notifierService: NotificacionService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getCatalogoTipoTelefono();
    this.getCatalogoEstados();
    this.getCatalogoMunicipios();
    this.getCatalogoColonias();
    this.getCatalogoSexo();
  }

  enviarDirectorio() {
    let urlGetInsertarDirectorio = 'http://3.14.155.2:9096/api/telefonoemergencia/insertarDirectorio';
    let json = {};

    if(typeof this.telefono === "undefined") {
      this.validarTelefono = true;
    } else {
      this.validarTelefono = false;
    }

    if(typeof this.estadoSeleccionado === "undefined") {
      this.validarEstado = true;
    } else {
      this.validarEstado = false;
    }

    if(typeof this.municipioSeleccionado === "undefined") {
      this.validarMunicipio = true;
    } else {
      this.validarMunicipio = false;
    }

    if(typeof this.telefonoSeleccionado === "undefined") {
      this.validarTipoNumero = true;
    } else {
      this.validarTipoNumero = false;
    }

    if(typeof this.coloniaSeleccionada === "undefined") {
      this.validarColonia = true;
    } else {
      this.validarColonia = false;
    }

    if(typeof this.nombre === "undefined") {
      this.validarNombre = true;
    } else {
      this.validarNombre = false;
    }

    if(typeof this.apellidoPaterno === "undefined") {
      this.validarApellidoPaterno = true;
    } else {
      this.validarApellidoPaterno = false;
    }

    if(typeof this.apellidoMaterno === "undefined") {
      this.validarApellidoMaterno = true;
    } else {
      this.validarApellidoMaterno = false;
    }

    if(typeof this.callePrincipal === "undefined") {
      this.validarCallePrincipal = true;
    } else {
      this.validarCallePrincipal = false;
    }

    if(typeof this.entreCalle === "undefined") {
      this.validarEntreCalle = true;
    } else {
      this.validarEntreCalle = false;
    }

    if(typeof this.yCalle === "undefined") {
      this.validarYCalle = true;
    } else {
      this.validarYCalle = false;
    }

    if(typeof this.numero === "undefined") {
      this.validarNumero = true;
    } else {
      this.validarNumero = false;
    }

    if(typeof this.sexo === "undefined") {
      this.validarSexo = true;
    } else {
      this.validarSexo = false;
    }

    if(typeof this.edad === "undefined") {
      this.validarEdad = true;
    } else {
      this.validarEdad = false;
    }

    if(this.validarTelefono || this.validarEstado || this.validarMunicipio || this.validarTipoNumero ||
        this.validarColonia || this.validarNombre || this.validarApellidoPaterno || this.validarApellidoMaterno ||
        this.validarCallePrincipal || this.validarEntreCalle || this.validarYCalle || this.validarNumero ||
        this.validarSexo || this.validarEdad) {
      $('#actualizarDirectorio').show();
    } else {
      json['uuid'] = this.uuid;
      json['telefono'] = this.telefono;
      json['tipoTelefono'] = this.telefonoSeleccionado['tipo_telefono'];
      json['nombre'] = this.nombre;
      json['apellidoPaterno'] = this.apellidoPaterno;
      json['apellidoMaterno'] = this.apellidoMaterno;
      json['idEstado'] = this.estadoSeleccionado['id_estado'];
      json['idMunicipio'] = this.municipioSeleccionado['id_municipio'];
      json['idColonia'] = this.coloniaSeleccionada['id_colonia'];
      json['callePrincipal'] = this.callePrincipal;
      json['entreCalle'] = this.entreCalle;
      json['yCalle'] = this.yCalle;
      json['numero'] = this.numero;
      json['edad'] = this.edad;
      json['sexo'] = this.sexoSeleccionado['nombre_sexo'];
      json['idZonaPatrullaje'] = 9;

      this.actualizarDirectorioService.insertDirectorio(urlGetInsertarDirectorio, json).subscribe(
        (response) => {
          var respuesta = response["ID_DIRECTORIO"];
          if(respuesta != null || respuesta != '') {
            this.cancelar();
            $('#actualizarDirectorio').hide();
            this.notifier.showNotification ('top','center', 'Se ha actualizado un directorio', 'success' );
          }
        }
      );
    }
  }

  insertaIdMunicipio() {
    let urlInsertaIdMunicipio = 'http://3.14.155.2:9096/api/telefonoemergencia/filtrarMunicipioColonia';
    let json = {};

    json['uuid'] = this.uuid;
    json['idMunicipio'] = this.municipioSeleccionado["id_municipio"];

    this.actualizarDirectorioService.getCatalogoColoniaPorIdMunicipio(urlInsertaIdMunicipio, json).subscribe(
      (response) => {
        this.colonias = response['items'];
      }
    );
  }

  cancelar() {
    this.telefono = '';
    this.telefonoSeleccionado = null;
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.estadoSeleccionado = null;
    this.coloniaSeleccionada = null;
    this.municipioSeleccionado = null;
    this.callePrincipal = '';
    this.entreCalle = '';
    this.yCalle = '';
    this.numero = '';
  }

  getCatalogoTipoTelefono() {
    let tipo1 = { 'tipo_telefono': 'SIN INFORMACION' };
    let tipo2 = { 'tipo_telefono': 'PARTICULAR' };
    let tipo3 = { 'tipo_telefono': 'PUBLICO' };
    let tipo4 = { 'tipo_telefono': 'PRIVADO' };
    let tipo5 = { 'tipo_telefono': 'MOVIL' };

    this.tiposTelefono.push(tipo1);
    this.tiposTelefono.push(tipo2);
    this.tiposTelefono.push(tipo3);
    this.tiposTelefono.push(tipo4);
    this.tiposTelefono.push(tipo5);
  }

  getCatalogoSexo() {
    let sexo1 = { 'nombre_sexo': 'HOMBRE' };
    let sexo2 = { 'nombre_sexo': 'MUJER' };

    this.sexo.push(sexo1);
    this.sexo.push(sexo2);
  }

  getCatalogoEstados() {
    let urlGetEstado = 'http://3.14.155.2:9096/api/telefonoemergencia/getEstados';
    let json = {};

    json['uuid'] = this.uuid;

    this.actualizarDirectorioService.getEstados(urlGetEstado, json).subscribe(
      (response) => {
        this.estados = response["items"];
      }
    );
  }

  getCatalogoMunicipios() {
    let urlGetMunicipio = 'http://3.14.155.2:9096/api/telefonoemergencia/getMunicipios';
    let json = {};
    
    json['uuid'] = this.uuid;

    this.actualizarDirectorioService.getMunicipios(urlGetMunicipio, json).subscribe(
      (response) => {
        this.municipios = response["items"];
      }
    );
  }

  getCatalogoColonias() {
    let urlGetColonias = 'http://3.14.155.2:9096/api/telefonoemergencia/getColonias';
    let json = {};

    json['uuid'] = this.uuid;

    this.actualizarDirectorioService.getColonias(urlGetColonias, json).subscribe(
      (response) => {
        this.colonias = response["items"];
      }
    );
  }
}
