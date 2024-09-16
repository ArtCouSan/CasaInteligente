import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaAnonimaComponent } from './pesquisa-anonima.component';

describe('PesquisaAnonimaComponent', () => {
  let component: PesquisaAnonimaComponent;
  let fixture: ComponentFixture<PesquisaAnonimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisaAnonimaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaAnonimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
