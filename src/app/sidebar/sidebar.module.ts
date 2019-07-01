import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegistroLlamadaComponent} from '../operador/llamadaReal/registro-llamada/registro-llamada.component';
import { GridsLlamadasComponent } from '../operador/grids-llamadas/grids-llamadas.component';
import {ArmasComponent} from '../shared/armas/armas.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MatButtonModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';



@NgModule({
    imports: [ RouterModule, CommonModule, NgSelectModule ,FormsModule,NgSelectModule,  NgbModule, MatButtonModule,
        MatToolbarModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDatepickerModule,
        MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    declarations: [ SidebarComponent, RegistroLlamadaComponent, GridsLlamadasComponent, ArmasComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
