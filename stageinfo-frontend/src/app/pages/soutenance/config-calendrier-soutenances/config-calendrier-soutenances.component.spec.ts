import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCalendrierSoutenancesComponent } from './config-calendrier-soutenances.component';

describe('ConfigCalendrierSoutenancesComponent', () => {
  let component: ConfigCalendrierSoutenancesComponent;
  let fixture: ComponentFixture<ConfigCalendrierSoutenancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCalendrierSoutenancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCalendrierSoutenancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
