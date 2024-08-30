import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaClimaComponent } from './pesquisa-clima.component';

describe('PesquisaClimaComponent', () => {
  let component: PesquisaClimaComponent;
  let fixture: ComponentFixture<PesquisaClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaClimaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PesquisaClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
