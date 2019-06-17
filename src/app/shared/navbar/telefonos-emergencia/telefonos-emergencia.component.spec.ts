import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonosEmergenciaComponent } from './telefonos-emergencia.component';

describe('TelefonosEmergenciaComponent', () => {
  let component: TelefonosEmergenciaComponent;
  let fixture: ComponentFixture<TelefonosEmergenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelefonosEmergenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonosEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
