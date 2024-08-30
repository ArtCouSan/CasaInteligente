import { ComponentFixture, TestBed } from '@angular/core/testing';

import { G4Component } from './g4.component';

describe('G4Component', () => {
  let component: G4Component;
  let fixture: ComponentFixture<G4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [G4Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(G4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
