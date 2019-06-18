import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';

import { RegistroLlamadaService } from './registro-llamada.service';
import { Subject } from 'rxjs';

import * as $ from 'jquery';
import * as moment from 'moment';

import {Evento} from '../../../models/evento.model';

import { Ubicacion} from 'src/app/models/ubicacion.model';

import { GrabacionService } from '../../../shared/services/grabacion.service';
import {DataSharedService} from '../../../shared/services/data-shared.service';

import { Subscription,interval,Observable } from 'rxjs';
 
import {NotificacionService} from '../../../notificacion/notificacion.service';
import {GoogleMapService} from '../../../maps/fullscreenmap/google-map.service';


@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-registro-llamada',
  templateUrl: './registro-llamada.component.html',
  styleUrls: ['./registro-llamada.component.css']
})
export class RegistroLlamadaComponent implements OnInit {

 
 private readonly notifier: NotificacionService;

 /////////////DATOS POR OBTENER DE SESION////////////////
 public uuid=5;
 public session_id_user=2;


 ////////////////////////////////////////////

 public itemsSelectMotivos=[];         //array de motivos
 public itemsSelectInstituciones=[]    //array de instituciones
 public hideCorporacion=true;          //variable para controlar la visibilidad de las secciones de corporaciones,prioridad
 
 //public hideCorporacion=false;          //variable para controlar la visibilidad de las secciones de corporaciones,prioridad
 
 public popPrioridad="";               //variable para mostrar mensaje en el popover
 public noPopover=false;               //variable para controlar la visibilidad del popover de ayuda en prioridad
 public disableMotivos=true;
 public dateInicio=null;
 public selectedMotivo=null;           //motivo seleccionado
 public institucionesSeleccionadas=[]; //array de instituciones seleccionadas por el operador
 public selectedPrioridad="";          //prioridad seleccionada
 public idEvento=null;                 //id del evento
 public idDescripcionEvento=null;      //id descripcion del evento
 public descripcionEvento="";          //text area de descripcion de evento


   //variables para controlar la prioridad seleccionada visualmente
   public imgurgenteOn = "../assets/img/images/icnUrgente.svg";
   public imgurgenteoff =  "../assets/img/images/icnUrgenteOff.svg";
   public imgurgenteACT="";

   public imgnormalOn = "../assets/img/images/icnNormal.svg";
   public imgnormaloff = "../assets/img/images/icnNormalOff.svg";
   public imgnormalACT="";

   public imgrapidoOn ="../assets/img/images/icnRapido.svg";
   public imgrapidooff = "../assets/img/images/icnRapidoOff.svg";
   public imgrapidoACT="";

   

   ////////////////////////////////ENDPOINTS LLAMADA REAL/////////////////////////////////
    
   // public endpointMotivos ="http://localhost:9091/obtenerMotivos";   
    //public endpointInst ="http://localhost:9091/obtenerInstituciones"; 
  // public endpointSaveEvento="http://localhost:9091/saveEvento";  
   //public endpointUpdateDesc="http://localhost:9091/updateDescripcion";       
  // public endpointModificarEvento="http://localhost:9091/updateEvento";
     
   //public endpointSaveEvento="http://localhost:9091/saveEvento";  
   //public endpointUpdateDesc="http://localhost:9091/updateDescripcion"; 

   public endopointGrabacion= "http://3.14.155.2:6769/grabarAuronix";  
   //public endpointSaveEvento="http://3.14.155.2:9091/api/llamadaReal/saveEvento";   
   public endpointUpdateDesc="http://3.14.155.2:9091/api/llamadaReal/updateDescripcion";   
   public endpointMotivos ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos"; 
   public endpointInst ="http://3.14.155.2:9091/api/llamadaReal/obtenerInstituciones";   
   public endpointModificarEvento="http://3.14.155.2:9091/api/llamadaReal/updateEvento";   
   public endpointBitacoraEvento="http://3.14.155.2:9091/api/llamadaReal/registroBitacoraEvento";
   
     public endpointSaveEvento="http://3.14.155.2:9091/api/llamadaReal/saveEvento";   

   public endpointAsignarInstitucion="http://3.14.155.2:9091/api/llamadaReal/asignarInstitucionEvento";
    
   //public endpointBitacoraEvento="http://3.14.155.2:9091/api/llamadaReal/registroBitacoraEvento";

   public endpointSaveTiempos="http://localhost:9091/guardaTiempo"; 


   //public endpointSaveEvento="http://localhost:9091/api/llamadaReal/saveEvento";   

   public eventoTmp: Evento;
   public subscription: Subscription;   
   public subscriptionUbicacion: Subscription;


