import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisPmeComponent } from './lis-pme.component';

describe('LisPmeComponent', () => {
  let component: LisPmeComponent;
  let fixture: ComponentFixture<LisPmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisPmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LisPmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
