import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Colaborador } from '../../../core/dto/colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-colaborador-edit',
  templateUrl: './colaborador-edit.component.html',
  styleUrl: './colaborador-edit.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class ColaboradorEditComponent {

  @Input() colaborador: Colaborador = {
    cpf: '',
    nome: '',
    departamento: '',
    acoes: ''
  };
  @Output() voltar = new EventEmitter<void>();

  constructor(library: FaIconLibrary){
    library.addIcons(faCheck);
    library.addIcons(faAngleLeft);
  }

  onVoltar() {
    this.voltar.emit(); 
  }

  salvar() {
    this.voltar.emit();
  }

}
