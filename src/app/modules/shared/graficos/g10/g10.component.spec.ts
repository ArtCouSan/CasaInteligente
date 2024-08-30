import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G10Component } from './g10.component';

describe('G10Component', () => {
  let component: G10Component;
  let fixture: ComponentFixture<G10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G10Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(G10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
