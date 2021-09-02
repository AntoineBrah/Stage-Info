import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleDocComponent } from './exemple-doc.component';

describe('ExempleDocComponent', () => {
  let component: ExempleDocComponent;
  let fixture: ComponentFixture<ExempleDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExempleDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExempleDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
