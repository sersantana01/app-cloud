import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
declare var $: any;

@Component({
  selector: 'app-grids-llamadas',
  templateUrl: './grids-llamadas.component.html',
  styleUrls: ['./grids-llamadas.component.css']
})
export class GridsLlamadasComponent implements OnInit {
  private uuid: string = '5';
  private llamadasAtendidas: [];

  constructor(public http: HttpClient) { }

  ngOnInit() {
    let getData = {};
    let params = [];
    let param = {};

    param['nombreParametro'] = 'uuid';
    param['tipo'] = 'String';
    param['valor'] = this.uuid;

    params.push(param);

    getData['nombreMs'] = 'MS_Grid_Llamadas';
    getData['nombrePaquete'] = 'telefonista';
    getData['nombreStoreProcedure'] = 'llam_atendidas';
    getData['param'] = params;

    this.getLlamadasAtendidas(getData);
  }

  public obtainXY(x: number, y: number) {
    let getData = {};
    let params = [];
    let param1 = {};
    let param2 = {};
    let param3 = {};

    param1['nombreParametro'] = 'uuid';
    param1['tipo'] = 'String';
    param1['valor'] = this.uuid;

    params.push(param1);

    param2['nombreParametro'] = 'coordenada_x';
    param2['tipo'] = 'int';
    param2['valor'] = x;

    params.push(param2);

    param3['nombreParametro'] = 'coordenada_y';
    param3['tipo'] = 'int';
    param3['valor'] = y;

    params.push(param3);
    
    getData['nombreMs'] = 'MS_Grid_Llamadas';
    getData['nombrePaquete'] = 'telefonista';
    getData['nombreStoreProcedure'] = 'llam_atendidas';
    getData['param'] = params;

    this.setXY(getData);
  }

  public setXY(data: any) {
    let urlSetCoordenadas = 'http://192.168.11.110:8080/enviarCoordenadas';

    this.http.post(urlSetCoordenadas, data).subscribe(
      (response) => {
        alert('Se enviaron las coordenadas');
      }
    );
  }

  public getLlamadasAtendidas(data: any) {
    let urlGetLlamadasAtendidas = 'http://192.168.11.110:8080/obtenerLlamadasAtendidas';

    this.http.post(urlGetLlamadasAtendidas, data).subscribe(
      (response) => {
        this.llamadasAtendidas = response["items"];
      }
    );
  }

  public cerrarTabla() {
    $('.icnMinimizarTabla').hide();
    $('.tabTablaResultados').hide();
    $('.icnMaximizarTabla').show();
  }

  public abrirTabla() {
    $('.icnMinimizarTabla').show();
    $('.tabTablaResultados').show();
    $('.icnMaximizarTabla').hide();
  }


}
