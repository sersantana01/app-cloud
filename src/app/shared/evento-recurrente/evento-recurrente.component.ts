import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-evento-recurrente',
  templateUrl: './evento-recurrente.component.html',
  styleUrls: ['./evento-recurrente.component.css']
})
export class EventoRecurrenteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*$('#eventoRecurrente').prop('disabled', true);
    $('#eventoRecurrente').css({
      'cursor': 'pointer',
      'opacity': '0.6'
    });*/
  }
  guardar() {
    console.log('Saving works!');
  }
}
