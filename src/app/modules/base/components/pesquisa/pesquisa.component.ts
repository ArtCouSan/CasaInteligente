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
  pesquisas: Pergunta[] = [];

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
    library.addIcons(faPen, faTrash, faListCheck, faBan, faCheck, faFileArrowUp, faFileArrowDown, faBookMedical);
  }

  ngOnInit(): void {
    this.carregarPesquisas();
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.aplicarFiltro(filterValue);
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
            this.abrirModalInformativo('Sucesso', 'Pergunta alterada com sucesso!');
          },
          error => {
            this.abrirModalInformativo('Erro', 'Ocorreu um erro ao enviar algumas respostas.');
          }
        );
      } else {
        this.pesquisaService.createPergunta(pesquisa).subscribe(
          () => {
            this.abrirModalInformativo('Sucesso', 'Pergunta criada com sucesso!');
          },
          error => {
            this.abrirModalInformativo('Erro', 'Ocorreu um erro ao enviar algumas respostas.');
          }
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
        this.abrirModalInformativo('Sucesso', `Pergunta foi excluída com sucesso.`);
      },
      error => this.abrirModalInformativo('Erro', 'Erro ao excluir pergunta.')
    );
  }

  carregarPesquisas(): void {
    this.isLoadingTabela = true;
    this.pesquisaService.getPerguntas().subscribe(
      (pesquisas: Pergunta[]) => {
        this.pesquisas = pesquisas; // Armazena todas as perguntas carregadas
        this.dataSource.data = this.pesquisas; // Inicialmente atribui ao dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.isLoadingTabela = false;
        }, 1000);
      },
      error => {
        this.isLoadingTabela = false;
        this.snackBar.open('Erro ao carregar perguntas.', 'Fechar', { duration: 2000 });
      }
    );
  }

  resetar(): void {
    this.pesquisaParaEditar = null;
    this.dataSource.data = this.pesquisas; // Reatribui todos os dados ao dataSource
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
    // Primeiro, reatribua todos os dados ao dataSource para garantir que todas as perguntas estejam presentes
    this.dataSource.data = this.pesquisas;

    // Verifica se o valor do filtro não está vazio
    if (valor.trim().toLowerCase()) {
      const valorFiltrado = valor.trim().toLowerCase();
      const pesquisasFiltradas = this.pesquisas.filter(pesquisa => {
        // Verifica se o valor do filtro corresponde a qualquer uma das propriedades desejadas
        return pesquisa.texto.toLowerCase().includes(valorFiltrado);
      });

      // Atualiza o dataSource com o resultado do filtro
      this.dataSource.data = pesquisasFiltradas;
    } else {
      // Se o valor do filtro estiver vazio, redefine o dataSource para todas as perguntas
      this.dataSource.data = this.pesquisas;
    }

    // Reatribui o paginator e sort após a filtragem
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
