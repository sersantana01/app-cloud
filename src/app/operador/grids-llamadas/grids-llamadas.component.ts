import { Component, OnInit } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-grids-llamadas',
  templateUrl: './grids-llamadas.component.html',
  styleUrls: ['./grids-llamadas.component.css']
})
export class GridsLlamadasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


public cerrarTabla(){
  $('.icnMinimizarTabla').hide();
  $('.tabTablaResultados').hide();
  $('.icnMaximizarTabla').show();
}

public abrirTabla(){
  $('.icnMinimizarTabla').show();
  $('.tabTablaResultados').show();
  $('.icnMaximizarTabla').hide();
}


}
