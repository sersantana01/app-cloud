import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';

import { RegistroLlamadaService } from './registro-llamada.service';
import { Subject } from 'rxjs';

import * as $ from 'jquery';
import * as moment from 'moment';

import {Evento} from '../../../models/evento.model';

import { Ubicacion} from 'src/app/models/ubicacion.model';

import { GrabacionService } from '../../../shared/services/grabacion.service';
import {DataSharedService} from '../../../shared/services/data-shared.service';

import { Subscription } from 'rxjs';
import {NotificacionService} from '../../../notificacion/notificacion.service';


@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-registro-llamada',
  templateUrl: './registro-llamada.component.html',
  styleUrls: ['./registro-llamada.component.css']
})
export class RegistroLlamadaComponent implements OnInit {

 
  @ViewChild('customNotification') customNotificationTmpl;

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
   /*
   public endpointMotivos ="http://localhost:9091/obtenerMotivos";   
   public endpointInst ="http://localhost:9091/obtenerInstituciones"; 
   public endpointSaveEvento="http://localhost:9091/saveEvento";  
   public endpointUpdateDesc="http://localhost:9091/updateDescripcion";       
   public endpointModificarEvento="http://localhost:9091/updateEvento";
   */

    
   //public endpointSaveEvento="http://localhost:9091/saveEvento";  
   //public endpointUpdateDesc="http://localhost:9091/updateDescripcion"; 

   public endopointGrabacion= "http://3.14.155.2:6769/grabarAuronix";
  
  // public endpointSaveEvento="http://localhost:9091/api/llamadaReal/saveEvento";   
   public endpointSaveEvento="http://3.14.155.2:9091/api/llamadaReal/saveEvento";   
   public endpointUpdateDesc="http://3.14.155.2:9091/api/llamadaReal/updateDescripcion";  
   //public endpointUpdateDesc="http://localhost:9091/api/llamadaReal/updateDescripcion";  
   public endpointMotivos ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos";
   public endpointInst ="http://3.14.155.2:9091/api/llamadaReal/obtenerInstituciones";   
   public endpointModificarEvento="http://3.14.155.2:9091/api/llamadaReal/updateEvento";



   public eventoTmp: Evento;
   public subscription: Subscription;
   
   public subscriptionUbicacion: Subscription;







constructor(public dataShared: DataSharedService
          , public restCaller: RegistroLlamadaService,  
            private grabacionService: GrabacionService,
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

  // this.notifier.notify( 'success', 'You are awesome! I mean it!' );
   // this.notifier.notify( 'error', 'You are awesome! I mean it!' );



  
 }

 crearLlamada() {
   ///this.dataShared.crearLlamada("1122");

   console.log(this.eventoTmp);
 }  

 actualizarLlamada() {
   ///this.dataShared.crearLlamada("1122");
   this.dataShared.actualizarLlamada(this.eventoTmp.prefolio,this.eventoTmp);
 }  

 setLlamadaCreada(arrayLlamadas){


     this.eventoTmp=arrayLlamadas[arrayLlamadas.length-1];
     console.log(this.eventoTmp);


     if(this.eventoTmp.idEvento== null || this.eventoTmp.idEvento==""){


      this.setMapCenter(this.eventoTmp.denunciante.latitudDenunciante, this.eventoTmp.denunciante.longitudDenunciante);
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
     // console.log(  this.ITEMS);
    
      this.setLlamadaCreada(data.listaEventos);
     });

     this.subscriptionUbicacion = this.dataShared.ubicacionActualObservable$.subscribe((data ) => {
      // this.ITEMS = data;
      // console.log(  this.ITEMS);  

        console.log(this.eventoTmp);

        if(this.eventoTmp.prefolio!= undefined && this.eventoTmp.prefolio!=null ){

          let ubicacion: Ubicacion = data;
          console.log( data); 
          this.eventoTmp.latitud=ubicacion.latitud;
          this.eventoTmp.longitud=ubicacion.longitud;
        }

      });

    this.getMotivos();///////////////////////////////////////////SE OBTIENE LA LISTA DE MOTIVOS DE LLAMADA REAL////////////////////

