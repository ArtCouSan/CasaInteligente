import { Component, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../auth/auth.service';
import { Colaborador } from '../../../../core/dto/colaborador';
import { Pergunta } from '../../../../core/dto/pergunta';
import { Resposta } from '../../../../core/dto/resposta';
import { PesquisaService } from '../../../../service/pesquisa.service';
import { Pesquisa } from '../../../../core/dto/pesquisa';
import { InformativoComponent } from '../../../shared/modals/informativo/informativo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pesquisa-anonima',
  templateUrl: './pesquisa-anonima.component.html',
  styleUrls: ['./pesquisa-anonima.component.scss']
})
export class PesquisaAnonimaComponent {
  perguntas: Pergunta[] = [];  // Array de perguntas com opções de resposta
  colaboradorId: number = 0;  // Armazena o ID do colaborador logado
  ano = new Date().getFullYear();  // Pega o ano atual
  pesquisa: Pesquisa = {
    id: 0,
    acoes: '',
    ano: 0,
    descricao: '',
    titulo: '',
    perguntas: [],
    respostas: []
  };
  isLoadingTela = false;

  constructor(
    library: FaIconLibrary,
    private pesquisaService: PesquisaService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    library.addIcons(faPaperPlane);
  }

  ngOnInit(): void {
    this.carregarPerguntas();
    const colaborador: Colaborador = this.authService.getCurrentUser();  // Recupera o colaborador logado
    if (colaborador && colaborador.id) {
      this.colaboradorId = colaborador.id;  // Armazena o ID do colaborador
    }
  }

  // Carrega as perguntas e inicializa suas notas como 0
  carregarPerguntas(): void {
    this.isLoadingTela = true;
    this.pesquisaService.getPesquisaAnonima().subscribe({
      next: (pesquisa) => {
        this.pesquisa = pesquisa;
        if (pesquisa.perguntas) {  // Verifica se a lista de perguntas está definida
          this.perguntas = pesquisa.perguntas.map(pergunta => ({
            ...pergunta,
            nota: 0  // Inicializa a nota como 0
          }));
        } else {
          console.error('Nenhuma pergunta encontrada para a pesquisa fechada.');
        }
        this.carregarRespostasExistentes();  // Carrega as respostas já dadas pelo colaborador
      },
      error: (err) => console.error('Erro ao carregar pesquisa fechada:', err)
    });
  }

  // Carrega as respostas anônimas já enviadas pelo colaborador
  carregarRespostasExistentes(): void {
    if (this.colaboradorId && this.pesquisa.id) {
      this.pesquisaService.getRespostasAnonimas(this.colaboradorId).subscribe({
        next: (respostas) => {
          respostas.forEach(resposta => {
            const perguntaIndex = this.perguntas.findIndex(p => p.id === resposta.pergunta_id);
            if (perguntaIndex !== -1) {
              this.perguntas[perguntaIndex].nota = resposta.nota;  // Preenche a nota com a resposta existente
            }
            setTimeout(() => {
              this.isLoadingTela = false;
            }, 1000);
          });
        },
        error: (err) => {
          console.error('Erro ao carregar respostas anônimas:', err)
          setTimeout(() => {
            this.isLoadingTela = false;
          }, 1000);
        }
      });
    }
  }

  // Define a nota de uma pergunta com base na opção selecionada pelo usuário
  rate(perguntaIndex: number, nota: number): void {
    const pergunta = this.perguntas[perguntaIndex];
    pergunta.nota = nota;  // Atualiza a nota da pergunta com a opção selecionada
  }

  enviarNotas(): void {
    this.isLoadingTela = true;
    let erros = 0;
    if (this.pesquisa?.id === null || this.pesquisa?.id === undefined) {
      console.error('Nenhuma pesquisa carregada');
      return;
    }

    const respostas: Resposta[] = this.perguntas.map(pergunta => ({
      colaborador_id: this.colaboradorId,  // ID do colaborador
      pesquisa_id: this.pesquisa?.id!,    // ID da pesquisa
      pergunta_id: pergunta.id,           // ID da pergunta
      nota: pergunta.nota !== undefined ? pergunta.nota : 0, // Garante que a nota seja um número
      is_pesquisa_anonima: 1  // Marca como pesquisa anônima
    }));

    respostas.forEach(resposta => {
      this.pesquisaService.createResposta(resposta.colaborador_id, resposta).subscribe({
        next: (response) => console.log('Resposta enviada com sucesso:', response),
        error: (err) => {
          console.error('Erro ao enviar resposta:', err)
          erros++;
        }
      });
    });

    setTimeout(() => {
      this.isLoadingTela = false;
    }, 1000);

    setTimeout(() => {
      if (erros === 0) {
        this.abrirModalInformativo('Sucesso', 'Respostas enviadas com sucesso!');
      } else {
        this.abrirModalInformativo('Erro', 'Ocorreu um erro ao enviar algumas respostas.');
      }
    }, 1000);
  }

  abrirModalInformativo(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });
  }
}
