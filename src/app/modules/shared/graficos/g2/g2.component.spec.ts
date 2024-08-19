import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G2Component } from './g2.component';

describe('G2Component', () => {
  let component: G2Component;
  let fixture: ComponentFixture<G2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(G2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
