import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { Cargo, Colaborador, Departamento, EstadoCivil, Faculdade, Formacao, Genero, NivelEscolaridade, Setor, ViagemTrabalho } from '../../../../core/dto/colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SelecoesService } from '../../../../service/selecoes.service';

@Component({
  selector: 'app-colaborador-edit',
  templateUrl: './colaborador-edit.component.html',
  styleUrl: './colaborador-edit.component.scss'
})
export class ColaboradorEditComponent implements OnInit {

  @Input() colaborador!: Colaborador;
  @Output() salvar = new EventEmitter<Colaborador>();
  @Output() voltar = new EventEmitter<void>();

  readonly panelDadosPessoais = signal(true);
  readonly panelContato = signal(true);
  readonly panelEndereco = signal(true);
  readonly panelFormacao = signal(true);
  readonly panelCargo = signal(true);
  readonly panelCarreira = signal(true);

  generos: Genero[] = [];
  estadosCivis: EstadoCivil[] = [];
  niveisEscolaridade: NivelEscolaridade[] = [];
  faculdades: Faculdade[] = [];
  formacoes: Formacao[] = [];
  departamentos: Departamento[] = [];
  setores: Setor[] = [];
  cargos: Cargo[] = [];
  viagemTrabalho: ViagemTrabalho[] = [];

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  nivelesCargo = [
    { id: 1, descricao: 'Júnior/Assistente' },
    { id: 2, descricao: 'Analista/Especialista' },
    { id: 3, descricao: 'Supervisor/Gerente' },
    { id: 4, descricao: 'Gerente Senior/Diretor' },
    { id: 5, descricao: 'Executivo/Vice-Presidente' },
  ];

  constructor(
    library: FaIconLibrary,
    private listasService: SelecoesService
  ) {
    library.addIcons(faCheck);
    library.addIcons(faAngleLeft);
  }

  ngOnInit(): void {
    this.carregarListas();
    this.formatarSalario(); // Formatar o salário na inicialização
  }

  carregarListas(): void {
    this.listasService.listarGeneros().subscribe(data => this.generos = data);
    this.listasService.listarEstadosCivis().subscribe(data => this.estadosCivis = data);
    this.listasService.listarNiveisEscolaridade().subscribe(data => this.niveisEscolaridade = data);
    this.listasService.listarFaculdades().subscribe(data => this.faculdades = data);
    this.listasService.listarFormacoes().subscribe(data => this.formacoes = data);
    this.listasService.listarDepartamentos().subscribe(data => this.departamentos = data);
    this.listasService.listarSetores().subscribe(data => this.setores = data);
    this.listasService.listarCargos().subscribe(data => this.cargos = data);
    this.listasService.listarViagem().subscribe(data => this.viagemTrabalho = data);
  }

  onVoltar(): void {
    this.voltar.emit();
  }

  onSalvar(): void {
    this.salvar.emit(this.colaborador);
  }

  // Método para atualizar o valor do salário no model
  atualizarSalario(valor: string): void {
    // Remove todos os caracteres não numéricos e substitui a vírgula por um ponto
    const valorNumerico = parseFloat(valor.replace(/[^\d,.-]/g, '').replace(',', '.'));
    if (!isNaN(valorNumerico)) {
      this.colaborador.salario = valorNumerico;
    } else {
      this.colaborador.salario = 0;
    }
    this.formatarSalario();
  }

  // Método para formatar o salário como moeda BRL
  formatarSalario(): void {
    const salario = this.colaborador.salario;
    if (salario !== null && salario !== undefined) {
      this.colaborador.salario = salario;
    }
  }

}
