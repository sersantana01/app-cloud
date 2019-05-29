import {Denunciante} from './denunciante.model';

export class Evento {

 public prefolio:string;

 public motivo: string;
  public descripcion: string;
  public prioridad: string;
  
  public numeroTelefonico: string;
  
  public idDispositivoReportado: string;
  public fechaInicio: string;            //de preferencia guardar el dato en tipo long
  public fechaFin: string;               //de preferencia guardar el dato en tipo long
  public origen: string;
  public estatus: string;
  public idContacto: string;
  public estatusCaptura: string;
  public idPuntoInteres: string;
  public idMacroEvento: string;
  public creadoPor: string;
  
  public idDescripcionEvento: string;
  
  public idEvento: string;
  public uuid: string;
    
  public latitud: string;
  public longitud: string;
  public zonaPatrullaje: string;
 public modificadoPor: string;
  public denunciante: Denunciante;
  
  public listaInstituciones=[];
  
     constructor(    ) {  

         this.listaInstituciones=[];



      }
}


