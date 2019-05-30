import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsLlamadasComponent } from './grids-llamadas.component';

describe('GridsLlamadasComponent', () => {
  let component: GridsLlamadasComponent;
  let fixture: ComponentFixture<GridsLlamadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridsLlamadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsLlamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