  // public sub: Subscription;
 
constructor(public dataShared: DataSharedService,
            public restCaller: RegistroLlamadaService,  
            private grabacionService: GrabacionService,
            public maps : GoogleMapService,
           notifierService: NotificacionService) {
   this.notifier = notifierService;
   //this.dateInicio=(new Date()).getTime();
   //this.resetPrioridad();

   this. imgurgenteACT=this.imgurgenteoff;
   this. imgnormalACT=this.imgnormaloff;
   this. imgrapidoACT=this.imgrapidooff;
   this.eventoTmp= new Evento();
   
 }

 public ngAfterViewInit(): void {

   $("#ev_descripcion").val(""); //se inicializa el campo de descripcion en vacio
 
 }
 
 actualizarLlamada() {
   ///this.dataShared.crearLlamada("1122");
   this.dataShared.actualizarLlamada(this.eventoTmp.prefolio,this.eventoTmp);
 }  

 setLlamadaCreada(arrayLlamadas){

     this.eventoTmp=arrayLlamadas[arrayLlamadas.length-1];
     console.log(this.eventoTmp);

     if(this.eventoTmp.idEvento== null || this.eventoTmp.idEvento=="" ){

    //  this.setMapCenter(this.eventoTmp.denunciante.latitudDenunciante, this.eventoTmp.denunciante.longitudDenunciante);
     }
 }


 ngOnDestroy() {
   if (this.subscription) {
       this.subscription.unsubscribe();
     }
 }
 ngOnInit() {
 
   this.subscription = this.dataShared.datosLlamadaObservable$.subscribe((data ) => {
     // this.ITEMS = data;
      console.log(data.listaEventos);    

      this.dataShared.buscarUltimoEvento();
      this.setLlamadaCreada(data.listaEventos);

      //asignacion de fecha Captura para el evento
      this. dateInicio=(new Date()).getTime();
      this.eventoTmp.fechaInicio=this.dateInicio;

     });

     this.subscriptionUbicacion = this.dataShared.ubicacionActualObservable$.subscribe((data ) => {
      // this.ITEMS = data;
        console.log(  data);  
        console.log(this.eventoTmp);        
        console.log( this.eventoTmp.prefolio!= null && this.eventoTmp.idEvento!=null );
        if(this.eventoTmp.prefolio!= null && this.eventoTmp.idEvento==null ){

          let ubicacion: Ubicacion = data;
          console.log( data); 
          this.eventoTmp.latitud=ubicacion.latitud;
          this.eventoTmp.longitud=ubicacion.longitud;

          this.notifier.showNotification ('top','center', 'Ubicación de evento establecida correctamente.', 'success' );
              
        }

      },(err) => {

        console.log(err);


      }
      
      
      );

    this.getMotivos();///////////////////////////////////////////SE OBTIENE LA LISTA DE MOTIVOS DE LLAMADA REAL////////////////////

    this.setMapCenter("19.4411109", "-99.1465073");//latitudDenunciante: "19.434050" longitudDenunciante: "-99.199056"
 
 }


 public saveBitacoraEvento(bitacora:any){


  var callBitacora={};

  callBitacora["bitacora"]=bitacora;




  this.restCaller.sendCall(callBitacora,this.endpointBitacoraEvento).subscribe( //llamadada a restcaller
    (data) => { 

        console.log(data); 
    
     });



 }

 
 public getMotivos(){ //metodo para obtener lista de motivos
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
   callMotivos["uuid"]=this.uuid;    
  this.restCaller.sendCall(callMotivos,this.endpointMotivos).subscribe( //llamadada a restcaller
    (data) => { 

        // console.log(data);
         var lista= JSON.parse(data["responseData"]);
         this.itemsSelectMotivos=lista["items"];
 
     });
 }





 public getInstituciones(){///////////Metodo para obtener las instituciones relacionadas a una prioridad
 

    console.log(this.eventoTmp);
   this.resetPrioridad ();
   
   if(this.eventoTmp.motivo!=null && this.eventoTmp.motivo!=""){
   //if(this.selectedMotivo!=null && this.selectedMotivo!=""){
     this.iniciarGrabacion( );           //SE INICIA GRABACION
     this.hideCorporacion=false;
   //////////////////////
      var call = {};
      var params=[];

      var param= {};
      param["nombreParametro"]="uuid";
      param["tipo"]="String";
      param["valor"]=this.uuid;

      params.push(param);

      var param2= {};
      param2["nombreParametro"]="id_motivo";
      param2["tipo"]="String";
      param2["valor"]=this.eventoTmp.motivo["id_motivo"];

      params.push(param2);

      call["nombrePaquete"] = "telefonista";
      call["nombreStoreProcedure"] = "motivo_institucion";
      call["nombreMs"] = "MS-LLAMADA-REAL";
      call["param"] = params;
 


      var callInstituciones = {};
      callInstituciones["uuid"]=this.uuid;      
      callInstituciones["idMotivo"]=this.eventoTmp.motivo["id_motivo"];

     this.restCaller.sendCall(callInstituciones,this.endpointInst).subscribe(// llamadada a restcaller
       (data) => {
        //   this.itemsSelectInstituciones=data["items"];
  
           var lista= JSON.parse(data["responseData"]);
           this.itemsSelectInstituciones=lista["items"];
 
           for(var x=0;x<this.itemsSelectInstituciones.length;x++){
 
                this.eventoTmp.listaInstituciones.push(this.itemsSelectInstituciones[x].id_institucion);
           }

          // console.log(  this.eventoTmp.motivo["prioridad"]);

            this.setPreseleccionPrioridad(  this.eventoTmp.motivo["prioridad"]   );



              ///////////////////////////////////BITACORA///////////////////////            

              /*
              var bitacora={};
              bitacora["uuid"]=this.uuid;
              bitacora["idEvento"]="162";
              bitacora["descripcionBitacora"]="TRANSMISION_DE_LA_LLAMADA";              
              // bitacora["idTipoMovBitacora"]="2";            
              // bitacora["idMovimientoRecurso"];
              //bitacora["idInstitucion"];
              // bitacora["direccionIp"];
              bitacora["fechaHoraMovimiento"]= new Date().getTime(); 
              this.saveBitacoraEvento(bitacora);
              */

              /////////////////////////////////////////////////////////////////////


     });

       /*this.openPop (this.eventoTmp.motivo["prioridad"]);
       this.noPopover=false;*/
       }
 }

