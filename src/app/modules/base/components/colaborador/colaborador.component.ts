import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faUserPlus, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Colaborador } from '../../../core/dto/colaborador';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../../shared/modals/confirmar-delecao/confirmar-delecao.component';

const ELEMENT_DATA: Colaborador[] = [
  {
    nome: 'João da Silva',
    cpf: '123.456.789-00',
    idade: 30,
    genero: { id: 1, descricao: 'Masculino' },
    estadoCivil: { id: 1, descricao: 'Solteiro' },
    telefone: '11 98765-4321',
    email: 'joao.silva@empresa.com',
    formacao: { id: 1, descricao: 'Ciência da Computação' },
    faculdade: { id: 1, nome: 'USP' },
    endereco: {
      id: 1,
      endereco: 'Rua A',
      numero: '100',
      complemento: 'Apto 101',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01000-000'
    },
    departamento: { id: 1, nome: 'TI' },
    setor: { id: 1, nome: 'Desenvolvimento' },
    faixaSalarial: { id: 1, descricao: 'R$ 6.000 - R$ 8.000' },
    cargo: { id: 1, nome: 'Desenvolvedor' },
    gerente: "Igor",
    tempoTrabalho: '5 anos',
    quantidadeEmpresasTrabalhou: 1,
    quantidadeAnosTrabalhadosAnteriormente: 3,
    nivelEscolaridade: { id: 2, descricao: 'Graduação' },
    exFuncionario: false,
    acoes: 'Editar'
  },
  {
    nome: 'Ana Maria',
    cpf: '321.654.987-00',
    idade: 28,
    genero: { id: 2, descricao: 'Feminino' },
    estadoCivil: { id: 1, descricao: 'Solteiro' },
    telefone: '21 91234-5678',
    email: 'ana.maria@empresa.com',
    formacao: { id: 3, descricao: 'Administração' },
    faculdade: { id: 3, nome: 'FGV' },
    endereco: {
      id: 3,
      endereco: 'Av. Atlântica',
      numero: '1500',
      complemento: 'Sala 20',
      bairro: 'Copacabana',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '22000-000'
    },
    departamento: { id: 2, nome: 'Financeiro' },
    setor: { id: 2, nome: 'Contabilidade' },
    faixaSalarial: { id: 3, descricao: 'R$ 4.000 - R$ 6.000' },
    cargo: { id: 3, nome: 'Analista Financeiro' },
    gerente: "Arthur",
    tempoTrabalho: '2 anos',
    quantidadeEmpresasTrabalhou: 1,
    quantidadeAnosTrabalhadosAnteriormente: 4,
    nivelEscolaridade: { id: 2, descricao: 'Graduação' },
    exFuncionario: false,
    acoes: 'Editar'
  }
];

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrl: './colaborador.component.scss'
})
export class ColaboradorComponent {
  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'exFuncionario', 'acoes'];
  dataSource = new MatTableDataSource<Colaborador>(ELEMENT_DATA);

  colaboradorParaEditar: Colaborador | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(library: FaIconLibrary,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar
  ) {
    library.addIcons(faPen);
    library.addIcons(faTrash);
    library.addIcons(faUserPlus);
    library.addIcons(faBan);
    library.addIcons(faCheck);
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
      genero: { id: 0, descricao: '' }, // Inicializar com um objeto vazio de Genero
      estadoCivil: { id: 0, descricao: '' }, // Inicializar com um objeto vazio de EstadoCivil
      telefone: '',
      email: '',
      formacao: { id: 0, descricao: '' }, // Inicializar com um objeto vazio de Formacao
      faculdade: { id: 0, nome: '' }, // Inicializar com um objeto vazio de Faculdade
      endereco: {
        id: 0,
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }, // Inicializar com um objeto vazio de Endereco
      departamento: { id: 0, nome: '' }, // Inicializar com um objeto vazio de Departamento
      setor: { id: 0, nome: '' }, // Inicializar com um objeto vazio de Setor
      faixaSalarial: { id: 0, descricao: '' }, // Inicializar com um objeto vazio de FaixaSalarial
      cargo: { id: 0, nome: '' }, // Inicializar com um objeto vazio de Cargo
      gerente: undefined, // Gerente pode ser undefined ou null, já que é opcional
      tempoTrabalho: '',
      quantidadeEmpresasTrabalhou: 0,
      quantidadeAnosTrabalhadosAnteriormente: 0,
      nivelEscolaridade: { id: 0, descricao: '' }, // Inicializar com um objeto vazio de NivelEscolaridade
      exFuncionario: false,
      acoes: 'Adicionar'
    };
  }

  editarColaborador(colaborador: Colaborador): void {
    this.colaboradorParaEditar = { ...colaborador };
  }

  salvarColaborador(colaborador: Colaborador): void {
    if (this.colaboradorParaEditar) {
      const index = this.dataSource.data.findIndex(c => c.cpf === colaborador.cpf);
      if (index >= 0) {
        this.dataSource.data[index] = colaborador;
      } else {
        this.dataSource.data.push(colaborador);
      }
      this.dataSource._updateChangeSubscription(); 
      this.colaboradorParaEditar = null;
      this.snackBar.open('Colaborador salvo com sucesso!', 'Fechar', {
        duration: 2000,
      });
    }
  }

  resetar(): void {
    this.colaboradorParaEditar = null;
  }

  voltar(): void {
    this.aplicarFiltro(' ');
    this.resetar();
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
    const index = this.dataSource.data.indexOf(colaborador);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);  // Remove o colaborador da lista
      this.dataSource = new MatTableDataSource<Colaborador>(this.dataSource.data);  // Atualiza o dataSource
      this.snackBar.open(`${colaborador.nome} foi excluído com sucesso.`, 'Fechar', {
        duration: 2000,
      });
    }
  }
}
