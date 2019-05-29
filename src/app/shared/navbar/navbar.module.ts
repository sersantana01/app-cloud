import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material';
import {FormsModule} from '@angular/forms';
import { InicioLlamadaComponent } from '../../operador/inicio-llamada/inicio-llamada.component';

@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule, FormsModule ],
    declarations: [ NavbarComponent, InicioLlamadaComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
