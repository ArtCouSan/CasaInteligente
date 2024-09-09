import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pergunta } from '../../../../core/dto/pergunta';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrl: './respostas.component.scss'
})
export class RespostasComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Pergunta) { }

}
