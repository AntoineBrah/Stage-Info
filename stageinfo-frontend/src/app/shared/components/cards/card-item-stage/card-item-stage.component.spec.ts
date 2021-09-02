import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemStageComponent } from './card-item-stage.component';

describe('CardItemStageComponent', () => {
  let component: CardItemStageComponent;
  let fixture: ComponentFixture<CardItemStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardItemStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