 public setPreseleccionPrioridad(prioridad:any){

  if(prioridad=="URGENTE"){               
    
    $( "#prioridadRojo" ).addClass("iconoPrioridadPreseleccionada");    
    $( "#prioridadAmarillo" ).removeClass("iconoPrioridadPreseleccionada");    
    $( "#prioridadVerde" ).removeClass("iconoPrioridadPreseleccionada");
    

  }else if(prioridad=="RAPIDA"){
    
 
    $( "#prioridadAmarillo" ).addClass("iconoPrioridadPreseleccionada");
    $( "#prioridadRojo" ).removeClass("iconoPrioridadPreseleccionada");    
    $( "#prioridadVerde" ).removeClass("iconoPrioridadPreseleccionada");

 
  }else if(prioridad=="NORMAL") {              //NORMAL
    
  //  let shadesEl = document.querySelector('.cool');
    
  $( "#prioridadVerde" ).addClass("iconoPrioridadPreseleccionada");
    $( "#prioridadAmarillo" ).removeClass("iconoPrioridadPreseleccionada");     
    $( "#prioridadRojo" ).removeClass("iconoPrioridadPreseleccionada");      

  }else{

    $( "#prioridadVerde" ).removeClass("iconoPrioridadPreseleccionada");
    $( "#prioridadAmarillo" ).removeClass("iconoPrioridadPreseleccionada");     
    $( "#prioridadRojo" ).removeClass("iconoPrioridadPreseleccionada");      

  }

//  $( "#id_evento" ).addClass( this.eventoTmp.prioridad+"_text" );

 }



 public customSearchFn(busqueda: string, item: any) { //busqueda por id_motivo Y por nombre_motivo para <ng-select>
       busqueda = busqueda.toLocaleLowerCase();
       var cadena_idMotivo=item.id_catologo_nacional+"";

       var cadena_nombreMotivo=item.nombre_motivo.toLocaleLowerCase()+"";

       //regresa true si la encuentra en cualquiera de las dos condiciones
       return cadena_idMotivo.indexOf(busqueda) > -1 || cadena_nombreMotivo.indexOf(busqueda) > -1  ;
  }


   public selectInstitucion(event,idInstitucion) {           //Metodo para ir guardando las instituciones que se seleccionan

     if(event.target.classList.contains('envIcnCorporacion')){ 
       event.target.classList.remove('envIcnCorporacion');
       event.target.classList.add('envIcnCorporacionON');  

       this.eventoTmp.listaInstituciones.push(idInstitucion);

     }else{

       event.target.classList.remove('envIcnCorporacionON');
       event.target.classList.add('envIcnCorporacion');

       for(var x=0;x<  this.eventoTmp.listaInstituciones.length;x++){    // SE BUSCA LA CORPORACION EN LA LISTA Y SE ELIMINA
        if(  this.eventoTmp.listaInstituciones[x]==idInstitucion){
         this.eventoTmp.listaInstituciones.splice(x, 1);
        }
      }
     } 
   }

