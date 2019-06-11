import { Component, OnInit } from '@angular/core';

import { RegistroLlamadaService } from '../../../operador/llamadaReal/registro-llamada/registro-llamada.service';

@Component({
  selector: 'app-consulta-llamada',
  templateUrl: './consulta-llamada.component.html',
  styleUrls: ['./consulta-llamada.component.css']
})
export class ConsultaLlamadaComponent implements OnInit {



  public uuid=5;
  public endpointMotivos ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos";
  public endpointBusqueda ="http://3.14.155.2:9091/api/llamadaReal/obtenerMotivos";
   
  public itemsSelectMotivos=[];   //Lista de motivos 
  public consultaMotivo:any;     //motivo seleccionado


  constructor( public restCaller: RegistroLlamadaService  ) { }

  ngOnInit() {
  //  this.getMotivos();
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
         var lista= JSON.parse(data["responseData"]);
         this.itemsSelectMotivos=lista["items"];
         
         console.log(this.itemsSelectMotivos);
    
     });
 }


 public getBusquedaPorFiltros(){ //metodo para obtener lista de motivos
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
        var lista= JSON.parse(data["responseData"]);
        this.itemsSelectMotivos=lista["items"];
        
        console.log(this.itemsSelectMotivos);
   
    });
}

 public customSearchFn(busqueda: string, item: any) { //busqueda por id_motivo Y por nombre_motivo para <ng-select>
  busqueda = busqueda.toLocaleLowerCase();
  var cadena_idMotivo=item.id_motivo+"";

  var cadena_nombreMotivo=item.nombre_motivo.toLocaleLowerCase()+"";

  //regresa true si la encuentra en cualquiera de las dos condiciones
  return cadena_idMotivo.indexOf(busqueda) > -1 || cadena_nombreMotivo.indexOf(busqueda) > -1  ;
}



}
