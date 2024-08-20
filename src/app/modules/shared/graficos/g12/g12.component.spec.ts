import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G12Component } from './g12.component';

describe('G12Component', () => {
  let component: G12Component;
  let fixture: ComponentFixture<G12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(G12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
