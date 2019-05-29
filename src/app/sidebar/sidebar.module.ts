import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RegistroLlamadaComponent} from '../operador/llamadaReal/registro-llamada/registro-llamada.component';


@NgModule({
    imports: [ RouterModule, CommonModule, NgSelectModule ,FormsModule,NgSelectModule,  NgbModule],
    declarations: [ SidebarComponent, RegistroLlamadaComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
