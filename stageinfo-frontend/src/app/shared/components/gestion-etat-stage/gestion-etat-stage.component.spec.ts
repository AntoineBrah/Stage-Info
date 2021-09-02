import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtatStageComponent } from './gestion-etat-stage.component';

describe('GestionEtatStageComponent', () => {
  let component: GestionEtatStageComponent;
  let fixture: ComponentFixture<GestionEtatStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEtatStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEtatStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
