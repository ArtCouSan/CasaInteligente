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

  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'predicao', 'acoes'];
  dataSource = new MatTableDataSource<AnaliseColaborador>();
  colaboradorParaAnalisar: AnaliseColaborador | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carregarAnalises(): void {
    this.analiseColaboradorService.getAnalisesColaboradores().subscribe(
      (analises: AnaliseColaborador[]) => {
        this.dataSource.data = analises;
      },
      error => {
        this.snackBar.open('Erro ao carregar análises de colaboradores.', 'Fechar', {
          duration: 3000
        });
      }
    );
  }

  filtrar(event: Event) {
    const filtroValor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValor.trim().toLowerCase();
  }

  analisarColaborador(analise: AnaliseColaborador) {
    this.colaboradorParaAnalisar = analise;
  }

  voltar() {
    this.colaboradorParaAnalisar = null;
  }

  getColor(predicao: number): string {
    if (predicao >= 75) return 'red';
    if (predicao >= 50) return 'orange';
    return 'green';
  }
}
