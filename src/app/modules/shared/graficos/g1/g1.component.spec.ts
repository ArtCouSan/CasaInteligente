import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G1Component } from './g1.component';

describe('G1Component', () => {
  let component: G1Component;
  let fixture: ComponentFixture<G1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G1Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(G1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