   public guardarEvento (){                      //METODO PARA ENVIAR UN EVENTO PARA GUARDAR EN BD

       let validacion=this.validacionesEvento();

       if(validacion){

         //QUITAMOS LOS SALTOS DE LINEA Y SE REEMPLAZAN POR BR DE HTML
       var desc=$("#ev_descripcion").val().toString().trim() ;
       var tryit=  desc.replace(/\n/g, "<br>");
      // this.descripcionEvento=tryit;

       this.eventoTmp.descripcion=tryit;

        var dateFinal= new Date();
        /*
        var call = {};
        var params=[];

        var param= {};
        param["nombreParametro"]="uuid";
        param["tipo"]="String";
        param["valor"]=this.uuid;

        params.push(param);
        */

        var evento= {};
       
        evento["uuid"]=          this.uuid;
        evento["motivo"]=        this.eventoTmp.motivo["id_motivo"];  //modelo evento
        evento["descripcion"]=   this.eventoTmp.descripcion;
        evento["prioridad"]=     this.eventoTmp.prioridad; //this.selectedPrioridad;

       // evento["fechaInicio"]=date.getTime();
        evento["fechaInicio"]=     this.eventoTmp.fechaInicio;

     //   evento["fechaFin"]=dateFinal.getTime();
        evento["origen"]="LLAMADA";           /////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["estatus"]="ACTIVO";       /////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["estatusCaptura"]="ACTIVO";////////////////////////////////////////ESTE DATO NO CAMBIA NUNCA PUES ES EL ESTADO QUE SE CREA EN ESTE PUNTO
        evento["creadoPor"]=this.session_id_user;/////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["numeroTelefonico"]= Number($("#numeroTelefono").val()) ;
       
        evento["latitud"]=this.eventoTmp.latitud; 
        evento["longitud"]=this.eventoTmp.longitud; 
        evento["zonaPatrullaje"]="9";////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS

        evento["listaInstituciones"]=this.eventoTmp.listaInstituciones;

       
       // evento["FechaCapturaFinal"]=

        /*
        var paramEvento= {};
        paramEvento["nombreParametro"]="evento";
        paramEvento["tipo"]="Clase";
        paramEvento["valor"]=JSON.stringify(evento);

        params.push(paramEvento);

        call["nombrePaquete"] = "telefonista";
        call["nombreStoreProcedure"] = "evento";
        call["nombreMs"] = "MS-LLAMADA-REAL";
        call["param"] = params;
        */


        var callSaveEvento={};
        
        callSaveEvento["uuid"]= this.uuid;
        callSaveEvento["evento"]=evento;


        this.restCaller.sendCall(callSaveEvento,this.endpointSaveEvento).subscribe(//llamadada a restcaller
          (data) => {
               console.log(data);         

               var respuesta= JSON.parse(data["responseData"]); 
 


               if(respuesta["v_id_evento"]!=undefined && respuesta["v_id_evento"]!= null ){
                this.eventoTmp.idEvento=respuesta["v_id_evento  "];
                //this.eventoTmp.idDescripcionEvento=respuesta["ID_DESC"];
 
                this.notifier.showNotification ('top','center', 'Evento registrado con exito', 'success' );
                $( "#id_evento" ).addClass( this.eventoTmp.prioridad+"_text" );

                let fechaAsignacion= new Date().getTime();

              //  for(var x=0;x<this.eventoTmp.listaInstituciones.length;x++){
               //  this.guardarAsignacionInstitucionEvento(this.eventoTmp.listaInstituciones[x] , fechaAsignacion);
            //   }
               // this.openPop (this.eventoTmp.prioridad);
                this.disabledMotivos();
                this. actualizarLlamada();//LLAMADA A OBSERVABLE


                var bitacora={};
                bitacora["uuid"]=this.uuid;
                bitacora["idEvento"]=this.eventoTmp.idEvento;
                bitacora["descripcionBitacora"]="TRANSMISION_DE_LA_LLAMADA";              
                // bitacora["idTipoMovBitacora"]="2";            
                // bitacora["idMovimientoRecurso"];
                //bitacora["idInstitucion"];
                // bitacora["direccionIp"];
                bitacora["fechaHoraMovimiento"]= new Date().getTime(); 
                this.saveBitacoraEvento(bitacora);
 

               }else{
                this.notifier.showNotification ('top','center', 'Ocurrio un error al intentar guardar el evento. Intente de nuevo.', 'danger' );
               }
           },(err) => {//CUANDO OCURREN ERRORES DE VALIDACION EN SERVIDOR SE MUESTRAN EN FORMATO ESPECIAL

           var error= err["error"];

            if(error!=undefined ){

              var errorsList=  error.errors  ;
              var mensajeError="[ERRORES de servidor]: ";
              
              for (var propiedad in errorsList) {
                if (errorsList.hasOwnProperty(propiedad)) {
                  mensajeError+=(propiedad +":"+errorsList[propiedad]);
                }
              }

              this.notifier.showNotification ('top','center',mensajeError, 'danger'  );
                          
              }
            }
        
        );

      }else{

         this.resetPrioridad();

      }

       return validacion;
   }

 



  public transmitirEventoDespachador(){ //metodo para obtener lista de motivos
   
    
    var callTransmitir={};

    callTransmitir['uuid']=this.uuid;


    this.restCaller.sendCall(callTransmitir,this.endpointAsignarInstitucion).subscribe( //llamadada a restcaller
     (data) => { 
 
          console.log(data); 
     
      });
  }


  

