import { Component, OnInit, ViewChild } from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
 

import { RegistroLlamadaService } from '../../../operador/llamadaReal/registro-llamada/registro-llamada.service';


@Component({
  selector: 'app-telefonos-emergencia',
  templateUrl: './telefonos-emergencia.component.html',
  styleUrls: ['./telefonos-emergencia.component.css']
})
export class TelefonosEmergenciaComponent implements OnInit {


  public displayedColumns: string[] = ['nombre_tel_emergencia', 'telefono1', 'telefono2' ];  //COLUMNAS QUE SE DESPLIEGAN EN LA TABLA 
  public dataSource:any;                                                           //COLECCION DE DATOS PARA ITERAR EN LA TABLA
  public footerFilterFlag=true;                                            //FLAG PARA MOSTRAR CUANDO HAY REGISTROS EN EL FILTRO O NO

  uuid=5;

  public endpointCatTelEmergencia= "http:///3.14.155.2:9096/api/telefonoemergencia/getCatalogoTelefonosEmergencia" ;

  @ViewChild(MatSort ) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    public restCaller: RegistroLlamadaService 
    
    ) { 
  /*  this.dataSource = new MatTableDataSource([
      {institucion: "POLICIA",    telefono1:"111",telefono2: "12121212"},
      {institucion: "BOMBEROS",   telefono1:"222",telefono2: "23232323"},
      {institucion: "AMBULANCIA", telefono1:"333",telefono2: "34343434"},
      {institucion: "SEGURO",     telefono1:"444",telefono2: "45454545"},
      {institucion: "OTRA1",     telefono1:"123",telefono2: "11111"},
      {institucion: "OTRA2",     telefono1:"456",telefono2: "22222"},
      {institucion: "OTRA3",     telefono1:"789",telefono2: "33333"},
      {institucion: "OTRA4",     telefono1:"101",telefono2: "44444"},
      {institucion: "OTRA5",     telefono1:"990",telefono2: "55555"},       
      {institucion: "OTRA6",     telefono1:"990",telefono2: "66666"},        
      {institucion: "OTRA7",     telefono1:"990",telefono2: "77777"},        
      {institucion: "OTRA8",     telefono1:"990",telefono2: "88888"} 
    
    ]); */
  }

  ngOnInit() {

    this.getTelefonosEmergencia();
    console.log(this.dataSource);

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
