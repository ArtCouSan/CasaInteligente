import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaEditComponent } from './pergunta-edit.component';

describe('PerguntaEditComponent', () => {
  let component: PerguntaEditComponent;
  let fixture: ComponentFixture<PerguntaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerguntaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerguntaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
