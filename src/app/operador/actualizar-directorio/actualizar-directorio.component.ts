import { Component, OnInit } from '@angular/core';
import { ActualizarDirectorioService } from './actualizar-directorio.service';

//const tipoTelefonos = [] as  any;

@Component({
  selector: 'app-actualizar-directorio',
  templateUrl: './actualizar-directorio.component.html',
  styleUrls: ['./actualizar-directorio.component.css'],
  providers: [ ActualizarDirectorioService ]
})
export class ActualizarDirectorioComponent implements OnInit {
  private uuid: string = '5';
  private telefono: string;
  private nombre: string;
  private apellidoPaterno: string;
  private apellidoMaterno: string;
  private estados: [];
  private municipios: [];
  private colonias: [];
  private callePrincipal: string;
  private entreCalle: string;
  private yCalle: string;
  private numero: string;

  public tiposTelefono = [];

  public telefonoSeleccionado: any;
  public estadoSeleccionado: any;
  public municipioSeleccionado: any;
  public coloniaSeleccionada: any;

  public validarTelefono: boolean = false;
  public validarEstado: boolean = false;
  public validarMunicipio: boolean = false;

  constructor(private actualizarDirectorioService: ActualizarDirectorioService) { }

  ngOnInit() {
    this.getCatalogoTipoTelefono();
    this.getCatalogoEstados();
    this.getCatalogoMunicipios();
    this.getCatalogoColonias();
  }

  public enviarDirectorio() {
    let urlGetInsertarDirectorio = 'http://3.14.155.2:9096/api/telefonoemergencia/insertarDirectorio';
    let json = {};

    if(this.uuid == '') {
      return;
    } 

    if(this.telefono == '') {
      this.validarTelefono = true;
      return;
    }

    if(this.estadoSeleccionado == '') {
      this.validarEstado = true;
      return;
    }

    if(this.municipioSeleccionado == '') {
      this.validarMunicipio = true;
      return;
    }

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

    this.actualizarDirectorioService.insertDirectorio(urlGetInsertarDirectorio, json).subscribe(
      (response) => {
        var respuesta = response["ID_CONTACTO"];
        if(respuesta != null || respuesta != '') {
          this.cancelar();
          $('#actualizarDirectorio').hide();
          this.validarTelefono = false;
          this.validarEstado = false;
          this.validarMunicipio = false;
        }
      }
    );
  }

  public insertaIdMunicipio() {
    
  }

  public cancelar() {
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

  public getCatalogoTipoTelefono() {
    var tipo1 = { 'tipo_telefono': 'NO_ESPECIFICADO' };
    var tipo2 = { 'tipo_telefono': 'PARTCULAR' };
    var tipo3 = { 'tipo_telefono': 'PUBLICO' };
    var tipo4 = { 'tipo_telefono': 'CELULAR' };

    this.tiposTelefono.push(tipo1);
    this.tiposTelefono.push(tipo2);
    this.tiposTelefono.push(tipo3);
    this.tiposTelefono.push(tipo4);
  }

  public getCatalogoEstados() {
    let urlGetEstado = 'http://3.14.155.2:9096/api/telefonoemergencia/getEstados';

    let json = {};
    json['uuid'] = this.uuid;

    this.actualizarDirectorioService.getEstados(urlGetEstado, json).subscribe(
      (response) => {
        this.estados = response["items"];
      }
    );
  }

  public getCatalogoMunicipios() {
    let urlGetMunicipio = 'http://3.14.155.2:9096/api/telefonoemergencia/getMunicipios';

    let json = {};
    json['uuid'] = this.uuid;

    this.actualizarDirectorioService.getMunicipios(urlGetMunicipio, json).subscribe(
      (response) => {
        this.municipios = response["items"];
      }
    );
  }

  public getCatalogoColonias() {
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
