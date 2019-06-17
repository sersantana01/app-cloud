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
import { TelefonosEmergenciaComponent } from './telefonos-emergencia/telefonos-emergencia.component';

import {getEspanolPaginatorIntl} from '../../shared/paginatorEspanol/paginator-espanol'
 
import {
    MatAutocompleteModule, 
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatPaginatorIntl 
    
  } from '@angular/material';

@NgModule({
    imports: [ 
        
    MatAutocompleteModule, 
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule, 
        
    RouterModule, CommonModule, MatButtonModule, FormsModule , NgSelectModule , NgbModule],
    declarations: [ NavbarComponent, InicioLlamadaComponent, LlamadaComunComponent, ShortcutsComponent, ConsultaLlamadaComponent, TelefonosEmergenciaComponent ],
   
    providers: [
      { provide: MatPaginatorIntl, useValue: getEspanolPaginatorIntl() }
    ],
      
    exports: [ NavbarComponent,  MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule, 
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule ]
})

export class NavbarModule {}
