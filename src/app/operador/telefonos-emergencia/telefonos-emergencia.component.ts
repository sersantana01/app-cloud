import { Component, OnInit, ViewChild } from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { RegistroLlamadaService } from '../../operador/llamadaReal/registro-llamada/registro-llamada.service';
import { MatTableModule } from '@angular/material';

@Component({
 selector: 'app-telefonos-emergencia',
 templateUrl: './telefonos-emergencia.component.html',
 styleUrls: ['./telefonos-emergencia.component.css']
})
export class TelefonosEmergenciaComponent implements OnInit {


 public displayedColumns: string[] = ['nombre_tel_emergencia', 'telefono1', 'telefono2' ];  //COLUMNAS QUE SE DESPLIEGAN EN LA TABLA
 public dataSource:any;                                                           //COLECCION DE DATOS PARA ITERAR EN LA TABLA
 public footerFilterFlag=true;                                            //FLAG PARA MOSTRAR CUANDO HAY REGISTROS EN EL FILTRO O NO

 public uuid=5;

 public endpointCatTelEmergencia= "http:///3.14.155.2:9096/api/telefonoemergencia/getCatalogoTelefonosEmergencia" ;

 @ViewChild(MatSort ) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;


 constructor(
   public restCaller: RegistroLlamadaService
  
   ) {  }

 ngOnInit() {

   this.getTelefonosEmergencia();
   //console.log(this.dataSource);

 }

 applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  
   if(this.dataSource.filteredData.length<1){ 

     this.footerFilterFlag=false;

   }else{

     this.footerFilterFlag=true;
   
   }
 
  }


 public getTelefonosEmergencia(){


   var callInstituciones = {};
   callInstituciones["uuid"]=this.uuid;      

  this.restCaller.sendCall(callInstituciones,this.endpointCatTelEmergencia).subscribe(// llamadada a restcaller
    (data) => {
     //   this.itemsSelectInstituciones=data["items"];
        console.log(  data["items"]);

        this.dataSource = new MatTableDataSource(

           data["items"]

        );
            
         this.dataSource.sort = this.sort;   
         this.dataSource.paginator = this.paginator;
  });

}
 

}


