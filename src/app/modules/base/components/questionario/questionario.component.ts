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

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {
  displayedColumns: string[] = ['titulo', 'descricao', 'ano', 'acoes']; // Colunas para Pesquisa
  dataSource = new MatTableDataSource<Pesquisa>(); // Tabela para Pesquisa

  pesquisaParaEditar: Pesquisa | null = null;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  @Input() baseComponent!: BaseComponent;

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private pesquisaService: PesquisaService // Injetando o serviço de Pesquisa
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
      ano: 0,
      titulo: '',
      respostas: [],
      acoes: 'Adicionar'
    };
  }

  editarPesquisa(pesquisa: Pesquisa): void {
    this.pesquisaParaEditar = { ...pesquisa };
  }

  salvarPesquisa(pesquisa: Pesquisa): void {
    if (this.pesquisaParaEditar) {
      if (pesquisa.id) {
        this.pesquisaService.updatePesquisa(pesquisa.id!, pesquisa).subscribe(
          () => {
            this.snackBar.open('Pesquisa atualizada com sucesso!', 'Fechar', { duration: 2000 });
            this.carregarPesquisas();
          },
          error => this.snackBar.open('Erro ao atualizar pesquisa.', 'Fechar', { duration: 2000 })
        );
      } else {
        this.pesquisaService.createPesquisa(pesquisa).subscribe(
          () => {
            this.snackBar.open('Pergunta criada com sucesso!', 'Fechar', { duration: 2000 });
            this.carregarPesquisas();
          },
          error => this.snackBar.open('Erro ao criar pesquisa.', 'Fechar', { duration: 2000 })
        );
      }
      this.pesquisaParaEditar = null;
    }
  }

  confirmarExclusao(pesquisa: Pesquisa) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent, {
      data: { message: `Tem certeza que deseja excluir a pesquisa ${pesquisa.titulo}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirPesquisa(pesquisa);
      }
    });
  }

  excluirPesquisa(pesquisa: Pesquisa): void {
    this.pesquisaService.deletePesquisa(pesquisa.id!).subscribe(
      () => {
        this.snackBar.open(`${pesquisa.titulo} foi excluída com sucesso.`, 'Fechar', { duration: 2000 });
        this.carregarPesquisas();
      },
      error => this.snackBar.open('Erro ao excluir pesquisa.', 'Fechar', { duration: 2000 })
    );
  }

  carregarPesquisas(): void {
    this.pesquisaService.getPesquisas().subscribe(
      (pesquisas: Pesquisa[]) => {
        this.dataSource.data = pesquisas;
      },
      error => this.snackBar.open('Erro ao carregar pesquisas.', 'Fechar', { duration: 2000 })
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
}