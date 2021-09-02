import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoParcoursComponent } from './info-parcours.component';

describe('InfoParcoursComponent', () => {
  let component: InfoParcoursComponent;
  let fixture: ComponentFixture<InfoParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
