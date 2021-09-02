import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoutenancesComponent } from './list-soutenances.component';

describe('ListSoutenancesComponent', () => {
  let component: ListSoutenancesComponent;
  let fixture: ComponentFixture<ListSoutenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSoutenancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoutenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
