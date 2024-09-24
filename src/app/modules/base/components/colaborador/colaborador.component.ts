import { Component, ViewChild, OnInit, ElementRef, Input } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faUserPlus, faBan, faCheck, faFileArrowUp, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Colaborador } from '../../../../core/dto/colaborador';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../../shared/modals/confirmar-delecao/confirmar-delecao.component';
import { ColaboradorService } from '../../../../service/colaborador.service';
import { BaseComponent } from '../../base.component';
import { InformativoComponent } from '../../../shared/modals/informativo/informativo.component';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent implements OnInit {

  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'exFuncionario', 'acoes'];
  dataSource = new MatTableDataSource<Colaborador>();
  colaboradorParaEditar: Colaborador | null = null;
  isLoadingTabela = false;
  salarioFormatado: string = '';
  colaboradores: Colaborador[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  perPage: number = 5;
  search: string = '';
  sortColumn: string = '';
  sortDirection: string = '';

  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.paginator) {
      this.paginator.length = this.totalItems; // Define o número total de registros
      this.paginator.pageIndex = this.currentPage - 1; // Define o índice da página atual
      this.paginator.pageSize = this.perPage; // Define o tamanho da página
    }
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  @Input() baseComponent!: BaseComponent;

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private colaboradorService: ColaboradorService
  ) {
    library.addIcons(faPen, faTrash, faUserPlus, faBan, faCheck, faFileArrowUp, faFileArrowDown);
  }

  ngOnInit(): void {
    this.carregarColaboradores();
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.carregarColaboradores(1, this.perPage, filterValue); // Sempre busca a partir da página 1
  }

  adicionarColaborador(): void {
    this.colaboradorParaEditar = {
      nome: '',
      cpf: '',
      idade: 0,
      genero: { id: 1, descricao: '' },
      estadoCivil: { id: 1, descricao: '' },
      telefone: '',
      email: '',
      formacao: { id: 1, descricao: '' },
      faculdade: { id: 1, nome: '' },
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      departamento: { id: 1, nome: '' },
      setor: { id: 1, nome: '' },
      salario: 0,
      cargo: { id: 1, nome: '' },
      gerente: '',
      tempoTrabalho: 0,
      quantidadeEmpresasTrabalhou: 0,
      quantidadeAnosTrabalhadosAnteriormente: 0,
      nivelEscolaridade: { id: 1, descricao: '' },
      exFuncionario: false,
      acoes: 'Adicionar',
      viagemTrabalho: { id: 1, descricao: '' },
      distanciaCasa: 0,
      porcentagemUltimoAumento: 0,
      quantidadeAnosAtualGestor: 0,
      quantidadeAnosNaEmpresa: 0,
      quantidadeHorasTreinamentoAno: 0,
      nivelTrabalho: 1,
      perfis: []
    };
  }

  editarColaborador(colaborador: Colaborador): void {
    this.colaboradorParaEditar = { ...colaborador };
  }

  salvarColaborador(colaborador: Colaborador): void {
    if (this.colaboradorParaEditar) {
      if (colaborador.id) {
        this.colaboradorService.updateColaborador(colaborador.id!, colaborador).subscribe(
          () => {
            this.snackBar.open('Colaborador atualizado com sucesso!', 'Fechar', { duration: 2000 });
            this.carregarColaboradores();
          },
          error => this.snackBar.open('Erro ao atualizar colaborador.', 'Fechar', { duration: 2000 })
        );
      } else {
        this.colaboradorService.createColaborador(colaborador).subscribe(
          () => {
            this.snackBar.open('Colaborador criado com sucesso!', 'Fechar', { duration: 2000 });
            this.carregarColaboradores();
          },
          error => this.snackBar.open('Erro ao criar colaborador.', 'Fechar', { duration: 2000 })
        );
      }
      this.colaboradorParaEditar = null;
    }
  }

  confirmarExclusao(colaborador: Colaborador) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent, {
      data: { message: `Tem certeza que deseja excluir ${colaborador.nome}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.excluirColaborador(colaborador);
      }
    });
  }

  excluirColaborador(colaborador: Colaborador): void {
    this.colaboradorService.deleteColaborador(colaborador.id!).subscribe(
      () => {
        this.snackBar.open(`${colaborador.nome} foi excluído com sucesso.`, 'Fechar', { duration: 2000 });
        this.carregarColaboradores();
      },
      error => this.snackBar.open('Erro ao excluir colaborador.', 'Fechar', { duration: 2000 })
    );
  }

  carregarColaboradores(
    page: number = 1,
    perPage: number = 5,
    search: string = this.search,
    sortColumn: string = this.sortColumn,
    sortDirection: string = this.sortDirection
  ): void {
    this.colaboradorService.getColaboradores(page, perPage, search, sortColumn, sortDirection)
      .subscribe(
        (response: any) => {
          this.colaboradores = response.colaboradores;
          this.dataSource.data = this.colaboradores; // Atribuir dados ao dataSource
          this.totalItems = response.total_items; // Número total de colaboradores
          this.currentPage = response.current_page; // Página atual

          // Atualiza manualmente as propriedades do paginator, se inicializado
          if (this.paginator) {
            this.paginator.length = this.totalItems; // Número total de registros
            this.paginator.pageIndex = this.currentPage - 1; // Índice da página atual
            this.paginator.pageSize = this.perPage; // Tamanho da página
          }
        },
        error => {
          this.snackBar.open('Erro ao carregar colaboradores.', 'Fechar', { duration: 2000 });
        }
      );
  }

  onPaginateChange(event: any): void {
    this.carregarColaboradores(event.pageIndex + 1, event.pageSize, this.search, this.sortColumn, this.sortDirection);
  }

  // No método aplicarFiltro
  aplicarFiltro(valor: string): void {
    this.currentPage = 1; // Reseta para a primeira página quando um filtro é aplicado
    this.search = valor.trim();
    this.carregarColaboradores(this.currentPage, this.perPage, valor.trim());
  }

  resetar(): void {
    this.colaboradorParaEditar = null;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = this.totalItems; // Agora usamos totalItems
    }
  }

  voltar(): void {
    this.aplicarFiltro(this.search);
    this.resetar();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  subirArquivo(event: any): void {
    this.isLoadingTabela = true;
    const file = event.target.files[0];
    if (file) {
      this.colaboradorService.uploadColaboradoresCsv(file).subscribe({
        next: (response) => {
          this.mostrarModalInformativoComReload('Sucesso', `Carga foi enviada com sucesso.`);
        },
        error: (err) => {
          this.mostrarModalInformativoComReload('Erro', `Carga foi enviada com erro.`);
        }
      });
    }
  }

  formatarParaBRL(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  onSortChange(event: Sort): void {
    // Verifica se a coluna é a mesma e a direção também
    if (this.sortColumn === event.active && this.sortDirection === event.direction) {
      // Inverte a direção de ordenação se for a mesma coluna e direção
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Caso contrário, defina a coluna e direção fornecidas pelo evento
      this.sortColumn = event.active;
      this.sortDirection = event.direction || 'asc'; // Define 'asc' como padrão se não houver direção
    }
    // Carrega os colaboradores com a nova ordenação
    this.carregarColaboradores(this.currentPage, this.perPage, this.search, this.sortColumn, this.sortDirection);
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
