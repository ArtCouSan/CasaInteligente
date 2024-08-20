import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G7Component } from './g7.component';

describe('G7Component', () => {
  let component: G7Component;
  let fixture: ComponentFixture<G7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(G7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
