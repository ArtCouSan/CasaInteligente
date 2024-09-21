import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnaliseColaborador } from '../../../../core/dto/analise-colaborador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faPercent } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnaliseColaboradorService } from '../../../../service/analise-colaborador.service';

@Component({
  selector: 'app-analise-colaborador',
  templateUrl: './analise-colaborador.component.html',
  styleUrls: ['./analise-colaborador.component.scss']
})
export class AnaliseColaboradorComponent implements OnInit {

  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'evasao', 'acoes'];
  dataSource = new MatTableDataSource<AnaliseColaborador>();
  colaboradorParaAnalisar: AnaliseColaborador | null = null;
  isLoadingTabela = false;
  analiseColaborador: AnaliseColaborador[] = [];

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

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private analiseColaboradorService: AnaliseColaboradorService // Injeção do serviço
  ) {
    library.addIcons(faEye, faPercent);
  }

  ngOnInit(): void {
    this.carregarAnalises();
  }

  aplicarFiltro(valor: string): void {
    // Primeiro, reatribua todos os dados ao dataSource para garantir que todos os colaboradores estejam presentes
    this.dataSource.data = this.analiseColaborador;

    // Verifica se o valor do filtro não está vazio
    if (valor.trim().toLowerCase()) {
      const valorFiltrado = valor.trim().toLowerCase();
      const analisesFiltradas = this.analiseColaborador.filter(analise => {
        // Verifica se o valor do filtro corresponde a qualquer uma das propriedades desejadas
        return (
          analise.colaborador.nome.toLowerCase().includes(valorFiltrado) ||
          analise.colaborador.cpf.includes(valorFiltrado) ||
          analise.colaborador.departamento.nome.toLowerCase().includes(valorFiltrado) ||
          analise.motivo.toLowerCase().includes(valorFiltrado) ||
          analise.evasao.toLowerCase().includes(valorFiltrado) ||
          analise.sugestao.toLowerCase().includes(valorFiltrado) ||
          analise.observacao.toLowerCase().includes(valorFiltrado)
        );
      });

      // Atualiza o dataSource com o resultado do filtro
      this.dataSource.data = analisesFiltradas;
    } else {
      // Se o valor do filtro estiver vazio, redefine o dataSource para todos os colaboradores
      this.dataSource.data = this.analiseColaborador;
    }

    // Reatribui o paginator e sort após a filtragem
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarAnalises(): void {
    this.isLoadingTabela = true;
    this.analiseColaboradorService.getAnalisesColaboradores().subscribe(
      (analises: AnaliseColaborador[]) => {
        this.analiseColaborador = analises;
        this.dataSource.data = this.analiseColaborador; // Atribuição dos dados ao dataSource
        this.dataSource.paginator = this.paginator; // Reatribuindo paginator e sort
        this.dataSource.sort = this.sort;
        this.isLoadingTabela = false;
      },
      error => {
        this.snackBar.open('Erro ao carregar análises de colaboradores.', 'Fechar', {
          duration: 3000
        });
        this.isLoadingTabela = false;
      }
    );
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.aplicarFiltro(filterValue);
  }

  analisarColaborador(analise: AnaliseColaborador) {
    this.colaboradorParaAnalisar = analise;
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
}
