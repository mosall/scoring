import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeClotureeComponent } from './demande-cloturee.component';

describe('DemandeClotureeComponent', () => {
  let component: DemandeClotureeComponent;
  let fixture: ComponentFixture<DemandeClotureeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeClotureeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeClotureeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
