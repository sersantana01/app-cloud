import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule, MatInputModule,MatTableModule } from '@angular/material';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatPaginatorModule } from '@angular/material';


import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';




import {FormsModule} from '@angular/forms';
import { InicioLlamadaComponent } from '../../operador/inicio-llamada/inicio-llamada.component';
import {LlamadaComunComponent} from '../../operador/llamada-comun/llamada-comun.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShortcutsComponent} from '../../operador/llamada-comun/shortcuts/shortcuts.component';
import {ConsultaLlamadaComponent} from '../../operador/consulta-llamada/consulta-llamada.component';
import {TelefonosEmergenciaComponent} from '../../operador/telefonos-emergencia/telefonos-emergencia.component';
import { ActualizarDirectorioComponent } from '../../operador/actualizar-directorio/actualizar-directorio.component';
import { RastreoVehiculoComponent } from '../../operador/rastreo-vehiculo/rastreo-vehiculo.component';
import { from } from 'rxjs';
import {EventoRecurrenteComponent} from '../evento-recurrente/evento-recurrente.component';
import {LlamadaRecurrenteBotonComponent} from '../llamada-recurrente-boton/llamada-recurrente-boton.component';



@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule,MatPaginatorModule, MatTableModule,
               FormsModule , NgSelectModule , NgbModule, MatFormFieldModule, MatDatepickerModule, MatInputModule ],
    declarations: [ NavbarComponent, InicioLlamadaComponent, LlamadaComunComponent, ShortcutsComponent, 
        ConsultaLlamadaComponent, TelefonosEmergenciaComponent, ActualizarDirectorioComponent, RastreoVehiculoComponent, EventoRecurrenteComponent, LlamadaRecurrenteBotonComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
