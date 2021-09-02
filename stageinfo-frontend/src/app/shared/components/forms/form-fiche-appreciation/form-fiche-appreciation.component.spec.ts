import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAppreciationStageComponent } from './form-fiche-appreciation.component';

describe('FicheAppreciationStageComponent', () => {
  let component: FicheAppreciationStageComponent;
  let fixture: ComponentFixture<FicheAppreciationStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheAppreciationStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheAppreciationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
