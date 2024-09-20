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
import { InformativoComponent } from '../../../shared/modals/informativo/informativo.component';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'texto', 'acoes'];
  dataSource = new MatTableDataSource<Pergunta>();
  pesquisaParaEditar: Pergunta | null = null;
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
    let erros = 0;
    if (this.pesquisaParaEditar) {
      if (pesquisa.id) {
        this.pesquisaService.updatePergunta(pesquisa.id!, pesquisa).subscribe(
          () => {
          },
          error => {
            erros++;
          }
        );
      } else {
        this.pesquisaService.createPergunta(pesquisa).subscribe(
          () => {
          },
          error => {
            erros++;
          }
        );
      }

      setTimeout(() => {
        if (erros === 0) {
          this.abrirModalInformativo('Sucesso', 'Pergunta alterada/criada com sucesso!');
        } else {
          this.abrirModalInformativo('Erro', 'Ocorreu um erro ao enviar algumas respostas.');
        }
      }, 1000);

      this.carregarPesquisas();
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
    this.isLoadingTabela = true;
    this.pesquisaService.getPerguntas().subscribe(
      (pesquisas: Pergunta[]) => {
        this.dataSource.data = pesquisas;
        setTimeout(() => {
          this.isLoadingTabela = false;
        }, 1000);
      },
      error => {
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

  abrirModalInformativo(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });
  }
}
