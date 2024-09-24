import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faListCheck, faBan, faCheck, faFileArrowUp, faFileArrowDown, faBookMedical, faUserSecret, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { PesquisaService } from '../../../../service/pesquisa.service';
import { ConfirmarDelecaoComponent } from '../../../shared/modals/confirmar-delecao/confirmar-delecao.component';
import { BaseComponent } from '../../base.component';
import { Pesquisa } from '../../../../core/dto/pesquisa';
import { InformativoComponent } from '../../../shared/modals/informativo/informativo.component';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {

  private reloadSubscription!: Subscription;

  displayedColumns: string[] = ['titulo', 'descricao', 'ano', 'acoes']; // Colunas para Pesquisa
  dataSource = new MatTableDataSource<Pesquisa>(); // Tabela para Pesquisa
  pesquisaParaEditar: Pesquisa | null = null;
  isLoadingTabela = false;
  questionarios: Pesquisa[] = [];

  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  @Input() baseComponent!: BaseComponent;

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pesquisaService: PesquisaService
  ) {
    library.addIcons(faPen, faTrash, faListCheck, faBan, faCheck, faFileArrowUp, faFileArrowDown, faBookMedical, faUserSecret, faUserTie);
  }

  ngOnInit(): void {
    this.carregarPesquisas(); // Carregar as pesquisas na inicialização
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.aplicarFiltro(filterValue);
  }

  adicionarPesquisa(): void {
    this.pesquisaParaEditar = {
      id: 0,
      descricao: '',
      ano: 2023,
      titulo: '',
      respostas: [],
      acoes: 'Adicionar'
    };
  }

  editarPesquisa(pesquisa: Pesquisa): void {
    this.pesquisaParaEditar = { ...pesquisa };
  }

  salvarPesquisa(pesquisa: Pesquisa): void {
    let erros = 0;
    if (this.pesquisaParaEditar) {
      if (pesquisa.id) {
        this.pesquisaService.updatePesquisa(pesquisa.id!, pesquisa).subscribe(
          () => {
            this.mostrarModalInformativoComReload('Sucesso', 'Questionário alterado com sucesso!');
          },
          error => {
            erros++;
            this.mostrarModalInformativoComReload('Erro', 'Ocorreu um erro ao atualizar o questionário.');
          }
        );
      } else {
        this.pesquisaService.createPesquisa(pesquisa).subscribe(
          () => {
            this.mostrarModalInformativoComReload('Sucesso', 'Questionário criado com sucesso!');
          },
          error => {
            erros++;
            this.mostrarModalInformativoComReload('Erro', 'Ocorreu um erro ao criar o questionário.');
          }
        );
      }
      this.pesquisaParaEditar = null;
    }
  }

  confirmarExclusao(pesquisa: Pesquisa): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent, {
      data: { message: `Tem certeza que deseja excluir a pesquisa ${pesquisa.titulo}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirPesquisaComReload(pesquisa);
      }
    });
  }

  // Método para excluir a pesquisa e recarregar a página após exclusão
  excluirPesquisaComReload(pesquisa: Pesquisa): void {
    this.pesquisaService.deletePesquisa(pesquisa.id!).subscribe(
      () => {
        this.mostrarModalInformativoComReload('Sucesso', `${pesquisa.titulo} foi excluída com sucesso.`);
      },
      error => this.mostrarModalInformativoComReload('Erro', 'Erro ao excluir pesquisa.')
    );
  }

  carregarPesquisas(): void {
    this.isLoadingTabela = true;
    this.pesquisaService.getPesquisas().subscribe(
      (questionarios: Pesquisa[]) => {
        this.questionarios = questionarios; // Armazena todas as perguntas carregadas
        this.dataSource.data = this.questionarios; // Inicialmente atribui ao dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.isLoadingTabela = false;
        }, 1000);
      },
      error => {
        this.snackBar.open('Erro ao carregar pesquisas.', 'Fechar', { duration: 2000 })
        this.isLoadingTabela = false;
      }
    );
  }

  resetar(): void {
    this.pesquisaParaEditar = null;
    this.dataSource.data = this.questionarios; // Reatribui todos os dados ao dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  voltar(): void {
    this.aplicarFiltro(' ');
    this.resetar();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  subirArquivo(event: any): void {
    this.isLoadingTabela = true;
    const file = event.target.files[0];
    if (file) {
      this.pesquisaService.uploadPesrquisaCsv(file).subscribe({
        next: (response) => {
          this.mostrarModalInformativoComReload('Sucesso', `Carga foi enviada com sucesso.`);
        },
        error: (err) => {
          this.mostrarModalInformativoComReload('Erro', `Carga foi enviada com erro.`);
        }
      });
    }
  }

  confirmarEnvioPesquisaAnonima(pesquisa: Pesquisa) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent, {
      data: { message: `Tem certeza que deseja enviar a pesquisa?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.marcarComoAnonima(pesquisa);
      }
    });
  }

  marcarComoAnonima(pesquisa: Pesquisa): void {
    this.isLoadingTabela = true;
    this.pesquisaService.marcarPesquisa(pesquisa.id!, { is_pesquisa_anonima: 1 }).subscribe(
      () => {
        this.mostrarModalInformativoComReload('Sucesso', `${pesquisa.titulo} foi enviada com sucesso.`);
        setTimeout(() => {
          this.isLoadingTabela = false;
        }, 1000);
      },
      error => {
        this.isLoadingTabela = false;
        this.snackBar.open('Erro ao marcar pesquisa como anônima.', 'Fechar', { duration: 2000 })
      }
    );
  }

  confirmarEnvioPesquisaFechada(pesquisa: Pesquisa) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent, {
      data: { message: `Tem certeza que deseja enviar a pesquisa?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.marcarComoFechada(pesquisa);
      }
    });
  }

  marcarComoFechada(pesquisa: Pesquisa): void {
    this.isLoadingTabela = true;
    this.pesquisaService.marcarPesquisa(pesquisa.id!, { is_pesquisa_fechada: 1 }).subscribe(
      () => {
        this.mostrarModalInformativoComReload('Sucesso', `${pesquisa.titulo} foi enviada com sucesso.`);
        setTimeout(() => {
          this.isLoadingTabela = false;
        }, 1000);
      },
      error => {
        this.isLoadingTabela = false;
        this.snackBar.open('Erro ao marcar pesquisa como anônima.', 'Fechar', { duration: 2000 })
      }
    );
  }

  // Método para mostrar o modal e recarregar a página após o fechamento
  mostrarModalInformativoComReload(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    const dialogRef = this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });

    // Recarrega a página somente após o modal ser fechado
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload(); // Recarrega a página após fechar o modal
    });
  }

  aplicarFiltro(valor: string): void {
    this.dataSource.data = this.questionarios; // Garante que todos os dados estão presentes

    if (valor.trim().toLowerCase()) {
      const valorFiltrado = valor.trim().toLowerCase();
      const pesquisasFiltradas = this.questionarios.filter(questionario => {
        return (
          questionario.titulo.toLowerCase().includes(valorFiltrado) ||
          questionario.descricao.toLowerCase().includes(valorFiltrado) ||
          questionario.ano.toString().includes(valorFiltrado)
        );
      });

      this.dataSource.data = pesquisasFiltradas;
    } else {
      this.dataSource.data = this.questionarios;
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}