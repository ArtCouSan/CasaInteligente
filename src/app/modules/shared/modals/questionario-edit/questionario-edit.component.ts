import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Pesquisa } from '../../../../core/dto/pesquisa';

@Component({
  selector: 'app-questionario-edit',
  templateUrl: './questionario-edit.component.html',
  styleUrl: './questionario-edit.component.scss'
})
export class QuestionarioEditComponent {

  @Input()
  pesquisa!: Pesquisa;
  @Output() salvar = new EventEmitter<Pesquisa>();
  @Output() voltar = new EventEmitter<void>();

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(faCheck);
    library.addIcons(faAngleLeft);
  }

  ngOnInit(): void {
  }

  onVoltar() {
    this.voltar.emit();
  }

  onSalvar(): void {
    this.salvar.emit(this.pesquisa);
  }
}
