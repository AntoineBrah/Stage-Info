import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoutenanceComponent } from './add-soutenance.component';

describe('AddSoutenanceComponent', () => {
  let component: AddSoutenanceComponent;
  let fixture: ComponentFixture<AddSoutenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSoutenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
