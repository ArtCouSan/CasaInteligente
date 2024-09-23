import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnaliseColaborador } from '../../../../core/dto/analise-colaborador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faPercent, faRotate } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnaliseColaboradorService } from '../../../../service/analise-colaborador.service';
import { InformativoComponent } from '../../../shared/modals/informativo/informativo.component';

@Component({
  selector: 'app-analise-colaborador',
  templateUrl: './analise-colaborador.component.html',
  styleUrls: ['./analise-colaborador.component.scss']
})
export class AnaliseColaboradorComponent implements OnInit {

  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'evasao', 'porcentagem_evasao', 'acoes'];
  dataSource = new MatTableDataSource<AnaliseColaborador>();
  analiseColaborador: AnaliseColaborador[] = [];
  colaboradorParaAnalisar: AnaliseColaborador | null = null;
  isLoadingTabela = false;
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

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private analiseColaboradorService: AnaliseColaboradorService
  ) {
    library.addIcons(faEye, faPercent, faRotate);
  }

  ngOnInit(): void {
    this.carregarAnalises(); // Carrega as análises ao inicializar o componente
  }

  // Método para carregar análises com paginação e ordenação
  carregarAnalises(
    page: number = 1,
    perPage: number = 5,
    search: string = this.search,
    sortColumn: string = this.sortColumn,
    sortDirection: string = this.sortDirection
  ): void {
    this.analiseColaboradorService.getAnalisesColaboradores(page, perPage, search, sortColumn, sortDirection)
      .subscribe(
        (response: any) => {
          this.analiseColaborador = response.analises;
          this.dataSource.data = this.analiseColaborador; // Atribuir dados ao dataSource
          this.totalItems = response.total_items; // Número total de análises
          this.currentPage = response.current_page; // Página atual

          // Atualiza manualmente as propriedades do paginator, se inicializado
          if (this.paginator) {
            this.paginator.length = this.totalItems; // Número total de registros
            this.paginator.pageIndex = this.currentPage - 1; // Índice da página atual
            this.paginator.pageSize = this.perPage; // Tamanho da página
          }
        },
        error => {
          this.abrirModalInformativo('Erro', 'Erro ao carregar análises de colaboradores.');
          this.isLoadingTabela = false;
        }
      );
  }

  aplicarFiltro(valor: string): void {
    this.currentPage = 1; // Reseta para a primeira página quando um filtro é aplicado
    this.carregarAnalises(this.currentPage, this.perPage, valor.trim());
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.aplicarFiltro(filterValue);
  }

  // Método para capturar a mudança de ordenação
  onSortChange(event: Sort): void {
    if (this.sortColumn === event.active && this.sortDirection === event.direction) {
      // Inverte a direção de ordenação se for a mesma coluna e direção
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Caso contrário, defina a coluna e direção fornecidas pelo evento
      this.sortColumn = event.active;
      this.sortDirection = event.direction || 'asc'; // Define 'asc' como padrão se não houver direção
    }
    // Carrega as análises com a nova ordenação
    this.carregarAnalises(this.currentPage, this.perPage, this.search, this.sortColumn, this.sortDirection);
  }

  // Chamado ao clicar na paginação
  onPaginateChange(event: any) {
    this.carregarAnalises(event.pageIndex + 1, event.pageSize, this.search, this.sortColumn, this.sortDirection);
  }

  // Método para recarregar todas as análises
  recarregarTodasAnalises(): void {
    this.isLoadingTabela = true;
    let mensagem = "";

    this.analiseColaboradorService.getRecarregarEvasaoTodosColaboradores().subscribe(
      response => {
        mensagem = 'Análise de evasão recarregada para todos os colaboradores.';
        this.isLoadingTabela = false;
        this.abrirModalInformativo('Sucesso', mensagem); // Abre o modal após o sucesso
        this.carregarAnalises(this.currentPage, this.perPage, this.search, this.sortColumn, this.sortDirection); // Recarrega as análises
      },
      error => {
        mensagem = 'Erro ao recarregar análise de evasão.';
        this.isLoadingTabela = false;
        this.abrirModalInformativo('Erro', mensagem); // Abre o modal após o erro
      }
    );
  }

  resetar(): void {
    this.colaboradorParaAnalisar = null;
    this.dataSource.paginator = this.paginator
  }

  voltar(): void {
    this.aplicarFiltro(' ');
    this.resetar();
  }

  getColor(evasao: string): string {
    if (evasao == "Não") return 'green';
    if (evasao == "Sim") return 'red';
    return 'green';
  }

  // Método para recarregar a análise de um colaborador específico
  recarregarColaborador(analise: AnaliseColaborador): void {
    this.isLoadingTabela = true;
    let mensagem = "";

    if (analise.colaborador.id !== undefined) {
      this.analiseColaboradorService.getRecarregarEvasaoColaborador(analise.colaborador.id).subscribe(
        response => {
          mensagem = 'Análise de evasão recarregada para o colaborador.';
          this.isLoadingTabela = false;
          this.abrirModalInformativo('Sucesso', mensagem); // Abre o modal após o sucesso
          this.carregarAnalises(this.currentPage, this.perPage, this.search, this.sortColumn, this.sortDirection); // Recarrega as análises
        },
        error => {
          mensagem = 'Erro ao recarregar análise de evasão para o colaborador.';
          this.isLoadingTabela = false;
          this.abrirModalInformativo('Erro', mensagem); // Abre o modal após o erro
        }
      );
    } else {
      mensagem = "O ID do colaborador é undefined";
      this.isLoadingTabela = false;
      this.abrirModalInformativo('Erro', mensagem); // Abre o modal para o caso de ID indefinido
    }
  }

  // Método para abrir o modal informativo
  abrirModalInformativo(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    const dialogRef = this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload(); // Recarrega a página
    });
  }

  analisarColaborador(analise: AnaliseColaborador) {
    this.colaboradorParaAnalisar = analise;
  }
}
