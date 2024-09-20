import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar
import { Pergunta } from '../../../../core/dto/pergunta';
import { RespostaOpcao } from '../../../../core/dto/resposta-opcao'; // Interface para RespostaOpcao
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faAngleLeft, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { InformativoComponent } from '../informativo/informativo.component';

@Component({
  selector: 'app-pergunta-edit',
  templateUrl: './pergunta-edit.component.html',
  styleUrls: ['./pergunta-edit.component.scss']
})
export class PerguntaEditComponent {

  @Input() pergunta!: Pergunta;
  @Output() salvar = new EventEmitter<Pergunta>();
  @Output() voltar = new EventEmitter<void>();

  novaOpcao: RespostaOpcao = { texto: '', nota: 1 };  // Nova opção de resposta

  constructor(
    library: FaIconLibrary,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    library.addIcons(faCheck, faAngleLeft, faCirclePlus, faTrashCan);
  }

  ngOnInit(): void {
    if (!this.pergunta.opcoes_resposta) {
      this.pergunta.opcoes_resposta = [];  // Inicializa caso esteja vazio
    }
  }

  adicionarOpcao(): void {
    if (this.novaOpcao.texto && this.novaOpcao.nota) {
      // Inicializa o array de opcoes_resposta se estiver undefined
      if (!this.pergunta.opcoes_resposta) {
        this.pergunta.opcoes_resposta = [];  // Inicializa como um array vazio
      }

      // Verifica se a nota já existe nas opções de resposta
      const notaJaExiste = this.pergunta.opcoes_resposta.some(opcao => opcao.nota === this.novaOpcao.nota);

      if (notaJaExiste) {
        this.snackBar.open('Essa nota já foi atribuída a outra opção. Escolha uma nota diferente.', 'Fechar', {
          duration: 3000,
        });
      } else {
        // Adiciona a nova opção se a nota for única
        this.pergunta.opcoes_resposta.push({ ...this.novaOpcao });
        this.novaOpcao = { texto: '', nota: 1 }; // Limpa os campos após a inserção
      }
    } else {
      this.snackBar.open('Preencha o texto e a nota para adicionar uma nova opção.', 'Fechar', {
        duration: 3000,
      });
    }
  }

  removerOpcao(index: number): void {
    if (this.pergunta.opcoes_resposta) {
      this.pergunta.opcoes_resposta.splice(index, 1);
    }
  }

  onVoltar(): void {
    this.voltar.emit();
  }

  onSalvar(): void {
    this.salvar.emit(this.pergunta);
  }

  abrirModalInformativo(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });
  }
}
