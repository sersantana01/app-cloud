import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroLlamadaService } from '../../operador/llamadaReal/registro-llamada/registro-llamada.service';
import {Evento} from '../../models/evento.model';
import {Denunciante} from '../../models/denunciante.model';
import {NotificacionService} from '../../notificacion/notificacion.service';
//import {MatDatepickerInputEvent } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatTableDataSource} from '@angular/material/table';

import * as moment from 'moment';
import {MatIconModule} from '@angular/material/icon'


@Component({
  selector: 'app-consulta-llamada',
  templateUrl: './consulta-llamada.component.html',
  styleUrls: ['./consulta-llamada.component.css'],
 
 
})
export class ConsultaLlamadaComponent implements OnInit {


  private readonly notifier: NotificacionService;

  public uuid=5;

  

  public endpointMotivos ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos";
  public endpointOrigenes="http://3.14.155.2:9091/api/llamadaReal/obtenerOrigenes";
  public endpointBusqueda ="http://3.14.155.2:9091/api/llamadaReal/consultaLlamada";
  
  public endpointEventoById ="http://3.14.155.2:9091/api/llamadaReal/getEventoById";
/*
  public endpointMotivos ="http://localhost:9091/api/llamadaReal/obtenerMotivos";
    public endpointOrigenes="http://localhost:9091/api/llamadaReal/obtenerOrigenes";
  public endpointBusqueda ="http://localhost:9091/api/consultas/consultaLlamada";*/
  //public endpointBusqueda ="http://3.14.155.2:9091/api/llamadaReal/consultaLlamada";
     

  public endpointMunicipios = "http://3.14.155.2:9096/api/telefonoemergencia/getMunicipios";
  public endpointColonias = "http://3.14.155.2:9096/api/telefonoemergencia/getColonias";
  
    
  public itemsSelectMotivos=[];   //Lista de motivos 
  
  public itemsSelectOrigenes=[];   //Lista de motivos 
  
  public itemsSelectPrioridad=["URGENTE","RAPIDA","NORMAL"];     
  public itemsSelectEstatus=["HISTORICO","ATENDIDA","ACTIVO","CULMINADO","TERMINADO"];
  public itemsSelectCiudades=[   ];
  public itemsSelectColonias=[   ];

  public eventoSeleccionado: Evento;

  public listaLlamadasCoincidencia=[];
  public mostrarBusquedas=true;


  public consultaMotivo:any;     //motivo seleccionado
  public consultaOrigen:any;     
  public consultaPrioridad:any;
  public consultaEstatus:any;
  public consultaCiudad:any;
  public consultaColonia:any;
  
  public busq_ciudad;  
  public busq_colonia;
  public busq_calle;
  public busq_claveOper;
  public busq_folioDesde;
  public busq_folioHasta;  
  public busq_numeroTelefono;
  public busq_desc;
   
  public busq_latitud; //x
  public busq_longitud;//y

  public busq_general;

  public rolUsuario;

  public busq_fechaDesde;
  public busq_fechaHasta;  


  public offsetNext=0; // variable para controlar el paginado hacia la BD
  public offsetActual=0; // variable para controlar el paginado hacia la BD
  public offsetPrev=0; // variable para controlar el paginado hacia la BD
 
  public hasMore;


  public paginaActual=0;           // PAGINA ACTUAL QUE MUESTRA EL PAGINADO
  public totalBusquedaRegistros=0; // COUNT  DE TODOS LOS REGISTROS
  public totalPaginas=0;           // PAGINAS TOTALES DE LA CONSULTA


  public footerFilterFlag=true;                                            //FLAG PARA MOSTRAR CUANDO HAY REGISTROS EN EL FILTRO O NO
  public muestraListaFlag=false;

  public busqBasica=true;

  public dataSource:any;   
  
 public displayedColumns: string[] =
  ['registro', 'fecha_inicio', 'nombre_motivo','folio','numero_telefono','nombre_municipio',
  'nombre_colonia','creadoPorNombre' ,'icono' ];  //COLUMNAS QUE SE DESPLIEGAN EN LA TABLA

