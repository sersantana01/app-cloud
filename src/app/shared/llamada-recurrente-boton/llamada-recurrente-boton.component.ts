import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-llamada-recurrente-boton',
  templateUrl: './llamada-recurrente-boton.component.html',
  styleUrls: ['./llamada-recurrente-boton.component.css']
})
export class LlamadaRecurrenteBotonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // FUNCIONES PARA MOSTRAR Y OCULTAR DIV RAZON DE LA LLAMADA
  ocultarDiv() {
    document.getElementById('envolventeLlamadaRecurrente').style.display = 'none';
    document.getElementById('contRazonCancelacion').style.display = 'block';
    document.getElementById('botonesPieLlamadaRecurrente').style.display = 'none';

  }
  mostrarDiv() {
    document.getElementById('envolventeLlamadaRecurrente').style.display = 'block';
    document.getElementById('contRazonCancelacion').style.display = 'none';
    document.getElementById('botonesPieLlamadaRecurrente').style.display = 'block';
  }
}
