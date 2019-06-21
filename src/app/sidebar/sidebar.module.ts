import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegistroLlamadaComponent} from '../operador/llamadaReal/registro-llamada/registro-llamada.component';
import { GridsLlamadasComponent } from '../operador/grids-llamadas/grids-llamadas.component';
import {ArmasComponent} from '../shared/armas/armas.component';
import {VehiculosComponent} from '../shared/vehiculos/vehiculos.component';
import {PersonasComponent} from '../shared/personas/personas.component';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [ RouterModule, CommonModule, NgSelectModule ,FormsModule,NgSelectModule,  NgbModule, MatButtonModule, MatToolbarModule,
        MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule],
    declarations: [ SidebarComponent, RegistroLlamadaComponent, GridsLlamadasComponent, ArmasComponent, VehiculosComponent, PersonasComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
