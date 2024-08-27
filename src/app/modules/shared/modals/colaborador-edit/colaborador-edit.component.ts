import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { Cargo, Colaborador, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../../core/dto/colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SelecoesService } from '../../../../service/selecoes.service';

@Component({
  selector: 'app-colaborador-edit',
  templateUrl: './colaborador-edit.component.html',
  styleUrl: './colaborador-edit.component.scss'
})
export class ColaboradorEditComponent implements OnInit {

  @Input()
  colaborador!: Colaborador;
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
  faixasSalariais: FaixaSalarial[] = [];
  cargos: Cargo[] = [];

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
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
  }

  carregarListas(): void {
    this.listasService.listarGeneros().subscribe(data => this.generos = data);
    this.listasService.listarEstadosCivis().subscribe(data => this.estadosCivis = data);
    this.listasService.listarNiveisEscolaridade().subscribe(data => this.niveisEscolaridade = data);
    this.listasService.listarFaculdades().subscribe(data => this.faculdades = data);
    this.listasService.listarFormacoes().subscribe(data => this.formacoes = data);
    this.listasService.listarDepartamentos().subscribe(data => this.departamentos = data);
    this.listasService.listarSetores().subscribe(data => this.setores = data);
    this.listasService.listarFaixasSalariais().subscribe(data => this.faixasSalariais = data);
    this.listasService.listarCargos().subscribe(data => this.cargos = data);
  }

  onVoltar() {
    this.voltar.emit(); 
  }

  onSalvar(): void {
    this.salvar.emit(this.colaborador);
  }

}
