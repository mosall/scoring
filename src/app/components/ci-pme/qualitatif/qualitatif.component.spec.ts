import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitatifComponent } from './qualitatif.component';

describe('QualitatifComponent', () => {
  let component: QualitatifComponent;
  let fixture: ComponentFixture<QualitatifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitatifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
