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
    nome: 'Arthur Coutinho',
    cpf: "433.966.222-98",
    idade: 35,
    genero: "Masculino",
    estadoCivil: "Casado",
    telefone: "11 98765-4321",
    email: "arthur.coutinho@empresa.com",
    formacao: "Engenharia de Software",
    faculdade: "USP",
    endereco: "Rua A",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01000-000",
    departamento: "TI",
    setor: "Desenvolvimento",
    faixaSalarial: "R$ 8.501 - R$ 9.000",
    cargo: "Desenvolvedor Sênior",
    gerente: "Carlos Silva",
    tempoTrabalho: "5 anos",
    quantidadeEmpresasTrabalhou: 3,
    quantidadeAnosTrabalhadosAnteriormente: 8,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Beatriz Souza',
    cpf: "212.345.678-90",
    idade: 28,
    genero: "Feminino",
    estadoCivil: "Solteira",
    telefone: "11 91234-5678",
    email: "beatriz.souza@empresa.com",
    formacao: "Psicologia",
    faculdade: "PUC-SP",
    endereco: "Rua B",
    numero: "456",
    complemento: "",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01300-000",
    departamento: "RH",
    setor: "Recrutamento",
    faixaSalarial: "R$ 5.001 - R$ 5.500",
    cargo: "Analista de RH",
    gerente: "Mariana Andrade",
    tempoTrabalho: "3 anos",
    quantidadeEmpresasTrabalhou: 2,
    quantidadeAnosTrabalhadosAnteriormente: 5,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: true
  },
  {
    nome: 'Carlos Almeida',
    cpf: "567.890.123-45",
    idade: 40,
    genero: "Masculino",
    estadoCivil: "Casado",
    telefone: "11 93456-7890",
    email: "carlos.almeida@empresa.com",
    formacao: "Contabilidade",
    faculdade: "Mackenzie",
    endereco: "Rua C",
    numero: "789",
    complemento: "Bloco B",
    bairro: "Vila Mariana",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04100-000",
    departamento: "Financeiro",
    setor: "Contabilidade",
    faixaSalarial: "R$ 11.001 - R$ 11.500",
    cargo: "Contador",
    gerente: "Fernanda Braga",
    tempoTrabalho: "7 anos",
    quantidadeEmpresasTrabalhou: 4,
    quantidadeAnosTrabalhadosAnteriormente: 10,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Daniela Lima',
    cpf: "789.012.345-67",
    idade: 32,
    genero: "Feminino",
    estadoCivil: "Divorciada",
    telefone: "11 94321-0987",
    email: "daniela.lima@empresa.com",
    formacao: "Publicidade e Propaganda",
    faculdade: "ESPM",
    endereco: "Rua D",
    numero: "101",
    complemento: "Sala 5",
    bairro: "Jardins",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01400-000",
    departamento: "Marketing",
    setor: "Publicidade",
    faixaSalarial: "R$ 7.001 - R$ 7.500",
    cargo: "Coordenadora de Marketing",
    gerente: "Patrícia Campos",
    tempoTrabalho: "4 anos",
    quantidadeEmpresasTrabalhou: 2,
    quantidadeAnosTrabalhadosAnteriormente: 6,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Eduardo Silva',
    cpf: "890.123.456-78",
    idade: 37,
    genero: "Masculino",
    estadoCivil: "Solteiro",
    telefone: "11 95555-1234",
    email: "eduardo.silva@empresa.com",
    formacao: "Sistemas de Informação",
    faculdade: "FAAP",
    endereco: "Rua E",
    numero: "202",
    complemento: "",
    bairro: "Pinheiros",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05400-000",
    departamento: "TI",
    setor: "Infraestrutura",
    faixaSalarial: "R$ 9.001 - R$ 9.500",
    cargo: "Administrador de Redes",
    gerente: "Ricardo Almeida",
    tempoTrabalho: "6 anos",
    quantidadeEmpresasTrabalhou: 3,
    quantidadeAnosTrabalhadosAnteriormente: 7,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Fernanda Costa',
    cpf: "901.234.567-89",
    idade: 29,
    genero: "Feminino",
    estadoCivil: "Casada",
    telefone: "11 96666-7890",
    email: "fernanda.costa@empresa.com",
    formacao: "Administração",
    faculdade: "FGV",
    endereco: "Rua F",
    numero: "303",
    complemento: "Apto 12",
    bairro: "Moema",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04500-000",
    departamento: "Vendas",
    setor: "Comercial",
    faixaSalarial: "R$ 7.501 - R$ 8.000",
    cargo: "Vendedora",
    gerente: "Ana Paula Nunes",
    tempoTrabalho: "2 anos",
    quantidadeEmpresasTrabalhou: 2,
    quantidadeAnosTrabalhadosAnteriormente: 3,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Gabriel Moreira',
    cpf: "234.567.890-12",
    idade: 33,
    genero: "Masculino",
    estadoCivil: "Solteiro",
    telefone: "11 97777-0123",
    email: "gabriel.moreira@empresa.com",
    formacao: "Logística",
    faculdade: "Unip",
    endereco: "Rua G",
    numero: "404",
    complemento: "",
    bairro: "Santana",
    cidade: "São Paulo",
    estado: "SP",
    cep: "02000-000",
    departamento: "Logística",
    setor: "Operações",
    faixaSalarial: "R$ 4.501 - R$ 5.000",
    cargo: "Supervisor de Logística",
    gerente: "Júlio César",
    tempoTrabalho: "5 anos",
    quantidadeEmpresasTrabalhou: 3,
    quantidadeAnosTrabalhadosAnteriormente: 4,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Helena Ferreira',
    cpf: "345.678.901-23",
    idade: 25,
    genero: "Feminino",
    estadoCivil: "Solteira",
    telefone: "11 98888-3456",
    email: "helena.ferreira@empresa.com",
    formacao: "Tecnologia da Informação",
    faculdade: "Senac",
    endereco: "Rua H",
    numero: "505",
    complemento: "",
    bairro: "Vila Olímpia",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04547-000",
    departamento: "TI",
    setor: "Desenvolvimento",
    faixaSalarial: "R$ 9.501 - R$ 10.000",
    cargo: "Desenvolvedora Júnior",
    gerente: "Roberto Oliveira",
    tempoTrabalho: "1 ano",
    quantidadeEmpresasTrabalhou: 1,
    quantidadeAnosTrabalhadosAnteriormente: 1,
    nivelEscolaridade: "Ensino Superior - Incompleto",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Isabela Martins',
    cpf: "456.789.012-34",
    idade: 45,
    genero: "Feminino",
    estadoCivil: "Casada",
    telefone: "11 99999-5678",
    email: "isabela.martins@empresa.com",
    formacao: "Direito",
    faculdade: "Mackenzie",
    endereco: "Rua I",
    numero: "606",
    complemento: "Conj 8",
    bairro: "Brooklin",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04600-000",
    departamento: "Jurídico",
    setor: "Consultoria",
    faixaSalarial: "R$ 12.001 - R$ 12.500",
    cargo: "Advogada",
    gerente: "Sérgio Fonseca",
    tempoTrabalho: "10 anos",
    quantidadeEmpresasTrabalhou: 5,
    quantidadeAnosTrabalhadosAnteriormente: 15,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'João Pereira',
    cpf: "567.890.123-45",
    idade: 30,
    genero: "Masculino",
    estadoCivil: "Casado",
    telefone: "11 90000-1234",
    email: "joao.pereira@empresa.com",
    formacao: "Recursos Humanos",
    faculdade: "Unesp",
    endereco: "Rua J",
    numero: "707",
    complemento: "",
    bairro: "Vila Prudente",
    cidade: "São Paulo",
    estado: "SP",
    cep: "03100-000",
    departamento: "RH",
    setor: "Treinamento",
    faixaSalarial: "R$ 6.501 - R$ 7.000",
    cargo: "Instrutor de RH",
    gerente: "Camila Santos",
    tempoTrabalho: "3 anos",
    quantidadeEmpresasTrabalhou: 2,
    quantidadeAnosTrabalhadosAnteriormente: 4,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Larissa Mendes',
    cpf: "678.901.234-56",
    idade: 27,
    genero: "Feminino",
    estadoCivil: "Solteira",
    telefone: "11 91111-2345",
    email: "larissa.mendes@empresa.com",
    formacao: "Engenharia de Software",
    faculdade: "FIAP",
    endereco: "Rua K",
    numero: "808",
    complemento: "",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04530-000",
    departamento: "TI",
    setor: "Desenvolvimento",
    faixaSalarial: "R$ 9.501 - R$ 10.000",
    cargo: "Desenvolvedora Pleno",
    gerente: "Fernando Rocha",
    tempoTrabalho: "4 anos",
    quantidadeEmpresasTrabalhou: 3,
    quantidadeAnosTrabalhadosAnteriormente: 6,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Marcos Oliveira',
    cpf: "789.012.345-67",
    idade: 42,
    genero: "Masculino",
    estadoCivil: "Divorciado",
    telefone: "11 92222-3456",
    email: "marcos.oliveira@empresa.com",
    formacao: "Economia",
    faculdade: "FEA-USP",
    endereco: "Rua L",
    numero: "909",
    complemento: "",
    bairro: "Vila Madalena",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05430-000",
    departamento: "Financeiro",
    setor: "Tesouraria",
    faixaSalarial: "R$ 11.001 - R$ 11.500",
    cargo: "Tesoureiro",
    gerente: "Patrícia Lima",
    tempoTrabalho: "8 anos",
    quantidadeEmpresasTrabalhou: 4,
    quantidadeAnosTrabalhadosAnteriormente: 12,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Natalia Ribeiro',
    cpf: "890.123.456-78",
    idade: 31,
    genero: "Feminino",
    estadoCivil: "Casada",
    telefone: "11 93333-4567",
    email: "natalia.ribeiro@empresa.com",
    formacao: "Marketing",
    faculdade: "Anhembi Morumbi",
    endereco: "Rua M",
    numero: "1010",
    complemento: "",
    bairro: "Perdizes",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05030-000",
    departamento: "Marketing",
    setor: "Branding",
    faixaSalarial: "R$ 7.501 - R$ 8.000",
    cargo: "Gerente de Marca",
    gerente: "Carlos Almeida",
    tempoTrabalho: "6 anos",
    quantidadeEmpresasTrabalhou: 3,
    quantidadeAnosTrabalhadosAnteriormente: 8,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Otávio Fonseca',
    cpf: "901.234.567-89",
    idade: 34,
    genero: "Masculino",
    estadoCivil: "Solteiro",
    telefone: "11 94444-5678",
    email: "otavio.fonseca@empresa.com",
    formacao: "Administração",
    faculdade: "SENAC",
    endereco: "Rua N",
    numero: "1111",
    complemento: "Sala 9",
    bairro: "Butantã",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05530-000",
    departamento: "Vendas",
    setor: "Relacionamento",
    faixaSalarial: "R$ 6.001 - R$ 6.500",
    cargo: "Executivo de Contas",
    gerente: "Adriana Freitas",
    tempoTrabalho: "4 anos",
    quantidadeEmpresasTrabalhou: 2,
    quantidadeAnosTrabalhadosAnteriormente: 5,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
  },
  {
    nome: 'Paula Gomes',
    cpf: "234.567.890-12",
    idade: 30,
    genero: "Feminino",
    estadoCivil: "Solteira",
    telefone: "11 95555-6789",
    email: "paula.gomes@empresa.com",
    formacao: "Logística",
    faculdade: "Metodista",
    endereco: "Rua O",
    numero: "1212",
    complemento: "",
    bairro: "Lapa",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05050-000",
    departamento: "Logística",
    setor: "Distribuição",
    faixaSalarial: "R$ 5.501 - R$ 6.000",
    cargo: "Analista de Logística",
    gerente: "Jorge Santos",
    tempoTrabalho: "2 anos",
    quantidadeEmpresasTrabalhou: 2,
    quantidadeAnosTrabalhadosAnteriormente: 3,
    nivelEscolaridade: "Ensino Superior - Completo",
    acoes: "Editar",
    exFuncionario: false
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
      departamento: '',
      telefone: '',
      email: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      setor: '',
      faixaSalarial: '',
      cargo: '',
      gerente: '',
      faculdade: '',
      tempoTrabalho: '',
      estadoCivil: '',
      formacao: '',
      genero: '',
      idade: 0,
      quantidadeAnosTrabalhadosAnteriormente: 0,
      quantidadeEmpresasTrabalhou: 0,
      nivelEscolaridade: '',
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
