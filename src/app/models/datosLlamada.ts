import {Evento} from './evento.model';

export class DatosLlamada {

  public ultimoModificado: string;
  public listaEventos=Array<Evento>();
  
     constructor(    ) {  

         this.listaEventos=[];
        


      }
}
