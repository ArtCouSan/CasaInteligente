import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faListCheck, faBan, faCheck, faFileArrowUp, faFileArrowDown, faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../../shared/modals/confirmar-delecao/confirmar-delecao.component';
import { PesquisaService } from '../../../../service/pesquisa.service'; // Serviço de Pesquisa
import { BaseComponent } from '../../base.component';
import { Pergunta } from '../../../../core/dto/pergunta';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'texto', 'acoes'];
  dataSource = new MatTableDataSource<Pergunta>();

  pesquisaParaEditar: Pergunta | null = null;

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
    library.addIcons(faPen, faTrash, faListCheck, faBan, faCheck, faFileArrowUp, faFileArrowDown, faBookMedical);
  }

  ngOnInit(): void {
    this.carregarPesquisas();
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
      texto: '',
      acoes: 'Adicionar',
      selecionada: false
    };
  }

  editarPesquisa(pesquisa: Pergunta): void {
    this.pesquisaParaEditar = { ...pesquisa };
  }

  salvarPesquisa(pesquisa: Pergunta): void {
    if (this.pesquisaParaEditar) {
      if (pesquisa.id) {
        this.pesquisaService.updatePergunta(pesquisa.id!, pesquisa).subscribe(
          () => {
            this.snackBar.open('Pesquisa atualizada com sucesso!', 'Fechar', { duration: 2000 });
            this.carregarPesquisas();
          },
          error => this.snackBar.open('Erro ao atualizar pesquisa.', 'Fechar', { duration: 2000 })
        );
      } else {
        this.pesquisaService.createPergunta(pesquisa).subscribe(
          () => {
            this.snackBar.open('Pergunta criada com sucesso!', 'Fechar', { duration: 2000 });
            this.carregarPesquisas();
          },
          error => this.snackBar.open('Erro ao criar pergunta.', 'Fechar', { duration: 2000 })
        );
      }
      this.pesquisaParaEditar = null;
    }
  }

  confirmarExclusao(pesquisa: Pergunta) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent, {
      data: { message: `Tem certeza que deseja excluir a pergunta ${pesquisa.texto}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirPesquisa(pesquisa);
      }
    });
  }

  excluirPesquisa(pesquisa: Pergunta): void {
    this.pesquisaService.deletePergunta(pesquisa.id!).subscribe(
      () => {
        this.snackBar.open(`${pesquisa.texto} foi excluída com sucesso.`, 'Fechar', { duration: 2000 });
        this.carregarPesquisas();
      },
      error => this.snackBar.open('Erro ao excluir pergunta.', 'Fechar', { duration: 2000 })
    );
  }

  carregarPesquisas(): void {
    this.pesquisaService.getPerguntas().subscribe(
      (pesquisas: Pergunta[]) => {
        this.dataSource.data = pesquisas;
      },
      error => this.snackBar.open('Erro ao carregar perguntas.', 'Fechar', { duration: 2000 })
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
}