  public terminarLlamadaTiempo(){ //metodo para obtener lista de motivos
   
    
    var callTiempoCaptura={};

    callTiempoCaptura['uuid']=this.uuid;
    
    callTiempoCaptura['idTipoTiempo']="14";// "id_tipo_tiempo": 14,  "nombre_tipo_tiempo": "TIEMPO_CAPTURA"
 
    callTiempoCaptura['fechaTiempo']=this.uuid;
    callTiempoCaptura['idEvento']=this.eventoTmp.idEvento;
    
    callTiempoCaptura['creadoPor']=this.uuid;    
    callTiempoCaptura['duracion']=this.uuid;
 
    /*
    id_tipo_tiempo,
    id_institucion,
    duracion,
    fecha_tiempo,
    id_evento,
    id_recurso,
    creado_por
    */


    this.restCaller.sendCall(callTiempoCaptura,    this.endpointSaveTiempos).subscribe( //llamadada a restcaller
     (data) => { 
 
          console.log(data); 
     
      });


          
    var callTiempoTransmision={};

    callTiempoTransmision['uuid']=this.uuid;
    
    callTiempoTransmision['idTipoTiempo']="13";// "id_tipo_tiempo": 13,  "nombre_tipo_tiempo": "TIEMPO_TRANSMISION"
 
    callTiempoTransmision['fechaTiempo']=this.uuid;
    callTiempoTransmision['idEvento']=this.eventoTmp.idEvento;
    
    callTiempoTransmision['creadoPor']=this.uuid;    
    callTiempoTransmision['duracion']=this.uuid;
  
    this.restCaller.sendCall(callTiempoTransmision,    this.endpointSaveTiempos).subscribe( //llamadada a restcaller
     (data) => { 
 
          console.log(data); 
     
      });
  }



    public openPop (prioridad){         ///Metodo para controlar el elemento Popover de prioridades

      this.popPrioridad=prioridad;
      $("#button_pop").click();

     }

    public doClick (popover){         //Metodo para invocar el evento de abrir o cerrar un popover

      if(this.eventoTmp.idEvento!=null && this.eventoTmp.prioridad!=""){

        console.log("close POP");
         popover.close();
      }else{

         console.log("open POP");
         popover.open();
      }

    }


     public resetPrioridad (){       //Metodo para resetear a voluntad la prioridad cuando se necesite

        // this.eventoTmp.prioridad="";
         this. imgurgenteACT=this.imgurgenteoff;
         this. imgnormalACT=this.imgnormaloff;
         this. imgrapidoACT=this.imgrapidooff;

     }

     public setPrioridad(prioridad:String) {    //Metodo para colocar la prioridad segun se hace click
          if(prioridad=="URGENTE"){               
          
           this. eventoTmp.prioridad='URGENTE';
                 this.imgnormalACT=this.imgnormaloff;
                 this.imgurgenteACT=this.imgurgenteOn;
                 this.imgrapidoACT=this.imgrapidooff;

         }else if(prioridad=="RAPIDA"){

           this.eventoTmp.prioridad='RAPIDA';
                 this.imgnormalACT=this.imgnormaloff;
                 this.imgurgenteACT=this.imgurgenteoff;
                 this.imgrapidoACT=this.imgrapidoOn;

         }else{              //NORMAL

           this.eventoTmp.prioridad='NORMAL';
                 this.imgnormalACT=this.imgnormalOn;
                 this.imgurgenteACT=this.imgurgenteoff;
                 this.imgrapidoACT=this.imgrapidooff;

         }

          if(this.eventoTmp.idEvento==null){

           let validacion =   this.guardarEvento();

         } 
     }