    this.setMapCenter("19.4411109", "-99.1465073");//latitudDenunciante: "19.434050" longitudDenunciante: "-99.199056"
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
  this.restCaller.sendCall(call,this.endpointMotivos).subscribe( //llamadada a restcaller
    (data) => {
        
        //this.itemsSelectMotivos=data["items"];
         console.log(data);
         var lista= JSON.parse(data["responseData"]);
         this.itemsSelectMotivos=lista["items"];
    
  });
 }

 public getInstituciones(){///////////Metodo para obtener las instituciones relacionadas a una prioridad


   console.log(this.eventoTmp.motivo);

   this.resetPrioridad ();
  // this. selectedPrioridad="";


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


       //console.log(this.selectedMotivo);

     this.restCaller.sendCall(call,this.endpointInst).subscribe(//llamadada a restcaller
       (data) => {
        //   this.itemsSelectInstituciones=data["items"];
  
           var lista= JSON.parse(data["responseData"]);   
           this.itemsSelectInstituciones=lista["items"];
            
     });

       this.openPop (this.eventoTmp.motivo["prioridad"]);
       this.noPopover=false;
       }
 }



 public customSearchFn(busqueda: string, item: any) { //busqueda por id_motivo Y por nombre_motivo para <ng-select>
       busqueda = busqueda.toLocaleLowerCase();
       var cadena_idMotivo=item.id_motivo+"";

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

   public guardarEvento (){

       let validacion=this.validacionesEvento();

       if(validacion){

         //QUITAMOS LOS SALTOS DE LINEA Y SE REEMPLAZAN POR BR DE HTML
       var desc=$("#ev_descripcion").val().toString().trim() ;
       var tryit=  desc.replace(/\n/g, "<br>");
      // this.descripcionEvento=tryit;

       this.eventoTmp.descripcion=tryit;



        var dateFinal= new Date();
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
        evento["fechaInicio"]=    this.dateInicio;

        evento["fechaFin"]=dateFinal.getTime();
        evento["origen"]="LLAMADA";           /////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["estatus"]="CULMINADO";       /////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["estatusCaptura"]="ATENDIDA";////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["creadoPor"]=this.session_id_user;/////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["numeroTelefonico"]= Number($("#numeroTelefono").val()) ;


       
        evento["latitud"]=this.eventoTmp.latitud;////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
        evento["longitud"]=this.eventoTmp.longitud;////////////////////////////////////////CAMBIAR ESTOS DATOS AL OBTENERLOS DE MS
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

        this.restCaller.sendCall(call,this.endpointSaveEvento).subscribe(//llamadada a restcaller
          (data) => {
                console.log(data);         


               var respuesta= JSON.parse(data["responseData"]);
              
         

               if(respuesta["ID_EVE"]!=undefined){
                this.eventoTmp.idEvento=respuesta["ID_EVE"];
                this.eventoTmp.idDescripcionEvento=respuesta["ID_DESC"];



               // alertify.logPosition('bottom left').success("Evento registrado con exito");
               this.notifier.showNotification ('top','center', 'Evento registrado con exito' );
             


                $( "#id_evento" ).addClass( this.eventoTmp.prioridad+"_text" );
                this.openPop (this.eventoTmp.prioridad);
                this.disabledMotivos();


                 this. actualizarLlamada();//LLAMADA A OBSERVABLE



               }else{
                
                 this.notifier.showNotification ('top','center', 'Ocurrio un error al intentar guardar el evento. Intente de nuevo.' );
               }
        },(err) => {//CUANDO OCURREN ERRORES DE VALIDACION EN SERVIDOR SE MUESTRAN EN FORMATO ESPECIAL

           var error= err["error"];

           if(error!=undefined ){

             var errorsList=  error.errors  ;
             var mensajeError="[ERRORES de servidor]:<br/>";
            
             for (var propiedad in errorsList) {
               if (errorsList.hasOwnProperty(propiedad)) {
                 mensajeError+=(propiedad +":"+errorsList[propiedad])+"<br/>";
               }
             }

             this.notifier.showNotification ('top','center',mensajeError  );
                     
           }
        }
       
       
       
        );

      }else{

         this.resetPrioridad();

      }

       return validacion;
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

         }else{

           this.openPop (this.eventoTmp.prioridad);
          // this.modificarEvento();

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
           this.restCaller.sendCall(call,this.endpointUpdateDesc).subscribe(//llamadada a restcaller
             (data) => {
                   //this.itemsSelectMotivos=data["items"];
                   console.log(data);
                  
                   var respuesta= JSON.parse(data["responseData"]);
                   if(respuesta["INSERTADO"]>0){

                     this.eventoTmp.descripcion=descripcionCompleta//descripcionEvento=descripcionCompleta;
                  //   alertify.logPosition('bottom left').success("Descripcion guardada con exito");
                  this.notifier.showNotification ('top','center', 'Descripcion guardada con exito.' );
          
                    
                     this. actualizarLlamada();



                   }
                   else{
                    // alertify.logPosition('bottom left').error("Ocurrio un error al guardar, intente de nuevo.");
                   
                     $("#ev_descripcion").val( descripcionCompleta.replace(/<br>/g, "\n" ));
                     this.notifier.showNotification ('top','center','Ocurrio un error al guardar, intente de nuevo.' );
          
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
               this.notifier.showNotification ('top','center', mensajeError  );
              
              
              $("#ev_descripcion").val( descripcionCompleta.replace(/<br>/g, "\n" ));
             }
          }
          
          
          
           );


         }else{

           //  alertify.logPosition('bottom left').maxLogItems(5).error("Escribe descripcion");
           this.notifier.showNotification ('top','center','Falta escribir descripcion' );

         }
     }



       public validacionesEvento (){  //validaciones sobre eventos
         let flag= true;
         let message="";
         /*
         if(   $("#txtLato").val().trim()=="" ){ //SI hay latitud
           alertify.logPosition('bottom left').maxLogItems(6).error("Ingrese Ubicacion exacta(Latitud)");
         //  message+='*Seleccione un motivo primero<br>';
           flag= false;

         }

         if( $("#txtLng").val().trim()=="" ){ //Si hay longitud
           alertify.logPosition('bottom left').maxLogItems(6).error("Ingrese Ubicacion exacta(Longitud)");
         //  message+='*Seleccione un motivo primero<br>';
           flag= false;

         }*/


         if( this.eventoTmp.latitud ==null || this.eventoTmp.latitud=="" ){  //si el motivo esta seleccionado
          //alertify.logPosition('bottom left').maxLogItems(6).error("Seleccione un motivo primero");
          this.notifier.showNotification ('top','center', 'Falta seleccionar ubicacion (Latitud)' );
           flag= false;
        }

        if( this.eventoTmp.longitud ==null || this.eventoTmp.longitud=="" ){  //si el motivo esta seleccionado
          //alertify.logPosition('bottom left').maxLogItems(6).error("Seleccione un motivo primero");
          this.notifier.showNotification ('top','center', 'Falta seleccionar ubicacion (Longitud)' );
           flag= false;
        }

         if( this.eventoTmp.motivo ==null || this.eventoTmp.motivo=="" ){  //si el motivo esta seleccionado
           //alertify.logPosition('bottom left').maxLogItems(6).error("Seleccione un motivo primero");
           this.notifier.showNotification ('top','center', 'Seleccione un motivo primero' );
            flag= false;
         }

         if(($("#ev_descripcion").val().toString().trim())==""){//si ha escrito una descripcion
        // alertify.logPosition('bottom left').maxLogItems(6).error('Debe escribir la descripcion del evento');
        this.notifier.showNotification ('top','center','Debe escribir la descripcion del evento' );
            flag= false;
         }else{
             if(this.eventoTmp.idEvento==null){//SI NO HAY UN EVENTO GUARDADO

               let desc= $("#ev_descripcion").val().toString().trim();
               if(desc.length<10){  //SE VALIDA QUE LA PRIMERA DESCRIPCION TENGA ALMENOS 10 CARACTERES DE LONGITUD

                this.notifier.showNotification ('top','center', 'Debe escribir la descripcion del evento con almenos 10 caracteres' );
                 flag= false;
               }

             }


         }
         if(this.eventoTmp.prioridad==null || this.eventoTmp.prioridad=="" ){//si ha seleccionado una prioridad
      
          this.notifier.showNotification ('top','center','Seleccione una prioridad primero' );
           flag= false;
         }
         if(this.eventoTmp.listaInstituciones.length==0){//si hay almenos una institucion seleccionada para atender el evento
        // alertify.logPosition('bottom left').maxLogItems(5).error('Seleccione al menos una institucion primero');
        this.notifier.showNotification ('top','center', 'Seleccione al menos una institucion primero' );
             flag= false;
         }

         if(this.eventoTmp.prefolio==null|| this.eventoTmp.prefolio==""  ){//si hay prefolio institucion seleccionada para atender el evento
         //alertify.logPosition('bottom left').maxLogItems(5).error('Genere un prefolio primero');
         this.notifier.showNotification ('top','center','Genere un prefolio primero' );
            flag= false;
         }
          
         return flag;


       }

     public  resetLlamada(){                     //METODO PARA RESETEAR LA PANTALLA PARA PREPARAR UNA NUEVA LLAMADA

    
       this.setMapCenter("19.4411109", "-99.1465073");
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

       //LLAMADA A FUNCION DE OTRO COMPONENTE
       //$("#iniciaGrabacion").click();


       var date = new Date();
       let dateGrabacion = moment(date).format('DD/MM/YYYY HH:mm:ss');
       
        this.grabacionService.grabarAuronix(this.eventoTmp.prefolio, dateGrabacion, "Inicio");

     }


     public pararGrabacion( ){//Metodo para invocar la grabacion(PARAR)

       //LLAMADA A FUNCION DE OTRO COMPONENTE
       //$("#stopGrabacion").click();

       var date = new Date();
       let dateGrabacion = moment(date).format('DD/MM/YYYY HH:mm:ss');

       var call = {};
       call["prefolio"]=$("#prefolioSpan").html().toString().trim();
       call["fechaGrabacion"]=dateGrabacion;
       call["accion"]="final";
       call["ipOperador"]=this.uuid;
/*
       "fechaGrabacion": "12/06/2019 02:12:23",
       "accion": "Intermedio",
       "ipOperador": "102.22.1.11"*/


       this.restCaller.sendCall(call,this.endopointGrabacion).subscribe(
         (data) => {
            console.log(data);
       
       });

     }

    
     public enableMotivos(){      //se permite seleccionar motivos

       this.disableMotivos=false;
       this.resetLlamada();       //se resetean las variables locales de pizquierdo para permitir nuevo registro

      
       this.eventoTmp.numeroTelefonico=$("#numeroTelefono").val();

       //console.log( this.eventoTmp.numeroTelefonico);

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
        evento["motivo"]=this.selectedMotivo.id_motivo;
        /*
        evento["descripcion"]= $("#ev_descripcion").val().trim();*/
        //evento["descripcion"]=   this.descripcionEvento;
        evento["prioridad"]=this.eventoTmp.prioridad;

       // evento["fechaInicio"]=date.getTime();
         evento["modificadoPor"]=this.session_id_user;

        evento["latitud"]="-41.5555";
        evento["longitud"]="39.00001";
        evento["zonaPatrullaje"]="2";        
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

        this.restCaller.sendCall(call,this.endpointModificarEvento).subscribe(//llamadada a restcaller
          (data) => {
             var respuesta= JSON.parse(data["responseData"]); 
             if(Number(respuesta["ACTUALIZADO"])>0){
               // alertify.logPosition('bottom left').success("Registro modificado");
               this.notifier.showNotification ('top','center', 'Registro modificado' );
             }
             else{                
              //  alertify.logPosition('bottom left').error("Error al intentar guardar cambios");
              this.notifier.showNotification ('top','center','Error al intentar guardar cambios' );
             }
        
        });
      }
 

      public mapatest( ){
  
        this.dataShared.setUbicacionLlamada("19.6411109", "-99.1465073");
       
     }


     public setMapCenter(latitudX, longitudY){
    
      console.log("SET SRC");
  
      let latitud=latitudX
      let longitud=longitudY
   
      let url=" http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&idSistemaGeoAlerta=9";
  
      console.log("SET SRC:"+url);
      //$('#myFrameSiga').prop('src','https://cdn-images-1.medium.com/max/1600/0*4Gzjgh9Y7Gu8KEtZ.gif');
   
  
   //   setTimeout (() => { 
        $('#myFrameSiga').prop('src',url );
    //  }, 1500)
   
     
        }


        














    }