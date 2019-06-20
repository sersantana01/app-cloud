import {Denunciante} from './denunciante.model';

export class Evento {

 public prefolio:string;

  public motivo: any;
  
  public motivoNombre: string;
  public descripcion: string;
  public prioridad: string;
  
  public numeroTelefonico: string;
  
  public idDispositivoReportado: string;
  public fechaInicio: string;            //de preferencia guardar el dato en tipo long
  public fechaFin: string;               //de preferencia guardar el dato en tipo long
  public origen: any;
  public origenNombre: string;
  public estatus: string;
  public idContacto: string;
  public estatusCaptura: string;
  public idPuntoInteres: string;
  public idMacroEvento: string;
  public creadoPor: string;
  public creadoPorNombre: string;
  
  public idDescripcionEvento: string;
  
  public idEvento: string;
  public uuid: string;
    
  public latitud: string;
  public longitud: string;
  public zonaPatrullaje: string;
  public modificadoPor: string;
  public denunciante: Denunciante;

  
  public tiempo:string;
  public ciudad:string;
  public municipio:string;
  public fechaRecepcion:string;
  public colonia:string;
  public tipoTelefono:string; 


/////////////////////////DATOS DENUNCIANTE///////////////////////////////////////////



  
  public listaInstituciones=[];
  
     constructor(    ) {  

         this.listaInstituciones=[];



      }
}