   public guardarDescripcion (descripcion, descripcionCompleta){   //Metodo para guardar descripcion cada que se hace Enter en el textbox

   let textComp= $("#ev_descripcion").val().toString().trim();
         if(textComp!=null && textComp!= "" &&  ($("#ev_descripcion").val()).toString().trim()!="" ){
        
           var call = {};
           var params=[];
           var param= {};
           param["nombreParametro"]="uuid";
           param["tipo"]="String";
           param["valor"]=this.uuid;

           params.push(param);

           var evento= {};
           evento["descripcion"]=descripcion;
           evento["idDescripcionEvento"]=this.eventoTmp.idDescripcionEvento;
           evento["idEvento"]=this.eventoTmp.idEvento;
           evento["creadoPor"]=this.session_id_user;

           var paramEvento= {};
           paramEvento["nombreParametro"]="evento";
           paramEvento["tipo"]="Clase";
           paramEvento["valor"]=JSON.stringify(evento);

           params.push(paramEvento);

           call["nombrePaquete"] = "telefonista";
           call["nombreStoreProcedure"] = "Descripcion_evento";
           call["nombreMs"] = "MS-LLAMADA-REAL";
           call["tipo"]="POST";
           call["param"] = params;




           var callUpdateEventoDescripcion={};
        
           callUpdateEventoDescripcion["uuid"]= this.uuid;
           callUpdateEventoDescripcion["evento"]=evento;
   



           this.restCaller.sendCall(callUpdateEventoDescripcion,this.endpointUpdateDesc).subscribe(//llamadada a restcaller
             (data) => {
                   //this.itemsSelectMotivos=data["items"];
                   console.log(data);
                  
                   var respuesta= JSON.parse(data["responseData"]);
                   if(respuesta["INSERTADO"]>0){

                     this.eventoTmp.descripcion=descripcionCompleta//descripcionEvento=descripcionCompleta;
                     this.notifier.showNotification ('top','center', 'Descripcion guardada con exito.' , 'success');
                     this. actualizarLlamada();

                   }
                   else{
                     $("#ev_descripcion").val( descripcionCompleta.replace(/<br>/g, "\n" ));
                     this.notifier.showNotification ('top','center','Ocurrio un error al guardar, intente de nuevo.', 'danger' );
          
                   }
                  
            },
          
              (err) => {//CUANDO OCURREN ERRORES DE VALIDACION EN SERVIDOR SE MUESTRAN EN FORMATO ESPECIAL

                var error= err["error"];
                  if(error!=undefined ){
                    var errorsList=  error.errors  ;
                  var mensajeError="[ERRORES de servidor]:<br/>";
                  
                  for (var propiedad in errorsList) {
                    if (errorsList.hasOwnProperty(propiedad)) {
                      mensajeError+=(propiedad +":"+errorsList[propiedad])+"<br/>";
                    }
                  }
                  this.notifier.showNotification ('top','center', mensajeError , 'danger' );                  
                  
                  $("#ev_descripcion").val( descripcionCompleta.replace(/<br>/g, "\n" ));
                  }
                }
            );


         }else{ 
           this.notifier.showNotification ('top','center','Falta escribir descripcion', 'danger' );

         }
     }

       public validacionesEvento (){  //validaciones sobre eventos
         let flag= true;
         let message="";
 

         if(( this.eventoTmp.latitud ==null || this.eventoTmp.latitud=="" ) ||   ( this.eventoTmp.longitud ==null || this.eventoTmp.longitud=="" )  ){  //si el motivo esta seleccionado
          //alertify.logPosition('bottom left').maxLogItems(6).error("Seleccione un motivo primero");
          this.notifier.showNotification ('top','center', 'Seleccionar ubicacion ', 'danger' );
           flag= false;
        } 

         if( this.eventoTmp.motivo ==null || this.eventoTmp.motivo=="" ){  //si el motivo esta seleccionado
           //alertify.logPosition('bottom left').maxLogItems(6).error("Seleccione un motivo primero");
           this.notifier.showNotification ('top','center', 'Seleccione un motivo primero', 'danger' );
            flag= false;
         }

         if(($("#ev_descripcion").val().toString().trim())==""){//si ha escrito una descripcion
        // alertify.logPosition('bottom left').maxLogItems(6).error('Debe escribir la descripcion del evento');
           this.notifier.showNotification ('top','center','Debe escribir la descripcion del evento', 'danger' );
            flag= false;
         }else{
             if(this.eventoTmp.idEvento==null){//SI NO HAY UN EVENTO GUARDADO

               let desc= $("#ev_descripcion").val().toString().trim();
               if(desc.length<10){  //SE VALIDA QUE LA PRIMERA DESCRIPCION TENGA ALMENOS 10 CARACTERES DE LONGITUD

                this.notifier.showNotification ('top','center', 'Debe escribir la descripcion del evento con almenos 10 caracteres', 'danger' );
                 flag= false;
               }
             }
         }
         if(this.eventoTmp.prioridad==null || this.eventoTmp.prioridad=="" ){//si ha seleccionado una prioridad
      
          this.notifier.showNotification ('top','center','Seleccione una prioridad primero' , 'danger');
          flag= false;
         }
         if(this.eventoTmp.listaInstituciones.length==0){//si hay almenos una institucion seleccionada para atender el evento
          this.notifier.showNotification ('top','center', 'Seleccione al menos una institucion primero', 'danger' );
          flag= false;
         }

         if(this.eventoTmp.prefolio==null|| this.eventoTmp.prefolio==""  ){//si hay prefolio institucion seleccionada para atender el evento
           this.notifier.showNotification ('top','center','Genere un prefolio primero0','danger' );
           flag= false;
         }
          
         return flag;

       }

