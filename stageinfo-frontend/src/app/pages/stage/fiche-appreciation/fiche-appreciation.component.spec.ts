import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAppreciationComponent } from './fiche-appreciation.component';

describe('FicheAppreciationComponent', () => {
  let component: FicheAppreciationComponent;
  let fixture: ComponentFixture<FicheAppreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheAppreciationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheAppreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
