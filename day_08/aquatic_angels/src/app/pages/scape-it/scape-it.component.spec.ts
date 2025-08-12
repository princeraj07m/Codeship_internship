import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScapeItComponent } from './scape-it.component';

describe('ScapeItComponent', () => {
  let component: ScapeItComponent;
  let fixture: ComponentFixture<ScapeItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScapeItComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScapeItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