     public  resetLlamada(){                     //METODO PARA RESETEAR LA PANTALLA PARA PREPARAR UNA NUEVA LLAMADA


     /* if(this.eventoTmp.idEvento!=undefined ){
       this.setMapCenter("19.4411109", "-99.1465073");
       
       this.dataShared.setUbicacionLlamada( 0, 0);
      }*/


       this. dateInicio=(new Date()).getTime();

       ////////////////////////////////////////////SE REINICIAN LAS VARIABLES LOCALES AL ESTADO DEFAULT
       //this. itemsSelectMotivos=[ ];
       /*
       this. itemsSelectInstituciones=[]
       this. selectedMotivo=null;
       this. institucionesSeleccionadas=[];
       this. selectedPrioridad="";
       this. idEvento=null;
       this. idDescripcionEvento=null;
       this. descripcionEvento=""; */

       this.eventoTmp.idEvento=null;
       this.eventoTmp.motivo=null;
       
       this.eventoTmp= new Evento();
      
       this. popPrioridad="";
       this. hideCorporacion=true;
       $("#ev_descripcion").val("");

       this.resetPrioridad();                    ///SE RESETEA LA PRIORIDAD DE LOS EVENTOS

     }


     public sendDescripcion(evento){

     //  console.log(this.descripcionEvento!="");
       if(evento.keyCode == 13 &&  this.eventoTmp.descripcion!="") {
         //  alert('ENTER :'+ultimaLinea+":");

           if($("#ev_descripcion").val().toString().trim() != this.eventoTmp.descripcion){

             //Mecanismo para encontrar las diferencias entre las descripciones
             //Se compara la descripcion que se guarda contra la que esta escrita ahora mismo en el
             //text box. Si hay diferencias entonces solo la diferencia se guarda en BD

             var textoActual = $("#ev_descripcion").val().toString().trim();
             var desc=$("#ev_descripcion").val().toString().trim() ;
             var fixedString=  desc.replace(/\n/g, "<br>");      //SE REEMPLAZAN SALTOS DE LINEA PARA QUE NO ENTREN EN CONFLICTO AL HACER INSERT
             // this.descripcionEvento=tryit;     
             var ultimaLinea = textoActual.toString().substr(textoActual.toString().lastIndexOf("\n")+1);
             //console.log("ULTIMA LINEA:"+ultimaLinea);
              if(ultimaLinea.toString().trim()!=""){
                /////////////texto.replace(/\<complementos>.*?\<*complementos>/g,texto2)
              var reemplace=fixedString.replace( this.eventoTmp.descripcion,"");
            
                if(reemplace!=""){///SI HAY ALGO DIFERENTE ENTRE LAS VERSIONES ENTONCES SE MANDA GUARDAR
                  this.guardarDescripcion(reemplace.toString().trim(),fixedString.toString().trim());
                }
              }
           }
         }

     }

     public callReset(){                   //metodo para iniciar el reseteo de la llamada/evento
      
       $("#button_header_reset").click();  //se manda llamar el evento que se encuentra en header
     }
    
     public siguienteLlamada(){  //Metodo para llamar cuando se produzca otra llamada

       console.log("RESETING");
      /////////////////////////////////////// this.pararGrabacion();    //se detiene la grabacion
       this.resetLlamada();      //se resetean las variables locales
       this.disabledMotivos();   //se deshabilita el select de motivos hasta que se genere otro prefolio

     }

     public iniciarGrabacion( ){//Metodo para invocar la grabacion(INICIAR)
      
       var date = new Date();
       let dateGrabacion = moment(date).format('DD/MM/YYYY HH:mm:ss');
       this.grabacionService.grabarAuronix(this.eventoTmp.prefolio, dateGrabacion, "Inicio");

     }


     public pararGrabacion( ){//Metodo para invocar la grabacion(PARAR)
 
       var date = new Date();
       let dateGrabacion = moment(date).format('DD/MM/YYYY HH:mm:ss');
       this.grabacionService.grabarAuronix(this.eventoTmp.prefolio, dateGrabacion, "Final");

     }
    
     public enableMotivos(){      //se permite seleccionar motivos

       this.disableMotivos=false;
      // this.resetLlamada();       //se resetean las variables locales de pizquierdo para permitir nuevo registro
 
       this.eventoTmp.numeroTelefonico=$("#numeroTelefono").val();
       
     }

     public disabledMotivos(){   //se deshabilita el select de motivos hasta que se genere un prefolio

       this.disableMotivos=true;       

     }
       

