import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFicheNotationComponent } from './form-fiche-notation.component';

describe('FormFicheNotationComponent', () => {
  let component: FormFicheNotationComponent;
  let fixture: ComponentFixture<FormFicheNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFicheNotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFicheNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
