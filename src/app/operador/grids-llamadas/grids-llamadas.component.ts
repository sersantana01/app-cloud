import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GridsLlamadasService } from './grids-llamadas.service';
declare var $: any;

@Component({
  selector: 'app-grids-llamadas',
  templateUrl: './grids-llamadas.component.html',
  styleUrls: ['./grids-llamadas.component.css'],
  providers: [ GridsLlamadasService ]
})
export class GridsLlamadasComponent implements OnInit {
  private uuid: string = '5';
  public llamadasAtendidas: [];

  constructor(private http: HttpClient, private gridsLlamadasService: GridsLlamadasService) { }

  ngOnInit() {
    this.refreshLlamadasAtendidas();
  }

  public refreshLlamadasAtendidas() {
    let json = {};
    json['uuid'] = this.uuid;

    this.getLlamadasAtendidas(json);
  }

  public setXY(x: number, y: number) {
    this.setMapCenter(x, y);
  }

  public setMapCenter(latitudX, longitudY){
    let latitud=latitudX
    let longitud=longitudY
    let url=" http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&numExterior=&idInstitucion=1&idSistemaGeoAlerta=9&idSistema=1";

    $('#myFrameSiga').prop('src',url );  
  }

  public getLlamadasAtendidas(data: any) {
    //let urlGetLlamadasAtendidas = 'http://3.14.155.2:9094/obtenerLlamadasAtendidas';
    let urlGetLlamadasAtendidas = 'http://localhost:9089/obtenerLlamadasAtendidas';

    this.gridsLlamadasService.getLlamadasAtendidas(urlGetLlamadasAtendidas, data).subscribe(
      response => {
        this.llamadasAtendidas = response["items"];
      }
    );

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