  public dataTel= {"items":[{"uuid":5,"id_telefono_emergencia":77,"nombre_tel_emergencia":"Nery","telefono1":"45713586465","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":76,"nombre_tel_emergencia":"PRUEBA","telefono1":"465665789","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":75,"nombre_tel_emergencia":"PRUEBA","telefono1":"465665789","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":74,"nombre_tel_emergencia":"AMIGO","telefono1":"48563893425","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":73,"nombre_tel_emergencia":"PRUEBA","telefono1":"465665789","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":72,"nombre_tel_emergencia":"PRUEBA","telefono1":"465665789","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":71,"nombre_tel_emergencia":"ARTUR","telefono1":"48563893425","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":70,"nombre_tel_emergencia":"ARTUR","telefono1":"48563893425","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":69,"nombre_tel_emergencia":"TEL YOS","telefono1":"538475223","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":66,"nombre_tel_emergencia":null,"telefono1":null,"telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":65,"nombre_tel_emergencia":"Precidente col hidalgo","telefono1":"89457863","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":64,"nombre_tel_emergencia":"Presidencia Municipal Naucalpan","telefono1":null,"telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":60,"nombre_tel_emergencia":"Presidencia Municipal Nuevo Ideal","telefono1":"6778730831","telefono2":null,"extension1":null,"extension2":null},
  {"uuid":5,"id_telefono_emergencia":59,"nombre_tel_emergencia":"Presidencia Municipal Nombre de Dios","telefono1":"6758780016","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":58,"nombre_tel_emergencia":"Presidencia Municipal Nazas","telefono1":"6717660309","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":57,"nombre_tel_emergencia":"Presidencia Municipal Mapimi","telefono1":"8727622109","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":56,"nombre_tel_emergencia":"Presidencia Municipal Lerdo","telefono1":"8717252241","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":55,"nombre_tel_emergencia":"Presidencia Municipal Inde","telefono1":"6495263056","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":54,"nombre_tel_emergencia":"Presidencia Municipal Hidalgo","telefono1":"6295266006","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":53,"nombre_tel_emergencia":"Presidencia Municipal Guanacevy","telefono1":"6748845048","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":52,"nombre_tel_emergencia":"Presidencia Municipal Guadalupe Victoria","telefono1":"6768820424","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":51,"nombre_tel_emergencia":"Presidencia Municipal Gomez Palacio","telefono1":"8717149848","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":50,"nombre_tel_emergencia":"Presidencia Municipal el Salto Pueblo Nuevo","telefono1":"6758760009","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":49,"nombre_tel_emergencia":"Presidencia Municipal el Oro","telefono1":"6495260041","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":48,"nombre_tel_emergencia":"Presidencia Municipal Cuencame","telefono1":"6717630137","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":47,"nombre_tel_emergencia":"Presidencia Municpal Coneto de Comonfort","telefono1":"6778746016","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":46,"nombre_tel_emergencia":"Presidencia Municipal Canelas","telefono1":"6748640014","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":45,"nombre_tel_emergencia":"Presidencia Municipal Canatlan","telefono1":"6778720450","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":44,"nombre_tel_emergencia":"Angeles Verdes","telefono1":"78","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":43,"nombre_tel_emergencia":"Albergue Municipal","telefono1":"1286006","telefono2":"1286006","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":42,"nombre_tel_emergencia":"Pipas Guerecas","telefono1":"8127156","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":41,"nombre_tel_emergencia":"Sagarpa","telefono1":"8291800","telefono2":"78261","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":40,"nombre_tel_emergencia":"Consejo Estatal de Seguridad Publica","telefono1":"8176168","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":39,"nombre_tel_emergencia":"Cereso","telefono1":"8140204","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":38,"nombre_tel_emergencia":"D.a.p.","telefono1":"1500366","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":37,"nombre_tel_emergencia":"Obras Publicas","telefono1":"813 39 55","telefono2":"811 08 10","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":36,"nombre_tel_emergencia":"Trasporte del Estado","telefono1":"8171242","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":35,"nombre_tel_emergencia":"Taxis Alianza","telefono1":"8293283","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":34,"nombre_tel_emergencia":"Taxis Alianza","telefono1":"8175656","telefono2":"8181444","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":33,"nombre_tel_emergencia":"Aguas del Municipio","telefono1":"1500609","telefono2":"1500600","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":32,"nombre_tel_emergencia":"Semefo","telefono1":"8175550","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":31,"nombre_tel_emergencia":"Semarnap","telefono1":"8270200","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":30,"nombre_tel_emergencia":"Salubridad","telefono1":"8174760","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":29,"nombre_tel_emergencia":"Reparacion de Lineas","telefono1":"50","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":28,"nombre_tel_emergencia":"Protecion Ciudadana Demarc. Norte","telefono1":"1378120","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":27,"nombre_tel_emergencia":"Protecion Ciudadana Carr. Mexico","telefono1":"1378100","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":26,"nombre_tel_emergencia":"Profeco","telefono1":"8253325","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":25,"nombre_tel_emergencia":"Policia Federal de Caminos","telefono1":"8143620","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":24,"nombre_tel_emergencia":"Afi = Pgr","telefono1":"8290817","telefono2":"7374842","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":23,"nombre_tel_emergencia":"P.g.j.","telefono1":"8175726","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":22,"nombre_tel_emergencia":"Larga Distancia Nacional","telefono1":"20","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":21,"nombre_tel_emergencia":"Instituto de la Mujer Duranguense","telefono1":"8255794","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":20,"nombre_tel_emergencia":"Issste Emergencia","telefono1":"8130840T","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":19,"nombre_tel_emergencia":"Inspectores Municipales","telefono1":"1378315","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":18,"nombre_tel_emergencia":"Incap (academia de Policia)","telefono1":"8118189","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":17,"nombre_tel_emergencia":"Imss 50","telefono1":"8142045","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":16,"nombre_tel_emergencia":"Imss 49","telefono1":"8253395","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":15,"nombre_tel_emergencia":"Imss 44","telefono1":"8130022","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":14,"nombre_tel_emergencia":"Imss 1","telefono1":"8119820","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":13,"nombre_tel_emergencia":"Hospital Psiquiatrico","telefono1":"8141096","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":12,"nombre_tel_emergencia":"Hospital General","telefono1":"8130011","telefono2":"8119115","extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":11,"nombre_tel_emergencia":"Hospital del Niño","telefono1":"8130084","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":10,"nombre_tel_emergencia":"Hora Exacta","telefono1":"30","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":9,"nombre_tel_emergencia":"Gruas Santa Fe","telefono1":"8188967","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":8,"nombre_tel_emergencia":"Gruas Sanchez","telefono1":"8110941","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":7,"nombre_tel_emergencia":"Gruas Carrillo","telefono1":"8170063","telefono2":null,"extension1":null,"extension2":null},{"uuid":5,"id_telefono_emergencia":6,"nombre_tel_emergencia":"Ejercito","telefono1":"8117744","telefono2":null,"extension1":null,"extension2":null}],"hasMore":false,"limit":0,"offset":0,"count":67,"links":[{"rel":"self","href":"http://18.222.125.22:8081/ords/pxc50001/catalogo/cat_tel_emergencia"},{"rel":"edit","href":"http://18.222.125.22:8081/ords/pxc50001/catalogo/cat_tel_emergencia"},{"rel":"describedby","href":"http://18.222.125.22:8081/ords/pxc50001/metadata-catalog/catalogo/item"}]}

