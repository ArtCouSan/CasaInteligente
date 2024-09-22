import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnaliseColaborador } from '../../../../core/dto/analise-colaborador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
    library.addIcons(faEye, faPercent, faRotate);
  }

  ngOnInit(): void {
    this.carregarAnalises();
  }

  aplicarFiltro(valor: string): void {
    this.dataSource.data = this.analiseColaborador;

    if (valor.trim().toLowerCase()) {
      const valorFiltrado = valor.trim().toLowerCase();
      const analisesFiltradas = this.analiseColaborador.filter(analise => {
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

      this.dataSource.data = analisesFiltradas;
    } else {
      this.dataSource.data = this.analiseColaborador;
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarAnalises(): void {
    this.isLoadingTabela = true;
    this.analiseColaboradorService.getAnalisesColaboradores().subscribe(
      (analises: AnaliseColaborador[]) => {
        this.analiseColaborador = analises;
        this.dataSource.data = this.analiseColaborador;
        this.dataSource.paginator = this.paginator;
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

  // Método para recarregar a análise de todos os colaboradores
  recarregarTodasAnalises(): void {
    this.isLoadingTabela = true;
    let mensagem = "";

    // Chama o serviço para recarregar a análise de evasão de todos os colaboradores
    this.analiseColaboradorService.getRecarregarEvasaoTodosColaboradores().subscribe(
      response => {
        mensagem = 'Análise de evasão recarregada para todos os colaboradores.';
        this.isLoadingTabela = false;
        this.abrirModalInformativo('Sucesso', mensagem); // Abre o modal após o sucesso
      },
      error => {
        mensagem = 'Erro ao recarregar análise de evasão.';
        this.isLoadingTabela = false;
        this.abrirModalInformativo('Erro', mensagem); // Abre o modal após o erro
      }
    );
  }

  // Método para recarregar a análise de colaboradores ativos
  recarregarColaborador(analise: AnaliseColaborador): void {
    this.isLoadingTabela = true;
    let mensagem = "";

    // Verifica se o id do colaborador não é undefined
    if (analise.colaborador.id !== undefined) {
      // Chama o serviço para recarregar a análise de evasão do colaborador
      this.analiseColaboradorService.getRecarregarEvasaoColaborador(analise.colaborador.id).subscribe(
        response => {
          mensagem = 'Análise de evasão recarregada para o colaborador.';
          this.isLoadingTabela = false;
          this.abrirModalInformativo('Sucesso', mensagem); // Abre o modal após o sucesso
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

  abrirModalInformativo(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    const dialogRef = this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload(); // Recarrega a página
    });
  }

}
