import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcoursComponent } from './list-parcours.component';

describe('ListParcoursComponent', () => {
  let component: ListParcoursComponent;
  let fixture: ComponentFixture<ListParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParcoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
