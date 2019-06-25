import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Evento} from 'src/app/models/evento.model';
import { Ubicacion} from 'src/app/models/ubicacion.model';

import { DatosLlamada} from '../../models/datosLlamada';


@Injectable({
providedIn: 'root'
})
export class DataSharedService {

//private llamadasEvento = new Array<Evento>();


//OBSERVABLE PARA LOS DATOS DE LAS LLAMADAS QUE HA TOMADO EL OPERADOR
private datosLlamada = new DatosLlamada();
private datosLlamadaSubject = new Subject<DatosLlamada>();
public datosLlamadaObservable$ = this.datosLlamadaSubject.asObservable();



//OBSERVABLE PARA LA UBICACION QUE SE RECIBA DEL SERVICIO DE OBTENER UBICACION
private ubicacionActual = new Ubicacion();
private ubicacionActualSubject = new Subject<Ubicacion>();
public ubicacionActualObservable$ = this.ubicacionActualSubject.asObservable();

constructor() { }

crearLlamada(nuevaLlamada) {
  this.datosLlamada.listaEventos.push(nuevaLlamada);
  this.datosLlamada.ultimoModificado=nuevaLlamada.prefolio;

  this.datosLlamadaSubject.next(this.datosLlamada);
}


buscarLlamada(idPrefolio: string,eventoLlamada: Evento) {

  /*
  this.llamadasEvento.splice(index, 1);
  this.itemsSubject.next(this.items);*/
   //this.llamadasSubject.next(this.llamadasEvento);


}


buscarUltimoEvento() {
console.log(this.datosLlamada);
 let ultimoEvento;
 for(let x=0;x<this.datosLlamada.listaEventos.length;x++){

   if(this.datosLlamada.listaEventos[x].prefolio== this.datosLlamada.ultimoModificado){
     console.log("ULTIMO FUE:"+this.datosLlamada.listaEventos[x].prefolio);
     ultimoEvento=this.datosLlamada.listaEventos[x];
   }
 }

return ultimoEvento!=null? ultimoEvento:null;
}


public setUbicacionLlamada(latitud,longitud, zp){


 this.ubicacionActual.latitud=latitud;
 this.ubicacionActual.longitud=longitud;
  console.log("LAT:"+latitud+"|||"+"LONG:"+longitud+"||||ZP:"+zp );

 this.ubicacionActualSubject.next(this.ubicacionActual);

}


actualizarLlamada(idPrefolio: string,eventoLlamada: Evento) {

/*
this.llamadasEvento.splice(index, 1);
this.itemsSubject.next(this.items);*/

for(let x=0;x<this.datosLlamada.listaEventos.length;x++){

  if(this.datosLlamada.listaEventos[x].prefolio== idPrefolio){

    this.datosLlamada.listaEventos[x]=eventoLlamada;
    console.log("ACTUALIZADO");

    this.datosLlamada.ultimoModificado=idPrefolio;
    this.datosLlamadaSubject.next(this.datosLlamada);
    console.log("ULTIDMO:"+this.datosLlamada.ultimoModificado);


  }
}



}


}





