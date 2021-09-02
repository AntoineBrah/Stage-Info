import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheNotationComponent } from './fiche-notation.component';

describe('FicheNotationComponent', () => {
  let component: FicheNotationComponent;
  let fixture: ComponentFixture<FicheNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheNotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
