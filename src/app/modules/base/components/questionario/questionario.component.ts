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

  @ViewChild(MatSort)
  sort!: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(valor: string): void {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.aplicarFiltro(filterValue);
    this.resetar();
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
      (pesquisas: Pesquisa[]) => {
        this.dataSource.data = pesquisas;
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
  }

  voltar(): void {
    this.aplicarFiltro(' ');
    this.resetar();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  subirArquivo(event: any): void {
    const file = event.target.files[0];
    // if (file) {
    //   this.pesquisaService.uploadPesquisasCsv(file).subscribe({
    //     next: (response) => {
    //       this.carregarPesquisas();
    //       this.snackBar.open('Upload realizado com sucesso!', 'Fechar', {
    //         duration: 3000,
    //       });
    //     },
    //     error: (err) => {
    //       this.snackBar.open(`${err.error.error}`, 'Fechar', {
    //         duration: 5000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center'
    //       });
    //     }
    //   });
    // }
  }

  marcarComoAnonima(pesquisa: Pesquisa): void {
    this.pesquisaService.marcarPesquisa(pesquisa.id!, { is_pesquisa_anonima: 1 }).subscribe(
      () => {
        this.snackBar.open('Pesquisa marcada como anônima.', 'Fechar', { duration: 2000 });
        this.carregarPesquisas();
      },
      error => this.snackBar.open('Erro ao marcar pesquisa como anônima.', 'Fechar', { duration: 2000 })
    );
  }

  marcarComoFechada(pesquisa: Pesquisa): void {
    this.pesquisaService.marcarPesquisa(pesquisa.id!, { is_pesquisa_fechada: 1 }).subscribe(
      () => {
        this.snackBar.open('Pesquisa marcada como fechada.', 'Fechar', { duration: 2000 });
        this.carregarPesquisas();
      },
      error => this.snackBar.open('Erro ao marcar pesquisa como fechada.', 'Fechar', { duration: 2000 })
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
}