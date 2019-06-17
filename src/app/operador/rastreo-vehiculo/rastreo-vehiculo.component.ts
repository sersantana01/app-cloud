import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-rastreo-vehiculo',
  templateUrl: './rastreo-vehiculo.component.html',
  styleUrls: ['./rastreo-vehiculo.component.css']
})
export class RastreoVehiculoComponent implements OnInit {
  private desdeFolio: string;
  private hastaFolio: string;
  private desdeFecha: string;
  private hastaFecha: string;
  private motivos: [];
  private calle: string;
  private colonia: string;
  private tipoVehiculo: [];
  private marca: [];
  private modelo: [];
  private numeroPlaca: string;
  private numeroSerie: string;
  private color: [];
  private rastreo: [];
  private anio: [];
  private antiguedad: [];

  constructor() { }

  ngOnInit() {
  }

}
