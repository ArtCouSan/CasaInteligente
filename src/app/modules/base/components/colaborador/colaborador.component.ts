import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Colaborador } from '../../../core/dto/colaborador';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../../shared/modals/confirmar-delecao/confirmar-delecao.component';


const ELEMENT_DATA: Colaborador[] = [
  {
    cpf: "433.966.222-98",
    nome: 'Arthur Coutinho',
    departamento: "TI",
    telefone: "11 98765-4321",
    email: "arthur.coutinho@empresa.com",
    endereco: "Rua A",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "RS",
    cep: "01000-000",
    setor: "Desenvolvimento",
    faixaSalarial: "R$ 8.501 - R$ 9.000",
    cargo: "Desenvolvedor Sênior",
    gerente: "Carlos Silva",
    faculdade: "USP",
    tempoTrabalho: "5 anos",
    acoes: "Editar"
  },
  {
    cpf: "212.345.678-90",
    nome: 'Beatriz Souza',
    departamento: "RH",
    telefone: "11 91234-5678",
    email: "beatriz.souza@empresa.com",
    endereco: "Rua B",
    numero: "456",
    complemento: "",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01300-000",
    setor: "Recrutamento",
    faixaSalarial: "R$ 5.001 - R$ 5.500",
    cargo: "Analista de RH",
    gerente: "Mariana Andrade",
    faculdade: "PUC-SP",
    tempoTrabalho: "3 anos",
    acoes: "Editar"
  },
  {
    cpf: "567.890.123-45",
    nome: 'Carlos Almeida',
    departamento: "Financeiro",
    telefone: "11 93456-7890",
    email: "carlos.almeida@empresa.com",
    endereco: "Rua C",
    numero: "789",
    complemento: "Bloco B",
    bairro: "Vila Mariana",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04100-000",
    setor: "Contabilidade",
    faixaSalarial: "R$ 11.001 - R$ 11.500",
    cargo: "Contador",
    gerente: "Fernanda Braga",
    faculdade: "Mackenzie",
    tempoTrabalho: "7 anos",
    acoes: "Editar"
  },
  {
    cpf: "789.012.345-67",
    nome: 'Daniela Lima',
    departamento: "Marketing",
    telefone: "11 94321-0987",
    email: "daniela.lima@empresa.com",
    endereco: "Rua D",
    numero: "101",
    complemento: "Sala 5",
    bairro: "Jardins",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01400-000",
    setor: "Publicidade",
    faixaSalarial: "R$ 7.001 - R$ 7.500",
    cargo: "Coordenadora de Marketing",
    gerente: "Patrícia Campos",
    faculdade: "ESPM",
    tempoTrabalho: "4 anos",
    acoes: "Editar"
  },
  {
    cpf: "890.123.456-78",
    nome: 'Eduardo Silva',
    departamento: "TI",
    telefone: "11 95555-1234",
    email: "eduardo.silva@empresa.com",
    endereco: "Rua E",
    numero: "202",
    complemento: "",
    bairro: "Pinheiros",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05400-000",
    setor: "Infraestrutura",
    faixaSalarial: "R$ 9.001 - R$ 9.500",
    cargo: "Administrador de Redes",
    gerente: "Ricardo Almeida",
    faculdade: "FAAP",
    tempoTrabalho: "6 anos",
    acoes: "Editar"
  },
  {
    cpf: "901.234.567-89",
    nome: 'Fernanda Costa',
    departamento: "Vendas",
    telefone: "11 96666-7890",
    email: "fernanda.costa@empresa.com",
    endereco: "Rua F",
    numero: "303",
    complemento: "Apto 12",
    bairro: "Moema",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04500-000",
    setor: "Comercial",
    faixaSalarial: "R$ 7.501 - R$ 8.000",
    cargo: "Vendedora",
    gerente: "Ana Paula Nunes",
    faculdade: "FGV",
    tempoTrabalho: "2 anos",
    acoes: "Editar"
  },
  {
    cpf: "234.567.890-12",
    nome: 'Gabriel Moreira',
    departamento: "Logística",
    telefone: "11 97777-0123",
    email: "gabriel.moreira@empresa.com",
    endereco: "Rua G",
    numero: "404",
    complemento: "",
    bairro: "Santana",
    cidade: "São Paulo",
    estado: "SP",
    cep: "02000-000",
    setor: "Operações",
    faixaSalarial: "R$ 4.501 - R$ 5.000",
    cargo: "Supervisor de Logística",
    gerente: "Júlio César",
    faculdade: "Unip",
    tempoTrabalho: "5 anos",
    acoes: "Editar"
  },
  {
    cpf: "345.678.901-23",
    nome: 'Helena Ferreira',
    departamento: "TI",
    telefone: "11 98888-3456",
    email: "helena.ferreira@empresa.com",
    endereco: "Rua H",
    numero: "505",
    complemento: "",
    bairro: "Vila Olímpia",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04547-000",
    setor: "Desenvolvimento",
    faixaSalarial: "R$ 9.501 - R$ 10.000",
    cargo: "Desenvolvedora Júnior",
    gerente: "Roberto Oliveira",
    faculdade: "Senac",
    tempoTrabalho: "1 ano",
    acoes: "Editar"
  },
  {
    cpf: "456.789.012-34",
    nome: 'Isabela Martins',
    departamento: "Jurídico",
    telefone: "11 99999-5678",
    email: "isabela.martins@empresa.com",
    endereco: "Rua I",
    numero: "606",
    complemento: "Conj 8",
    bairro: "Brooklin",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04600-000",
    setor: "Consultoria",
    faixaSalarial: "R$ 12.001 - R$ 12.500",
    cargo: "Advogada",
    gerente: "Sérgio Fonseca",
    faculdade: "Mackenzie",
    tempoTrabalho: "10 anos",
    acoes: "Editar"
  },
  {
    cpf: "567.890.123-45",
    nome: 'João Pereira',
    departamento: "RH",
    telefone: "11 90000-1234",
    email: "joao.pereira@empresa.com",
    endereco: "Rua J",
    numero: "707",
    complemento: "",
    bairro: "Vila Prudente",
    cidade: "São Paulo",
    estado: "SP",
    cep: "03100-000",
    setor: "Treinamento",
    faixaSalarial: "R$ 6.501 - R$ 7.000",
    cargo: "Instrutor de RH",
    gerente: "Camila Santos",
    faculdade: "Unesp",
    tempoTrabalho: "3 anos",
    acoes: "Editar"
  },
  {
    cpf: "678.901.234-56",
    nome: 'Larissa Mendes',
    departamento: "TI",
    telefone: "11 91111-2345",
    email: "larissa.mendes@empresa.com",
    endereco: "Rua K",
    numero: "808",
    complemento: "",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04530-000",
    setor: "Desenvolvimento",
    faixaSalarial: "R$ 9.501 - R$ 10.000",
    cargo: "Desenvolvedora Pleno",
    gerente: "Fernando Rocha",
    faculdade: "FIAP",
    tempoTrabalho: "4 anos",
    acoes: "Editar"
  },
  {
    cpf: "789.012.345-67",
    nome: 'Marcos Oliveira',
    departamento: "Financeiro",
    telefone: "11 92222-3456",
    email: "marcos.oliveira@empresa.com",
    endereco: "Rua L",
    numero: "909",
    complemento: "",
    bairro: "Vila Madalena",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05430-000",
    setor: "Tesouraria",
    faixaSalarial: "R$ 11.001 - R$ 11.500",
    cargo: "Tesoureiro",
    gerente: "Patrícia Lima",
    faculdade: "FEA-USP",
    tempoTrabalho: "8 anos",
    acoes: "Editar"
  },
  {
    cpf: "890.123.456-78",
    nome: 'Natalia Ribeiro',
    departamento: "Marketing",
    telefone: "11 93333-4567",
    email: "natalia.ribeiro@empresa.com",
    endereco: "Rua M",
    numero: "1010",
    complemento: "",
    bairro: "Perdizes",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05030-000",
    setor: "Branding",
    faixaSalarial: "R$ 7.501 - R$ 8.000",
    cargo: "Gerente de Marca",
    gerente: "Carlos Almeida",
    faculdade: "Anhembi Morumbi",
    tempoTrabalho: "6 anos",
    acoes: "Editar"
  },
  {
    cpf: "901.234.567-89",
    nome: 'Otávio Fonseca',
    departamento: "Vendas",
    telefone: "11 94444-5678",
    email: "otavio.fonseca@empresa.com",
    endereco: "Rua N",
    numero: "1111",
    complemento: "Sala 9",
    bairro: "Butantã",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05530-000",
    setor: "Relacionamento",
    faixaSalarial: "R$ 6.001 - R$ 6.500",
    cargo: "Executivo de Contas",
    gerente: "Adriana Freitas",
    faculdade: "SENAC",
    tempoTrabalho: "4 anos",
    acoes: "Editar"
  },
  {
    cpf: "234.567.890-12",
    nome: 'Paula Gomes',
    departamento: "Logística",
    telefone: "11 95555-6789",
    email: "paula.gomes@empresa.com",
    endereco: "Rua O",
    numero: "1212",
    complemento: "",
    bairro: "Lapa",
    cidade: "São Paulo",
    estado: "SP",
    cep: "05050-000",
    setor: "Distribuição",
    faixaSalarial: "R$ 5.501 - R$ 6.000",
    cargo: "Analista de Logística",
    gerente: "Jorge Santos",
    faculdade: "Metodista",
    tempoTrabalho: "2 anos",
    acoes: "Editar"
  }
];

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrl: './colaborador.component.scss'
})
export class ColaboradorComponent {
  displayedColumns: string[] = ['cpf', 'nome', 'departamento', 'acoes'];
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
