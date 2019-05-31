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

  public refresh() {
    //alert('Refrescar');
    this.ngOnInit();
  }

  public setXY(x: number, y: number) {
    this.setMapCenter(x, y);
  }

  public setMapCenter(latitudX, longitudY){
    let latitud=latitudX
    let longitud=longitudY
    let url="http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&numExterior=&idInstitucion=1&idSistemaGeoAlerta=9&idSistema=1"

    console.log(url);
    $('#myFrameSiga').prop('src',url );  
  }

  public getLlamadasAtendidas(data: any) {
    let urlGetLlamadasAtendidas = 'http://3.14.155.2:9094/obtenerLlamadasAtendidas';

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