     public modificarEvento(){//Metodo para solicitar la modificacion de datos de un evento

        var call = {};
        var params=[];

        var param= {};
        param["nombreParametro"]="uuid";
        param["tipo"]="String";
        param["valor"]=this.uuid;

        params.push(param);

        var evento= {};
        

       // evento["fechaInicio"]=date.getTime();
        evento["modificadoPor"]=this.session_id_user; 

        var tiempoCapturaFin= {};
        tiempoCapturaFin["uuid"]=this.uuid;
       // tiempoCapturaFin["fechaTiempo"]=new Date().getTime();
        tiempoCapturaFin["idEvento"]= this.eventoTmp.idEvento;
     //   tiempoCapturaFin["idTiempo"]=   ////////////////////////////////////////////////////////////PONER ESTE DATO


        evento["tiempoCaptura"]=tiempoCapturaFin;

        evento["idEvento"]=this.eventoTmp.idEvento;

        var paramEvento= {};
        paramEvento["nombreParametro"]="evento";
        paramEvento["tipo"]="Clase";
        paramEvento["valor"]=JSON.stringify(evento);

        params.push(paramEvento);

        call["nombrePaquete"] = "telefonista";
        call["nombreStoreProcedure"] = "evento";
        call["nombreMs"] = "MS-LLAMADA-REAL";
        call["tipo"]="PUT";
        call["param"] = params;




        var callUpdateEvento={};
        
        callUpdateEvento["uuid"]= this.uuid;
        callUpdateEvento["evento"]=evento;


        this.restCaller.sendCall(callUpdateEvento,this.endpointModificarEvento).subscribe(//llamadada a restcaller
          (data) => {
             var respuesta= JSON.parse(data["responseData"]); 
             if(Number(respuesta["ACTUALIZADO"])>0){
               // alertify.logPosition('bottom left').success("Registro modificado");
               this.notifier.showNotification ('top','center', 'Registro modificado' , 'success' );
             }
             else{                
              //  alertify.logPosition('bottom left').error("Error al intentar guardar cambios");
              this.notifier.showNotification ('top','center','Error al intentar guardar cambios', 'danger' );
             }
        
        });
      }
 

      public mapatest( ){
  
        this.dataShared.setUbicacionLlamada("19.4511109", "-99.1165073","" );///////////PONER ZONA PATRULLAJE
       
     }

     public setMapCenter(latitudX, longitudY){
    
      console.log("SET SRC");

      //////////////////////////////UBICACION DE SIGA///////////////////////////////////////////////////////////
      let latitud=latitudX
      let longitud=longitudY
   
      //let url=" http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&idSistemaGeoAlerta=9";
      let url="http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&numExterior=&idInstitucion=1&idSistemaGeoAlerta=9&idSistema=1"


      console.log("SET SRC:"+url);
      //$('#myFrameSiga').prop('src','https://cdn-images-1.medium.com/max/1600/0*4Gzjgh9Y7Gu8KEtZ.gif');
   
  
   //   setTimeout (() => { 
        $('#myFrameSiga').prop('src',url );
    //  }, 1500)
     //////////////////////////////UBICACION DE SIGA///////////////////////////////////////////////////////////
  
    //////////////////////////////UBICACION DE GOOGLE///////////////////////////////////////////////////////////
        //this.dataShared.setUbicacionLlamada("19.4511109", "-99.1165073" );
      //  this.dataShared.setUbicacionLlamada ("19.4511109", "-99.1165073" );

    //////////////////////////////UBICACION DE GOOGLE///////////////////////////////////////////////////////////
  
   }

   
   public sendBitacoraEvento( ){
  
        var call = {};
        var params=[];

        var param= {};
        param["nombreParametro"]="uuid";
        param["tipo"]="String";
        param["valor"]=this.uuid;

        params.push(param);

        var evento= {};
       
        evento["uuid"]=          this.uuid;
        evento["motivo"]=        this.eventoTmp.motivo["id_motivo"];  //modelo evento
        evento["descripcion"]=   this.eventoTmp.descripcion;
        evento["prioridad"]=     this.eventoTmp.prioridad; //this.selectedPrioridad;

       // evento["fechaInicio"]=date.getTime();
        evento["fechaInicio"]=     this.eventoTmp.fechaInicio;

     //   evento["fechaFin"]=dateFinal.getTime();
        evento["origen"]="LLAMADA";           /////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["estatus"]="CULMINADO";       /////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["estatusCaptura"]="ATENDIDA";////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["creadoPor"]=this.session_id_user;/////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["numeroTelefonico"]= Number($("#numeroTelefono").val()) ;

       
        evento["latitud"]=this.eventoTmp.latitud; 
        evento["longitud"]=this.eventoTmp.longitud; 
        evento["zonaPatrullaje"]="9";////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS

        evento["listaInstituciones"]=this.eventoTmp.listaInstituciones;


        var paramEvento= {};
        paramEvento["nombreParametro"]="evento";
        paramEvento["tipo"]="Clase";
        paramEvento["valor"]=JSON.stringify(evento);

        params.push(paramEvento);

        call["nombrePaquete"] = "telefonista";
        call["nombreStoreProcedure"] = "evento";
        call["nombreMs"] = "MS-LLAMADA-REAL";
        call["param"] = params;

        this.restCaller.sendCall(call,this.endpointBitacoraEvento).subscribe(//llamadada a restcaller
          (data) => {
               console.log(data);         

              
           },(err) => {//CUANDO OCURREN ERRORES DE VALIDACION EN SERVIDOR SE MUESTRAN EN FORMATO ESPECIAL
 
            console.log(err); 
           }
        
        );
  }
        
        

 }