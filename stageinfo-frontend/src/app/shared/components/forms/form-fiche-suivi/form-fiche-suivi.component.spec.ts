import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFicheSuiviComponent } from './form-fiche-suivi.component';

describe('FormFicheSuiviComponent', () => {
  let component: FormFicheSuiviComponent;
  let fixture: ComponentFixture<FormFicheSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFicheSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFicheSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
