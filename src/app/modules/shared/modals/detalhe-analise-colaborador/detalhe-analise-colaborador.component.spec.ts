import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheAnaliseColaboradorComponent } from './detalhe-analise-colaborador.component';

describe('DetalheAnaliseColaboradorComponent', () => {
  let component: DetalheAnaliseColaboradorComponent;
  let fixture: ComponentFixture<DetalheAnaliseColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheAnaliseColaboradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheAnaliseColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
