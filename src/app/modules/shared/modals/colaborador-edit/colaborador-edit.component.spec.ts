import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorEditComponent } from './colaborador-edit.component';

describe('ColaboradorEditComponent', () => {
  let component: ColaboradorEditComponent;
  let fixture: ComponentFixture<ColaboradorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradorEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColaboradorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
