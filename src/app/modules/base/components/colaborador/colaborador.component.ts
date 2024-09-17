import { Component, ViewChild, OnInit, ElementRef, Input, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faUserPlus, faBan, faCheck, faFileArrowUp, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Colaborador } from '../../../../core/dto/colaborador';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../../shared/modals/confirmar-delecao/confirmar-delecao.component';
import { ColaboradorService } from '../../../../service/colaborador.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.scss']
})
export class ColaboradorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'exFuncionario', 'acoes'];
  dataSource = new MatTableDataSource<Colaborador>();
  colaboradorParaEditar: Colaborador | null = null;
  isLoadingTabela = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      faixaSalarial: { id: 1, descricao: '' },
      cargo: { id: 1, nome: '' },
      gerente: '',
      tempoTrabalho: '',
      quantidadeEmpresasTrabalhou: 0,
      quantidadeAnosTrabalhadosAnteriormente: 0,
      nivelEscolaridade: { id: 1, descricao: '' },
      exFuncionario: false,
      acoes: 'Adicionar',
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

  carregarColaboradores(): void {
    this.isLoadingTabela = true;
    this.colaboradorService.getColaboradores()
      .subscribe(
        (colaboradores: Colaborador[]) => {
          this.dataSource.data = colaboradores;
          setTimeout(() => {
            this.isLoadingTabela = false;
          }, 1000);
        },
        error => {
          this.snackBar.open('Erro ao carregar colaboradores.', 'Fechar', { duration: 2000 })
          this.isLoadingTabela = false;
        }
      );
  }

  resetar(): void {
    this.colaboradorParaEditar = null;
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
    if (file) {
      this.colaboradorService.uploadColaboradoresCsv(file).subscribe({
        next: (response) => {
          this.carregarColaboradores();
          this.snackBar.open('Upload realizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        error: (err) => {
          this.snackBar.open(`${err.error.error}`, 'Fechar', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    }
  }

}
