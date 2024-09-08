import { Component, signal } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Pergunta } from '../../../../core/dto/pergunta';
import { PesquisaService } from '../../../../service/pesquisa.service';
import { Resposta } from '../../../../core/dto/resposta';
import { AuthService } from '../../../../auth/auth.service';
import { Colaborador } from '../../../../core/dto/colaborador';

@Component({
  selector: 'app-pesquisa-clima',
  templateUrl: './pesquisa-clima.component.html',
  styleUrls: ['./pesquisa-clima.component.scss']
})
export class PesquisaClimaComponent {

  // readonly panel = signal(true);
  // perguntas: Pergunta[] = [];  // Array de perguntas
  // colaboradorId: number = 0;  // Armazena o ID do colaborador logado
  // trimestre = 'Q1';  // Ajuste conforme o trimestre real
  // ano = new Date().getFullYear();  // Pega o ano atual

  // constructor(
  //   library: FaIconLibrary,
  //   private pesquisaService: PesquisaService,
  //   private authService: AuthService
  // ) {
  //   library.addIcons(faPaperPlane);
  // }

  // ngOnInit(): void {
  //   this.carregarPerguntas();
  //   const colaborador: Colaborador = this.authService.getCurrentUser();  // Recupera o colaborador logado
  //   if (colaborador && colaborador.id) {
  //     this.colaboradorId = colaborador.id;  // Armazena o ID do colaborador
  //   }
  // }

  // // Carrega as perguntas e inicializa suas notas como 0
  // carregarPerguntas(): void {
  //   this.pesquisaService.getPerguntas().subscribe({
  //     next: (perguntas) => {
  //       this.perguntas = perguntas.map(pergunta => ({
  //         ...pergunta,
  //         nota: 0  // Inicializa a nota como 0
  //       }));
  //       this.carregarRespostasExistentes();  // Carrega as respostas já dadas pelo colaborador
  //     },
  //     error: (err) => console.error('Erro ao carregar perguntas:', err)
  //   });
  // }

  // // Carrega as respostas que o colaborador já deu anteriormente
  // carregarRespostasExistentes(): void {
  //   this.pesquisaService.getRespostas(this.colaboradorId, this.trimestre, this.ano).subscribe({
  //     next: (respostas) => {
  //       respostas.forEach(resposta => {
  //         const perguntaIndex = this.perguntas.findIndex(p => p.id === resposta.pergunta_id);
  //         if (perguntaIndex !== -1) {
  //           this.perguntas[perguntaIndex].nota = resposta.nota;  // Preenche a nota com a resposta existente
  //         }
  //       });
  //     },
  //     error: (err) => console.error('Erro ao carregar respostas existentes:', err)
  //   });
  // }

  // // Define a nota de uma pergunta com base no valor selecionado pelo usuário
  // rate(perguntaIndex: number, nota: number): void {
  //   const pergunta = this.perguntas[perguntaIndex];
  //   pergunta.nota = nota;  // Atualiza a nota da pergunta com o valor selecionado
  // }

  // // Envia as notas de cada pergunta respondida
  // enviarNotas(): void {
  //   const respostas: Resposta[] = this.perguntas.map(pergunta => ({
  //     colaborador_id: this.colaboradorId,  // ID do colaborador
  //     pergunta_id: pergunta.id,  // ID da pergunta
  //     nota: pergunta.nota,  // Nota dada pelo colaborador
  //     trimestre: this.trimestre,  // Trimestre da pesquisa
  //     ano: this.ano  // Ano da pesquisa
  //   }));

  //   respostas.forEach(resposta => {
  //     this.pesquisaService.createResposta(resposta.colaborador_id, resposta).subscribe({
  //       next: (response) => console.log('Resposta enviada com sucesso:', response),
  //       error: (err) => console.error('Erro ao enviar resposta:', err)
  //     });
  //   });
  // }
}
