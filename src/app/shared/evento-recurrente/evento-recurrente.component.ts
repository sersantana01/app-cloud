import { Component, OnInit, ViewChild } from '@angular/core';
import {GoogleMapService} from '../../maps/fullscreenmap/google-map.service';
import {HttpClient} from '@angular/common/http';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as $ from 'jquery';

@Component({
  selector: 'app-evento-recurrente',
  templateUrl: './evento-recurrente.component.html',
  styleUrls: ['./evento-recurrente.component.css']
})
export class EventoRecurrenteComponent implements OnInit {
  @ViewChild('modalEventCerc') modalCercanos;

  eventosCercanos = [];
  public displayedColumns: string[] = ['id_evento', 'nombre_motivo' ];  //COLUMNAS QUE SE DESPLIEGAN EN LA TABLA
  public dataSource:any;                                                           //COLECCION DE DATOS PARA ITERAR EN LA TABLA
  public footerFilterFlag = true;

  @ViewChild(MatSort ) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  public getEventos() {
    let latitud = $("#lat").val();
    let longitud = $("#long").val();
/*    console.log($("#lat").val());
    console.log($("#long").val());*/
    const json = {
      'uuid': '5',
      'latitud': latitud,
      'longitud': longitud,
      'vSalida': ''
    };
    const endpointGetEventos = 'http://localhost:3097/api/eventoscercanos/getEventos';
    console.log(json);
    this.http.post(endpointGetEventos, json).subscribe(
        (data) => {
          this.eventosCercanos = data['v_salida'];
          console.log(this.eventosCercanos);
          this.dataSource = new MatTableDataSource(
              this.eventosCercanos
          );
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          $('#btn_abrir_eventos_cercanos').click();
        });
  }

}
