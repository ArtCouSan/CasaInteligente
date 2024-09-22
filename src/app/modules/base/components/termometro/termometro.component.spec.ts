import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermometroComponent } from './termometro.component';

describe('TermometroComponent', () => {
  let component: TermometroComponent;
  let fixture: ComponentFixture<TermometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermometroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
