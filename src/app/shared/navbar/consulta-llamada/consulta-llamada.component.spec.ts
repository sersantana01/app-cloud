import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaLlamadaComponent } from './consulta-llamada.component';

describe('ConsultaLlamadaComponent', () => {
  let component: ConsultaLlamadaComponent;
  let fixture: ComponentFixture<ConsultaLlamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaLlamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaLlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
