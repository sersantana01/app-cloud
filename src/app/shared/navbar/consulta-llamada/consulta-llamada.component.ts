import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RegistroLlamadaService } from '../../../operador/llamadaReal/registro-llamada/registro-llamada.service';


import {Evento} from '../../../models/evento.model';

import {Denunciante} from '../../../models/denunciante.model';

import {NotificacionService} from '../../../notificacion/notificacion.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import * as moment from 'moment';
 

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
  


  public testData: any ={
    "items": [
        {
            "id_modelo": 203,
            "modelo": "SIENNA",
            "id_marca": 34
        },
        {
            "id_modelo": 204,
            "modelo": "SOLARA",
            "id_marca": 34
        },
        {
            "id_modelo": 205,
            "modelo": "SR5",
            "id_marca": 34
        },
        {
            "id_modelo": 206,
            "modelo": "TACOMA",
            "id_marca": 34
        },
        {
            "id_modelo": 207,
            "modelo": "TERCEL",
            "id_marca": 34
        },
        {
            "id_modelo": 208,
            "modelo": "TUNDRA",
            "id_marca": 34
        },
        {
            "id_modelo": 209,
            "modelo": "YARIS",
            "id_marca": 34
        },
        {
            "id_modelo": 210,
            "modelo": "ATLANTIC",
            "id_marca": 35
        },
        {
            "id_modelo": 211,
            "modelo": "BEETLE",
            "id_marca": 35
        },
        {
            "id_modelo": 212,
            "modelo": "BEETLE GLS",
            "id_marca": 35
        },
        {
            "id_modelo": 213,
            "modelo": "BORA",
            "id_marca": 35
        },
        {
            "id_modelo": 214,
            "modelo": "BRASILIA",
            "id_marca": 35
        },
        {
            "id_modelo": 215,
            "modelo": "BUGGY",
            "id_marca": 35
        },
        {
            "id_modelo": 216,
            "modelo": "CABRIOLET",
            "id_marca": 35
        },
        {
            "id_modelo": 217,
            "modelo": "CARIBE",
            "id_marca": 35
        },
        {
            "id_modelo": 218,
            "modelo": "COMBI",
            "id_marca": 35
        },
        {
            "id_modelo": 219,
            "modelo": "CORSAR",
            "id_marca": 35
        },
        {
            "id_modelo": 220,
            "modelo": "CRAFTER",
            "id_marca": 35
        },
        {
            "id_modelo": 221,
            "modelo": "CROSSFOX",
            "id_marca": 35
        },
        {
            "id_modelo": 222,
            "modelo": "DERBY",
            "id_marca": 35
        },
        {
            "id_modelo": 223,
            "modelo": "EUROVAN",
            "id_marca": 35
        },
        {
            "id_modelo": 224,
            "modelo": "GOLF",
            "id_marca": 35
        },
        {
            "id_modelo": 225,
            "modelo": "GLI",
            "id_marca": 35
        },
        {
            "id_modelo": 226,
            "modelo": "GTI",
            "id_marca": 35
        },
        {
            "id_modelo": 227,
            "modelo": "JETTA",
            "id_marca": 35
        }
    ],
    "hasMore": true,
    "limit": 25,
    "offset": 25,
    "count": 25,
    "links": [
        {
            "rel": "self",
            "href": "http://18.222.125.22:8081/ords/pxc50001/catalogo/cat_modelo"
        },
        {
            "rel": "describedby",
            "href": "http://18.222.125.22:8081/ords/pxc50001/metadata-catalog/catalogo/item"
        },
        {
            "rel": "first",
            "href": "http://18.222.125.22:8081/ords/pxc50001/catalogo/cat_modelo"
        },
        {
            "rel": "next",
            "href": "http://18.222.125.22:8081/ords/pxc50001/catalogo/cat_modelo?offset=50"
        },
        {
            "rel": "prev",
            "href": "http://18.222.125.22:8081/ords/pxc50001/catalogo/cat_modelo?offset=25"
        }
    ]
};


  constructor( public restCaller: RegistroLlamadaService , 
                 notifierService: NotificacionService ) {

                  this.notifier = notifierService;
                  }

  ngOnInit() {
  //  this.getMotivos();

  this.eventoSeleccionado=new Evento();
  this.eventoSeleccionado.denunciante=new Denunciante();



  

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

  public testMyEvento(){

    console.log("GETTING EVENTO");

    this.listaLlamadasCoincidencia=[];
    this.eventoSeleccionado=new Evento();    
    this.eventoSeleccionado.denunciante=new Denunciante();

    let ev1= new Evento();    

    ev1.municipio="ATIZAPAN";
    ev1.idEvento="22334";
    ev1.tipoTelefono="CELULAR";
    ev1.numeroTelefonico="55231255";
    ev1.fechaRecepcion="15/13/2019 02:33:21";
    ev1.motivoNombre="ATAQUE DE ANIMAL";
    ev1.tiempo="2.0min";
    ev1.colonia="ANZURES";
    ev1.ciudad="TLAXCALA";
    ev1.origenNombre="LLAMADA CELULAR";
    ev1.creadoPorNombre="OPERADOR 2";
    ev1.prioridad="NORMAL";
    ev1.estatus="ATENDIDA";
    ev1.descripcion="PASARON COSAS MUY FEAS";


     let denunciante : Denunciante = new Denunciante();

     denunciante.nombre="GABRIEL";
     denunciante.apMaterno="RAZZTAMAZ";
     denunciante.apPaterno="SANCHEZ";
     denunciante.direccion="CALLE X, NUMERO 3";
     denunciante.telefono="222223";
     denunciante.tipo="DENUNCIANTE";

     ev1.denunciante=denunciante;

    ///////////////////////////////////////////////////////////////////////////
    let ev2= new Evento();    

    ev2.municipio="IXMIQUILPAN";
    ev2.idEvento="32455";
    ev2.tipoTelefono="DE CASA";
    ev2.numeroTelefonico="55239128";
    ev2.fechaRecepcion="99/01/2019 10:12:45";
    ev2.motivoNombre="ACCIDENTE DE TRAFICO";
    ev2.tiempo="1.0min";
    ev2.colonia="GALERAS";
    ev2.ciudad="PORTE ALTO";
    ev2.origenNombre="LLAMADA TELEFONICA";
    ev2.creadoPorNombre="OPERADOR 6";
    ev2.prioridad="RAPIDA";
    ev2.estatus="ATENDIDA";
    ev2.descripcion="COSAS DESCRIPCION";


     let denunciante2 : Denunciante = new Denunciante();

     denunciante2.nombre="DEBORAH";
     denunciante2.apMaterno="RICH";
     denunciante2.apPaterno="AGUILAR";
     denunciante2.direccion="CALLE y, NUMERO 123";
     denunciante2.telefono="4433221223";
     denunciante2.tipo="DENUNCIANTE";

     ev2.denunciante=denunciante2;

     ///////////////////////////////////////////////////////////////////////////
    let ev3= new Evento();    

    ev3.municipio="NAUCALPAN";
    ev3.idEvento="543332";
    ev3.tipoTelefono="CELULAR";
    ev3.numeroTelefonico="7162378123";
    ev3.fechaRecepcion="02/01/2019  05:12:09";
    ev3.motivoNombre="VENTA DE DROGAS";
    ev3.tiempo="2.2min";
    ev3.colonia="EJIDOS";
    ev3.ciudad="GUADALAJARA";
    ev3.origenNombre="LLAMADA CELULAR";
    ev3.creadoPorNombre="OPERADOR 2342";
    ev3.prioridad="URGENTE";
    ev3.estatus="ATENDIDA";
    ev3.descripcion="VENDIENDO DROGAS EN VIA PUBLICA";


     let denunciante3 : Denunciante = new Denunciante();

     denunciante3.nombre="ESTELA";
     denunciante3.apMaterno="BANKS";
     denunciante3.apPaterno="PEREZ";
     denunciante3.direccion="CALLE Z, NUMERO 35";
     denunciante3.telefono="64433213";
     denunciante3.tipo="DENUNCIANTE";

     ev3.denunciante=denunciante3;




  //   this.listaLlamadasCoincidencia.push(ev1);
  //   this.listaLlamadasCoincidencia.push(ev2);
  //   this.listaLlamadasCoincidencia.push(ev3);


     //this.eventoSeleccionado=ev1;

  //  console.log(this.listaLlamadasCoincidencia);




    this.getBusquedaPorFiltros("FIRST");
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

  public setLlamadaActual(index:any){ //metodo para obtener lista de motivos
  
         
         

         let removeClass= <HTMLInputElement>(document.getElementsByClassName("selectedRowEvento")[0]);
         
         if(removeClass!=undefined)
         removeClass.classList.remove('selectedRowEvento');

         let rowEvento=  <HTMLInputElement>(document.getElementById("row_"+(index+1)));
         rowEvento.classList.add('selectedRowEvento')


         this.mostrarBusquedas=false;

        ////////////// this.eventoSeleccionado=this.listaLlamadasCoincidencia[index];

          let elemTmp= this.listaLlamadasCoincidencia[index];

          console.log("XXXXXXX>");
          console.log(elemTmp);

          this.eventoSeleccionado.idEvento= elemTmp["id_evento"];
        //  this.eventoSeleccionado.latitud
        //  this.eventoSeleccionado.longitud
          this.eventoSeleccionado.ciudad = elemTmp["nombre_municipio"];
          this.eventoSeleccionado.colonia = elemTmp["nombre_colonia"];
       //   this.eventoSeleccionado.creadoPor = elemTmp["nombre_municipio"];
       //   this.eventoSeleccionado.creadoPorNombre = elemTmp["nombre_municipio"];

           if( elemTmp["descripcion"]!=null)
          this.eventoSeleccionado.descripcion =  elemTmp["descripcion"].replace("<br>", "\n");


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
/*
          denunciante.nombre="ESTELA";
          denunciante.apMaterno="BANKS";
          denunciante.apPaterno="PEREZ";
          denunciante.direccion="CALLE Z, NUMERO 35";
          denunciante.telefono="64433213";
          denunciante.tipo="DENUNCIANTE";*/

          this.eventoSeleccionado.denunciante= denunciante;


         //console.log( $("#buttoon").focus());

         $('#modalConsultaLlamada').animate({ scrollTop: 0 }, 'slow');


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
 

 public getMunicipios(){ //metodo para obtener lista de motivos
  
  var callMotivos={};
  callMotivos["uuid"]=this.uuid;    
  this.restCaller.sendCall(callMotivos,this.endpointMunicipios).subscribe( //llamadada a restcaller
   (data) => {  
     ///  console.log(data);
        var lista= data;//JSON.parse(data["responseData"]);
        this.itemsSelectCiudades=lista["items"];
                
    });
}


public getColonias(){ //metodo para obtener lista de motivos
  
  var callMotivos={};
  callMotivos["uuid"]=this.uuid;    
  this.restCaller.sendCall(callMotivos,this.endpointColonias).subscribe( //llamadada a restcaller
   (data) => {  
     ///  console.log(data);
        var lista=data;// JSON.parse(data["responseData"]);
        this.itemsSelectColonias =lista["items"];
                
    });
}


 
public limpiarCampos(){ //metodo para obtener lista de motivos
  
  


}

 public getOrigenes(){ //metodo para obtener lista de motivos
  
  var callOrigenes={};
  callOrigenes["uuid"]=this.uuid;    
  this.restCaller.sendCall(callOrigenes,this.endpointOrigenes).subscribe( //llamadada a restcaller
   (data) => {  

     
     var lista= JSON.parse(data["responseData"]);
     this.itemsSelectOrigenes=lista["items"];
               
    });
}



public getEventoById(){ //metodo para obtener lista de motivos
  
  var callEvento={};
  callEvento["uuid"]=this.uuid;    
  callEvento["idEvento"]=this.eventoSeleccionado.idEvento;
  this.restCaller.sendCall(callEvento,this.endpointEventoById).subscribe( //llamadada a restcaller
   (data) => {  

     
     var lista= JSON.parse(data["responseData"]);
     this.itemsSelectOrigenes=lista["items"];
               
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

        data=this.testData; 

        if(data["hasMore"]){  //si hay mas datos en BD buscamos el offset
       // if(this.testData["hasMore"]){  //si hay mas datos en BD buscamos el offset
        this.getOffset(this.testData);
 
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
 