  public setDataTest(){


    console.log("HOLA HOLA");

  }


  public dataTest= {
    "Paginado": "20", 
    "Total_registro": [
        {
            "total": 58
        }
    ],
    "vSalida": [
        {
            "registro": 41,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "789",
            "estatus": "HISTORICO",
            "folio": "00260005000000000447",
            "descripcion": "iuop",
            "fecha_creacion": "2019-05-17T18:02:03Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 42,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "89",
            "estatus": "HISTORICO",
            "folio": "00260005000000000466",
            "descripcion": "yui",
            "fecha_creacion": "2019-05-17T18:46:11Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 43,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "234",
            "estatus": "HISTORICO",
            "folio": "00260005000000000480",
            "descripcion": "Tre",
            "fecha_creacion": "2019-05-20T14:29:40Z",
            "latitud": "19.00001",
            "longitud": "-31.5555",
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 44,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "234",
            "estatus": "HISTORICO",
            "folio": "00260005000000000480",
            "descripcion": "<br>GOAL",
            "fecha_creacion": "2019-05-20T14:29:40Z",
            "latitud": "19.00001",
            "longitud": "-31.5555",
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 45,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "RAPIDA",
            "numero_telefono": "123",
            "estatus": "HISTORICO",
            "folio": "00260005000000000488",
            "descripcion": "sd",
            "fecha_creacion": "2019-05-20T16:40:12Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 46,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000494",
            "descripcion": "ghj",
            "fecha_creacion": "2019-05-20T17:41:02Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 47,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "123",
            "estatus": "HISTORICO",
            "folio": "00260005000000000531",
            "descripcion": "dasd",
            "fecha_creacion": "2019-05-21T19:34:55Z",
            "latitud": "19.0001",
            "longitud": "-31.5555",
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 48,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "123",
            "estatus": "HISTORICO",
            "folio": "00260005000000000531",
            "descripcion": "<br>345",
            "fecha_creacion": "2019-05-21T19:34:55Z",
            "latitud": "19.0001",
            "longitud": "-31.5555",
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 49,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "123",
            "estatus": "HISTORICO",
            "folio": "00260005000000000531",
            "descripcion": "<br>234",
            "fecha_creacion": "2019-05-21T19:34:55Z",
            "latitud": "19.0001",
            "longitud": "-31.5555",
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 50,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "2134",
            "estatus": "HISTORICO",
            "folio": "00260005000000000575",
            "descripcion": "dfrg",
            "fecha_creacion": "2019-05-22T16:43:57Z",
            "latitud": "19.0001",
            "longitud": "-31.5555",
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 51,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "2479739839",
            "estatus": "HISTORICO",
            "folio": "00260005000000000162",
            "descripcion": null,
            "fecha_creacion": "2019-05-09T21:05:39Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 52,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "NORMAL",
            "numero_telefono": "2479739839",
            "estatus": "HISTORICO",
            "folio": "00260005000000000217",
            "descripcion": null,
            "fecha_creacion": "2019-05-13T22:27:44Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 53,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "555890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000040",
            "descripcion": null,
            "fecha_creacion": "2019-04-22T22:16:28Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 54,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "555890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000039",
            "descripcion": null,
            "fecha_creacion": "2019-04-22T22:16:26Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 55,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "555890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000041",
            "descripcion": null,
            "fecha_creacion": "2019-04-22T22:18:06Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 56,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "555890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000042",
            "descripcion": null,
            "fecha_creacion": "2019-04-22T22:18:32Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 57,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "555890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000038",
            "descripcion": null,
            "fecha_creacion": "2019-04-22T22:14:36Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        },
        {
            "registro": 58,
            "nombre_motivo": "ACCIDENTE FERROVIARIO CON LESIONADOS ",
            "nombre_origen": "TELEFONÍA MÓVIL",
            "prioridad": "URGENTE",
            "numero_telefono": "555890",
            "estatus": "HISTORICO",
            "folio": "00260005000000000043",
            "descripcion": null,
            "fecha_creacion": "2019-04-22T22:24:59Z",
            "latitud": null,
            "longitud": null,
            "nombre_estado": null,
            "nombre_municipio": null,
            "nombre_colonia": null,
            "calle": null
        }
    ]
} ;


  public dataTest2={
                "Paginado": "20",
                "Total_registro": [
                    {
                        "total": 0
                    }
                ],
                "vSalida": []
            };


  public dataResponse:any;

  public setMostrarBusquedas() {

   this. mostrarBusquedas=true;
  //  $("#buttoon").focus();
   // document.getElementById('buttoon').focus();

  }
  
  public setFinal() {
  //  this.events.push(`${type}: ${event.value}`);
      //alert("GOL");
 
      //console.log("TR");
 
      var fecFinal= new Date(this.busq_fechaDesde);

      fecFinal.setDate(fecFinal.getDate()+1);

      this.busq_fechaHasta=      fecFinal;
  }

  
  public setInicio() {
    //  this.events.push(`${type}: ${event.value}`);
        
        //console.log("TR");

      var fecInicio = new Date(this.busq_fechaHasta);
      fecInicio.setDate(fecInicio.getDate()-1);
        
      this.busq_fechaDesde= fecInicio;
  
    }
  


  constructor( public restCaller: RegistroLlamadaService , 
                 notifierService: NotificacionService ) {

                  this.notifier = notifierService;
                  }



  ngOnInit() {
  //  this.getMotivos();


  this.dataResponse= {};
  this.dataResponse["responseData"]=   JSON.stringify(this.dataTest);
   

  this.eventoSeleccionado=new Evento();
  this.eventoSeleccionado.denunciante=new Denunciante();
  }

toogleBusqueda(){
 
  if(this.busqBasica==false){

      this.busqBasica=true ;
    }else {
      this.busqBasica=false;
    }
}

getOffset(data){

  let offset; 
  let links = data["links"];
  for (let link of links) { 

    if(link["rel"]=="next"){
  
      var splitted = link["href"].split("=", 2);  
      

      this.offsetNext=splitted[1];
    }

    if(link["rel"]=="prev"){
  
      var splitted = link["href"].split("=", 2);  
 
      this.offsetPrev=splitted[1];
    }
  }
 
}

  public getBusqueda(){
 
   // this.getBusquedaPorFiltros("FIRST");
    this.getListaEventosPorFiltros(1);
  
  }
 
 

  public getListaEventosPorFiltros(pagina: number ){


    console.log("PAGINA:> "+pagina);

    var callBusqueda = {};
  
    callBusqueda["uuid"]=this.uuid;
    
    callBusqueda["pagina"]=pagina;
  
    var flagConsulta=false;
  
    if((this.busq_fechaHasta!=null && this.busq_fechaHasta!="") && (this.busq_fechaDesde!=null && this.busq_fechaDesde!="" )  ){
  
     
    if(this.consultaMotivo!=null && this.consultaMotivo!=""){
    callBusqueda["consultaMotivo"]=this.consultaMotivo["id_motivo"];     //motivo seleccionado
    flagConsulta=true;
    }
    if(this.consultaOrigen!=null && this.consultaOrigen !="" ){
    callBusqueda["consultaOrigen"]=this.consultaOrigen["id_origen"];     //origen seleccionado
    flagConsulta=true;
    }
    if(this.consultaPrioridad!=null && this.consultaPrioridad!=""){
    callBusqueda["consultaPrioridad"]=this.consultaPrioridad;
    flagConsulta=true;
    }
    if(this.consultaEstatus!=null && this.consultaEstatus !=""){
    callBusqueda["consultaEstatus"]=this.consultaEstatus;
    flagConsulta=true;
    }
    if(this.consultaCiudad!=null && this.consultaCiudad !=""){
    callBusqueda["busqCiudad"]=this.consultaCiudad.id_municipio;  
    flagConsulta=true;
    } 
    if(this.consultaColonia!=null && this.consultaColonia !=""){
    callBusqueda["busqColonia"]=this.consultaColonia.id_colonia;
    flagConsulta=true;
    }
    if(this.busq_calle!=null && this.busq_calle.trim()!=""){
    callBusqueda["busqCalle"]=this.busq_calle.trim();
    flagConsulta=true;
    }
    if(this.busq_claveOper!=null && this.busq_claveOper.trim()!=""){
    callBusqueda["busqClaveOper"]=this.busq_claveOper.trim();
    flagConsulta=true;
    }
  
    if(this.busq_fechaDesde!=null && this.busq_fechaDesde!=""){
      callBusqueda["busqFechaDesde"]= new Date(this.busq_fechaDesde).getTime();
      flagConsulta=true;
    }
    if(this.busq_fechaHasta!=null && this.busq_fechaHasta!="" ){
      callBusqueda["busqFechaHasta"]=new Date(this.busq_fechaHasta).getTime();  
      flagConsulta=true;
    }  
  
    if(this.busq_folioDesde!=null &&  this.busq_folioDesde.trim()!=""){
    callBusqueda["busqFolioDesde"]=this.busq_folioDesde.trim();
    flagConsulta=true;
    }
    if(this.busq_folioHasta!=null && this.busq_folioHasta.trim()!=""){
    callBusqueda["busqFolioHasta"]=this.busq_folioHasta.trim();  
    flagConsulta=true;
    }
    if(this.busq_numeroTelefono!=null && this.busq_numeroTelefono.trim()!=""){
    callBusqueda["busqNumeroTelefono"]=this.busq_numeroTelefono.trim();
    flagConsulta=true;
    }
    if(this.busq_desc!=null && this.busq_desc.trim()!=""){
    callBusqueda["busqDesc"]=this.busq_desc.trim();
    flagConsulta=true;
    }
    if(this.busq_latitud!=null && this.busq_latitud.trim()!=""){
    callBusqueda["busqLatitud"]=this.busq_latitud.trim(); //x
    flagConsulta=true;
    }
    if(this.busq_longitud!=null && this.busq_longitud.trim()!="" ){
    callBusqueda["busqLongitud"]=this.busq_longitud.trim();//y
    flagConsulta=true;
    }
    if(this.rolUsuario!=null && this.rolUsuario.trim()!=""){
    callBusqueda["rolUsuario"]=this.rolUsuario.trim();
    flagConsulta=true;
    }
  
    if(this.busq_general!=null && this.busq_general.trim()!=""){
      callBusqueda["busqGeneral"]=this.busq_general.trim();
      flagConsulta=true;
      }
  

    if(flagConsulta){
  
    this.restCaller.sendCall(callBusqueda,this.endpointBusqueda).subscribe( //llamadada a restcaller
     (data) => {  
         
       
           // data =this.dataResponse;
          var respuesta =  JSON.parse(data["responseData"]);
      //     var respuesta =  JSON.parse(data["responseData"]);
         //  console.log(lista["vSalida"]);
  
           this.listaLlamadasCoincidencia=respuesta["vSalida"];

       //    console.log(this.listaLlamadasCoincidencia);


       
            this.dataSource = new MatTableDataSource(

              this.listaLlamadasCoincidencia
          );


           var total = respuesta["Total_registro"]; 
           var paginado= respuesta["Paginado"];
           this.totalBusquedaRegistros=total[0]["total"];
           console.log( this.totalBusquedaRegistros );

           this.setIndices(paginado, total[0]["total"] , pagina);

           if(this.totalBusquedaRegistros>0){
            this. footerFilterFlag=true;  

            this.notifier.showNotification ('bottom','center', 'Se encontraron resultados' , 'success' );
   

           }else{

            this. footerFilterFlag=false;   
          
            this.notifier.showNotification ('bottom','center', 'No se encontraron resultados' , 'info' );
           }
           this.muestraListaFlag=true;
 
     
      });
  
      }else{
  
  
        this.notifier.showNotification ('top','center', 'Debe escribir un filtro de busqueda primero' , 'danger' );
  
  
      }
  
    }else{
  
      this.notifier.showNotification ('top','center', 'Debe elegir rango de fechas' , 'danger' );
        
  
    }
 

  }

  

  public setIndices(paginado:any, totalRegistros:any, pagina:any){
  
    this.paginaActual=pagina;
    this.totalBusquedaRegistros=totalRegistros;
    this.totalPaginas=Math.ceil(totalRegistros/paginado);
  
  }





public getFechaRecepcion(date: any){

if(date==null){
return "--/--/----"
} else{

var splitFecha= date;
var splitFecha =splitFecha.split("Z", 2);     
var dateTmp= new Date( splitFecha[0]);

return moment(dateTmp).format('DD/MM/YYYY HH:mm:ss');
}
}

  public setLlamadaActual(idEvento:any){ //metodo para obtener lista de motivos
  
          

 

         // this.getEventoById(elemTmp["id_evento"]);
         this.getEventoById(idEvento);
         
 


  }

public getMotivos(){ //metodo para obtener lista de motivos
  
   var callMotivos={};
   callMotivos["uuid"]=this.uuid;    
   this.restCaller.sendCall(callMotivos,this.endpointMotivos).subscribe( //llamadada a restcaller
    (data) => {  
      ///  console.log(data);
         var lista= JSON.parse(data["responseData"]);
         this.itemsSelectMotivos=lista["items"];
                 
     });
 }
 

 public getMunicipios(){ //metodo para obtener lista de municipios
  
  var callMotivos={};
  callMotivos["uuid"]=this.uuid;    
  this.restCaller.sendCall(callMotivos,this.endpointMunicipios).subscribe( //llamadada a restcaller
   (data) => {  
     ///  console.log(data);
        var lista= data;//JSON.parse(data["responseData"]);
        this.itemsSelectCiudades=lista["items"];
                
    });
}


public getColonias(){ //metodo para obtener lista de colonias
  
  var callMotivos={};
  callMotivos["uuid"]=this.uuid;    
  this.restCaller.sendCall(callMotivos,this.endpointColonias).subscribe( //llamadada a restcaller
   (data) => {  
     ///  console.log(data);
        var lista=data;// JSON.parse(data["responseData"]);
        this.itemsSelectColonias =lista["items"];
                
    });
}


 
public limpiarCampos(){  
  
  


}

 public getOrigenes(){ //metodo para obtener lista de origenes
  
  var callOrigenes={};
  callOrigenes["uuid"]=this.uuid;    
  this.restCaller.sendCall(callOrigenes,this.endpointOrigenes).subscribe( //llamadada a restcaller
   (data) => {  

     
     var lista= JSON.parse(data["responseData"]);
     this.itemsSelectOrigenes=lista["items"];
               
    });
}



public getEventoById(idEvento:any){ 
  
  var callEvento={};
  callEvento["uuid"]=this.uuid;    
  callEvento["idEvento"]=idEvento;
  this.restCaller.sendCall(callEvento,this.endpointEventoById).subscribe( //llamadada a restcaller
   (data) => {  

     
    //  var lista= JSON.parse(data["responseData"]);
      var response= JSON.parse(data["responseData"]);
     this.mostrarBusquedas=false;

      console.log(response);


      var ev= (response["Dato_evento"]);
      
      console.log(ev);
      var eventoDatos=ev[0];
      var eventoDescripciones= response["Descripcion"];

    // this.itemsSelectOrigenes=lista["items"];

    console.log(eventoDatos);

    this.eventoSeleccionado.idEvento=eventoDatos["id_evento"];
    this.eventoSeleccionado.municipio = eventoDatos["evento_municipio"];
    this.eventoSeleccionado.numeroTelefonico = eventoDatos["evento_telefono"];

    var splitFecha= eventoDatos["evento_fech_inicio"];
    var splitFecha =splitFecha.split("Z", 2);   
    var dateTmp= new Date( splitFecha[0]);
    this.eventoSeleccionado.fechaRecepcion =  moment(dateTmp).format('DD/MM/YYYY HH:mm:ss');

    this.eventoSeleccionado.motivoNombre = eventoDatos["evento_motivo"];
    this.eventoSeleccionado.origenNombre = eventoDatos["evento_origen"];
    this.eventoSeleccionado.prioridad  = eventoDatos["prioridad"];
    this.eventoSeleccionado.estatus = eventoDatos["evento_estatus"];

    this.eventoSeleccionado.longitud = eventoDatos["evento_longitud"];
    this.eventoSeleccionado.latitud =  eventoDatos["evento_latitud"];
    this.eventoSeleccionado.estado =   eventoDatos["evento_estado"];
    this.eventoSeleccionado.colonia =  eventoDatos["evento_colonia"];


    let denunciante : Denunciante = new Denunciante();


    this.eventoSeleccionado.denunciante= denunciante;
 
    denunciante.nombre=eventoDatos["denunciante_nombre"];
    denunciante.apMaterno=eventoDatos["denunciante_materno"];
    denunciante.apPaterno=eventoDatos["denunciante_paterno"];
    denunciante.direccion=eventoDatos["denunciante_calle"] 
    +" | "+ eventoDatos["denunciante_cp"]
    +" | "+ eventoDatos["denunciante_piso"]
    +" | "+ eventoDatos["denunciante_numero"]
    +" | "+ eventoDatos["denunciante_municipio"]
    +" | "+ eventoDatos["denunciante_estado"] 
    denunciante.telefono=eventoDatos["denunciante_telefono"];
    denunciante.tipo=eventoDatos["denunciante_estado"];



/*
    this.eventoSeleccionado.idEvento= elemTmp["id_evento"];
 
    //  this.eventoSeleccionado.latitud
    //  this.eventoSeleccionado.longitud
      this.eventoSeleccionado.ciudad = elemTmp["nombre_municipio"];
      this.eventoSeleccionado.colonia = elemTmp["nombre_colonia"];
   //   this.eventoSeleccionado.creadoPor = elemTmp["nombre_municipio"];
   //   this.eventoSeleccionado.creadoPorNombre = elemTmp["nombre_municipio"];

       if( elemTmp["descripcion"]!=null)
      this.eventoSeleccionado.descripcion = (  elemTmp["descripcion"].replace(/<br>/g, "\n")).trim();


      this.eventoSeleccionado.estatus = elemTmp["estatus"];
      this.eventoSeleccionado.estatusCaptura = elemTmp["estatus"];
  //    this.eventoSeleccionado.fechaInicio = elemTmp["nombre_municipio"];
   //   this.eventoSeleccionado.fechaRecepcion = elemTmp["nombre_municipio"];
   //   this.eventoSeleccionado.motivo = elemTmp["nombre_municipio"];
      this.eventoSeleccionado.motivoNombre = elemTmp["nombre_motivo"];
      this.eventoSeleccionado.municipio = elemTmp["nombre_municipio"];
      this.eventoSeleccionado.numeroTelefonico = elemTmp["numero_telefono"];
      this.eventoSeleccionado.origen = elemTmp["nombre_origen"];
      this.eventoSeleccionado.origenNombre = elemTmp["nombre_origen"];
      this.eventoSeleccionado.prioridad  = elemTmp["prioridad"];

      var splitFecha= elemTmp["fecha_creacion"];

      var splitFecha =splitFecha.split("Z", 2); 
    
      var dateTmp= new Date( splitFecha[0]);

      this.eventoSeleccionado.fechaRecepcion =  moment(dateTmp).format('DD/MM/YYYY HH:mm:ss');

      let denunciante : Denunciante = new Denunciante();
 
   //   denunciante.nombre="ESTELA";
     // denunciante.apMaterno="BANKS";
      //denunciante.apPaterno="PEREZ";
      //denunciante.direccion="CALLE Z, NUMERO 35";
      //denunciante.telefono="64433213";
      //denunciante.tipo="DENUNCIANTE";

      this.eventoSeleccionado.denunciante= denunciante;


     //console.log( $("#buttoon").focus());
*/
     $('#modalConsultaLlamada').animate({ scrollTop: 0 }, 'slow');












               
    });
}

 public initModal(){


  this.getMotivos();
  this.getOrigenes();
  this.getColonias();
  this.getMunicipios(); 

 }

 public getBusquedaPorFiltros(paginado){ //metodo para obtener lista de motivos

  console.log("DENTRO-------------------------------------------"+paginado);
  var callBusqueda = {};
  
  callBusqueda["uuid"]=this.uuid;

  var flagConsulta=false;

  if((this.busq_fechaHasta!=null && this.busq_fechaHasta!="") && (this.busq_fechaDesde!=null && this.busq_fechaDesde!="" )  ){


 


  if(this.consultaMotivo!=null && this.consultaMotivo!=""){
  callBusqueda["consultaMotivo"]=this.consultaMotivo["id_motivo"];     //motivo seleccionado
  flagConsulta=true;
  }
  if(this.consultaOrigen!=null && this.consultaOrigen !="" ){
  callBusqueda["consultaOrigen"]=this.consultaOrigen["id_origen"];     //origen seleccionado
  flagConsulta=true;
  }
  if(this.consultaPrioridad!=null && this.consultaPrioridad!=""){
  callBusqueda["consultaPrioridad"]=this.consultaPrioridad;
  flagConsulta=true;
  }
  if(this.consultaEstatus!=null && this.consultaEstatus !=""){
  callBusqueda["consultaEstatus"]=this.consultaEstatus;
  flagConsulta=true;
  }
  if(this.consultaCiudad!=null && this.consultaCiudad !=""){
  callBusqueda["busqCiudad"]=this.consultaCiudad.id_municipio;  
  flagConsulta=true;
  } 
  if(this.consultaColonia!=null && this.consultaColonia !=""){
  callBusqueda["busqColonia"]=this.consultaColonia.id_colonia;
  flagConsulta=true;
  }
  if(this.busq_calle!=null && this.busq_calle.trim()!=""){
  callBusqueda["busqCalle"]=this.busq_calle.trim();
  flagConsulta=true;
  }
  if(this.busq_claveOper!=null && this.busq_claveOper.trim()!=""){
  callBusqueda["busqClaveOper"]=this.busq_claveOper.trim();
  flagConsulta=true;
  }

  if(this.busq_fechaDesde!=null && this.busq_fechaDesde!=""){
    callBusqueda["busqFechaDesde"]= new Date(this.busq_fechaDesde).getTime();
    flagConsulta=true;
  }
  if(this.busq_fechaHasta!=null && this.busq_fechaHasta!="" ){
    callBusqueda["busqFechaHasta"]=new Date(this.busq_fechaHasta).getTime();  
    flagConsulta=true;
  }


  if(this.busq_folioDesde!=null &&  this.busq_folioDesde.trim()!=""){
  callBusqueda["busqFolioDesde"]=this.busq_folioDesde.trim();
  flagConsulta=true;
  }
  if(this.busq_folioHasta!=null && this.busq_folioHasta.trim()!=""){
  callBusqueda["busqFolioHasta"]=this.busq_folioHasta.trim();  
  flagConsulta=true;
  }
  if(this.busq_numeroTelefono!=null && this.busq_numeroTelefono.trim()!=""){
  callBusqueda["busqNumeroTelefono"]=this.busq_numeroTelefono.trim();
  flagConsulta=true;
  }
  if(this.busq_desc!=null && this.busq_desc.trim()!=""){
  callBusqueda["busqDesc"]=this.busq_desc.trim();
  flagConsulta=true;
  }
  if(this.busq_latitud!=null && this.busq_latitud.trim()!=""){
  callBusqueda["busqLatitud"]=this.busq_latitud.trim(); //x
  flagConsulta=true;
  }
  if(this.busq_longitud!=null && this.busq_longitud.trim()!="" ){
  callBusqueda["busqLongitud"]=this.busq_longitud.trim();//y
  flagConsulta=true;
  }
  if(this.rolUsuario!=null && this.rolUsuario.trim()!=""){
  callBusqueda["rolUsuario"]=this.rolUsuario.trim();
  flagConsulta=true;
  }

  if(this.busq_general!=null && this.busq_general.trim()!=""){
    callBusqueda["busqGeneral"]=this.busq_general.trim();
    flagConsulta=true;
    }


  console.log("BEFORE PAGINADO>>>>>>>>>>>>>>>>>>>>>>>>"+paginado);
  if(paginado=="NEXT"){
 
    callBusqueda["offset"]=this.offsetNext;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>><<NEXT");

  }else if (paginado=="PREV"){

    callBusqueda["offset"]=this.offsetPrev;  
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>><<PREV");  

  }else if(paginado=="FIRST"){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>><<FIRST");
    callBusqueda["offset"]="0";

  }


  console.log("|||||||||||||||||||||||||||||||||||");
  console.log(this.busq_fechaDesde);
  
  console.log(this.busq_fechaHasta);

  if(flagConsulta){

  this.restCaller.sendCall(callBusqueda,this.endpointBusqueda).subscribe( //llamadada a restcaller
   (data) => {  
       
        console.log(data["responseData"]);

        var lista =  JSON.parse(data["responseData"]);
        console.log(lista["vSalida"]);

        this.listaLlamadasCoincidencia=lista["vSalida"];

        //data=this.testData; 

        if(data["hasMore"]){  //si hay mas datos en BD buscamos el offset
       // if(this.testData["hasMore"]){  //si hay mas datos en BD buscamos el offset
        //this.getOffset(this.testData);
 
        }else{


          this.offsetActual=data["offset"];
          
          this.offsetNext=data["offset"];
          
          this.offsetPrev=data["offset"];
        }



        console.log("PREV:"+this.offsetPrev);
        console.log("ACTUAL:"+this.offsetActual);
        console.log("NEXT:"+this.offsetNext);

   
    });

    }else{


      this.notifier.showNotification ('top','center', 'Debe escribir un filtro de busqueda primero' , 'danger' );


    }

  }else{

    this.notifier.showNotification ('top','center', 'Debe elegir rango de fechas' , 'danger' );
      

  }
}

 public customSearchFn(busqueda: string, item: any) { //busqueda por id_motivo Y por nombre_motivo para <ng-select>
  busqueda = busqueda.toLocaleLowerCase();
  var cadena_idMotivo=item.id_catologo_nacional+"";

  var cadena_nombreMotivo=item.nombre_motivo.toLocaleLowerCase()+"";

  //regresa true si la encuentra en cualquiera de las dos condiciones
  return cadena_idMotivo.indexOf(busqueda) > -1 || cadena_nombreMotivo.indexOf(busqueda) > -1  ;
}

public customSearchFnOrigen(busqueda: string, item: any) { //busqueda por id_origen Y por nombre_origen para <ng-select>
  busqueda = busqueda.toLocaleLowerCase();
  var cadena_idOrigen=item.id_origen+"";

  var cadena_nombreOrigen=item.nombre_origen.toLocaleLowerCase()+"";

  //regresa true si la encuentra en cualquiera de las dos condiciones
  return cadena_idOrigen.indexOf(busqueda) > -1 || cadena_nombreOrigen.indexOf(busqueda) > -1  ;
}



}
 
