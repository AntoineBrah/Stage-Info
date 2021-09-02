import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntriesNumberComponent } from './nbItems.component';

describe('ListEntriesNumberComponent', () => {
  let component: ListEntriesNumberComponent;
  let fixture: ComponentFixture<ListEntriesNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEntriesNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntriesNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
