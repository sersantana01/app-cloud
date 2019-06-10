import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material';
import {FormsModule} from '@angular/forms';
import { InicioLlamadaComponent } from '../../operador/inicio-llamada/inicio-llamada.component';
import {LlamadaComunComponent} from '../../operador/llamada-comun/llamada-comun.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ShortcutsComponent} from '../../operador/llamada-comun/shortcuts/shortcuts.component';
import { ConsultaLlamadaComponent } from './consulta-llamada/consulta-llamada.component';



@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule, FormsModule , NgSelectModule , NgbModule],
    declarations: [ NavbarComponent, InicioLlamadaComponent, LlamadaComunComponent, ShortcutsComponent, ConsultaLlamadaComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
