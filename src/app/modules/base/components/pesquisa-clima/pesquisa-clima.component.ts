import { Component, signal } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Pergunta } from '../../../../core/dto/pergunta';
import { PesquisaService } from '../../../../service/pesquisa.service';
import { Resposta } from '../../../../core/dto/resposta';

@Component({
  selector: 'app-pesquisa-clima',
  templateUrl: './pesquisa-clima.component.html',
  styleUrl: './pesquisa-clima.component.scss'
})
export class PesquisaClimaComponent {

  readonly panel = signal(true);
  perguntas: Pergunta[] = [];
  colaboradorId = 1;  // Supondo que o ID do colaborador seja 1, substitua pelo valor real
  trimestre = 'Q1';  // Ajuste conforme o trimestre real
  ano = new Date().getFullYear();

  constructor(
    library: FaIconLibrary,
    private pesquisaService: PesquisaService
  ) {
    library.addIcons(farStar, fasStar);
    library.addIcons(faPaperPlane);
  }

  ngOnInit(): void {
    this.carregarPerguntas();
  }

  carregarPerguntas(): void {
    this.pesquisaService.getPerguntas().subscribe({
      next: (perguntas) => {
        this.perguntas = perguntas.map(pergunta => ({ ...pergunta, nota: 0 }));
        this.carregarRespostasExistentes();
      },
      error: (err) => console.error('Erro ao carregar perguntas:', err)
    });
  }

  carregarRespostasExistentes(): void {
    this.pesquisaService.getRespostas(this.colaboradorId, this.trimestre, this.ano).subscribe({
      next: (respostas) => {
        respostas.forEach(resposta => {
          const perguntaIndex = this.perguntas.findIndex(p => p.id === resposta.pergunta_id);
          if (perguntaIndex !== -1) {
            this.perguntas[perguntaIndex].nota = resposta.nota;  // Preenche a nota com a resposta existente
          }
        });
      },
      error: (err) => console.error('Erro ao carregar respostas existentes:', err)
    });
  }

  rate(perguntaIndex: number, value: number): void {
    this.perguntas[perguntaIndex].nota = value;
  }

  enviarNotas(): void {
    const respostas: Resposta[] = this.perguntas.map(pergunta => ({
      colaborador_id: this.colaboradorId,
      pergunta_id: pergunta.id!,
      nota: pergunta.nota,
      trimestre: this.trimestre,
      ano: this.ano
    }));

    respostas.forEach(resposta => {
      this.pesquisaService.createResposta(resposta.colaborador_id, resposta).subscribe({
        next: (response) => console.log('Resposta enviada com sucesso:', response),
        error: (err) => console.error('Erro ao enviar resposta:', err)
      });
    });
  }

}