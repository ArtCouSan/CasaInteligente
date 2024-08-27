import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { AnaliseColaborador } from '../../../../core/dto/analise-colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Cargo, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../../core/dto/colaborador';
import { SelecoesService } from '../../../../service/selecoes.service';

@Component({
  selector: 'app-detalhe-analise-colaborador',
  templateUrl: './detalhe-analise-colaborador.component.html',
  styleUrl: './detalhe-analise-colaborador.component.scss'
})
export class DetalheAnaliseColaboradorComponent implements OnInit {

  @Input()
  analiseColaborador!: AnaliseColaborador;
  @Output() salvar = new EventEmitter<AnaliseColaborador>();
  @Output() voltar = new EventEmitter<void>();

  readonly panelDadosPessoais = signal(false);
  readonly panelContato = signal(false);
  readonly panelEndereco = signal(false);
  readonly panelFormacao = signal(false);
  readonly panelCargo = signal(false);
  readonly panelCarreira = signal(false);

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

  getColor(predicao: number | undefined): string {
    if (predicao === undefined) {
      return 'white';
    }

    if (predicao <= 30) {
      return 'green';
    } else if (predicao >= 31 && predicao <= 50) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
