
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AnaliseColaborador }  from '../../../core/dto/analise-colaborador';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faPercent } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analise-colaborador',
  templateUrl: './analise-colaborador.component.html',
  styleUrls: ['./analise-colaborador.component.scss']
})
export class AnaliseColaboradorComponent implements OnInit {

  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'predicao', 'acoes'];
  dataSource = new MatTableDataSource<AnaliseColaborador>(ELEMENT_DATA);
  colaboradorParaAnalisar: AnaliseColaborador | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(library: FaIconLibrary,
    private dialog: MatDialog, 
    private snackBar: MatSnackBar
  ) {
    library.addIcons(faEye);
    library.addIcons(faPercent);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

// Dados de exemplo
const ELEMENT_DATA: AnaliseColaborador[] = [
  {
    colaborador: {
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
      gerente: "Carlos",
      tempoTrabalho: '5 anos',
      quantidadeEmpresasTrabalhou: 1,
      quantidadeAnosTrabalhadosAnteriormente: 3,
      nivelEscolaridade: { id: 2, descricao: 'Graduação' },
      exFuncionario: false,
      acoes: 'Analisar'
    },
    motivo: 'Alta probabilidade de saída devido à baixa satisfação no trabalho.',
    predicao: 85
  },
  {
    colaborador: {
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
      gerente: undefined, // Gerente não definido
      tempoTrabalho: '2 anos',
      quantidadeEmpresasTrabalhou: 1,
      quantidadeAnosTrabalhadosAnteriormente: 4,
      nivelEscolaridade: { id: 2, descricao: 'Graduação' },
      exFuncionario: false,
      acoes: 'Analisar'
    },
    motivo: 'Baixa probabilidade de saída, mas precisa de atenção devido à estagnação.',
    predicao: 40
  }
];