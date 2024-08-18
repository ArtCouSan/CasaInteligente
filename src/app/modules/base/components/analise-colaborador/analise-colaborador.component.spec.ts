import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseColaboradorComponent } from './analise-colaborador.component';

describe('AnaliseColaboradorComponent', () => {
  let component: AnaliseColaboradorComponent;
  let fixture: ComponentFixture<AnaliseColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaliseColaboradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnaliseColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
