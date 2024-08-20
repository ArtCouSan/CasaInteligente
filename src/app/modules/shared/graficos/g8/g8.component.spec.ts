import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G8Component } from './g8.component';

describe('G8Component', () => {
  let component: G8Component;
  let fixture: ComponentFixture<G8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(G8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
