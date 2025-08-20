import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquascapingComponent } from './aquascaping.component';

describe('AquascapingComponent', () => {
  let component: AquascapingComponent;
  let fixture: ComponentFixture<AquascapingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AquascapingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AquascapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
