import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThTableSortComponent } from './th-table-sort.component';

describe('ThTableSortComponent', () => {
  let component: ThTableSortComponent;
  let fixture: ComponentFixture<ThTableSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThTableSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThTableSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
