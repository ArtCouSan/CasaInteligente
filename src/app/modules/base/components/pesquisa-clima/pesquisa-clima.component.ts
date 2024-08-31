import { Component, signal } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Pergunta } from '../../../../core/dto/pergunta';

@Component({
  selector: 'app-pesquisa-clima',
  templateUrl: './pesquisa-clima.component.html',
  styleUrl: './pesquisa-clima.component.scss'
})
export class PesquisaClimaComponent {

  readonly panel = signal(true);

  constructor(
    library: FaIconLibrary
  ) {
    library.addIcons(farStar, fasStar);
    library.addIcons(faPaperPlane);
  }

  perguntas: Pergunta[] = [
    { texto: 'Qual é o seu nível de satisfação com o seu ambiente de trabalho?', nota: 0 },
    { texto: 'Como você descreveria seu nível de envolvimento com suas tarefas e responsabilidades no trabalho?', nota: 0 },
    { texto: 'Quão satisfeito você está com seu trabalho atual?', nota: 0 },
    { texto: 'Como você avalia sua satisfação com os relacionamentos profissionais que você tem na empresa (com colegas, supervisores, etc.)?', nota: 0 },
    { texto: 'Quão satisfeito você está com o equilíbrio entre sua vida profissional e pessoal?', nota: 0 }
  ];

  rate(perguntaIndex: number, value: number): void {
    this.perguntas[perguntaIndex].nota = value;
  }

  enviarNotas(): void {
    const notas = this.perguntas.map(pergunta => pergunta.nota);

    console.log('Notas enviadas:', notas);

    // Se precisar enviar para uma API, pode usar algo como:
    // this.http.post('url-da-sua-api', { notas }).subscribe(response => {
    //   console.log('Notas enviadas com sucesso:', response);
    // });
  }

}
