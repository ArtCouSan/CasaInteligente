import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G11Component } from './g11.component';

describe('G11Component', () => {
  let component: G11Component;
  let fixture: ComponentFixture<G11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G11Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(G11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
