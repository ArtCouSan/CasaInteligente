import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { AnaliseColaborador } from '../../../../core/dto/analise-colaborador';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faAngleLeft, faRotate, faStar as fasStar, faPaperPlane, faFaceLaughWink, faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Cargo, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../../core/dto/colaborador';
import { SelecoesService } from '../../../../service/selecoes.service';
import { AnaliseColaboradorService } from '../../../../service/analise-colaborador.service';
import { PesquisaService } from '../../../../service/pesquisa.service';

type Trimestre = 'Q1' | 'Q2' | 'Q3' | 'Q4';

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

  trimestres: Trimestre[] = ['Q1', 'Q2', 'Q3', 'Q4'];

  trimestreDescricoes: Record<Trimestre, string> = {
    'Q1': 'Janeiro-Março',
    'Q2': 'Abril-Junho',
    'Q3': 'Julho-Setembro',
    'Q4': 'Outubro-Dezembro'
  };

  respostasPesquisas: { [trimestre: string]: { [ano: number]: any[] } } = {
    'Q1': {},
    'Q2': {},
    'Q3': {},
    'Q4': {}
  };
  anosDisponiveis: number[] = [];

  constructor(
    library: FaIconLibrary,
    private listasService: SelecoesService,
    private analiseColaboradorService: AnaliseColaboradorService,
    private pesquisaClimaService: PesquisaService
  ) {
    library.addIcons(faCheck, faRotate, faAngleLeft, farStar, fasStar, faPaperPlane, faFaceSadCry, faFaceLaughWink);
  }

  ngOnInit(): void {
    this.carregarListas();
    this.anosDisponiveis = [2024, 2025];

    if (this.analiseColaborador?.colaborador?.id) {
      this.carregarRespostasParaTodosOsTrimestres(this.analiseColaborador.colaborador.id);
    }
  }

  carregarRespostasParaTodosOsTrimestres(colaboradorId: number): void {
    this.anosDisponiveis.forEach(ano => {
      this.trimestres.forEach(trimestre => {
        this.carregarRespostas(colaboradorId, trimestre, ano);
      });
    });
  }

  carregarRespostas(colaboradorId: number, trimestre: Trimestre, ano: number): void {
    this.pesquisaClimaService.getRespostas(colaboradorId, ano).subscribe(
      (respostas: any[]) => {
        console.log(`Respostas recebidas para ${trimestre} ${ano}:`, respostas);

        // Filtro para garantir que somente respostas do trimestre e ano corretos sejam incluídas
        const respostasFiltradas = respostas.filter(resposta =>
          resposta.trimestre === trimestre && resposta.ano === ano
        );

        if (respostasFiltradas && respostasFiltradas.length > 0) {
          if (!this.respostasPesquisas[trimestre]) {
            this.respostasPesquisas[trimestre] = {};
          }
          this.respostasPesquisas[trimestre][ano] = respostasFiltradas;
          console.log(`Respostas armazenadas para ${trimestre} ${ano}:`, this.respostasPesquisas[trimestre][ano]);
        } else {
          if (this.respostasPesquisas[trimestre]) {
            delete this.respostasPesquisas[trimestre][ano];
            console.log(`Sem respostas para ${trimestre} ${ano}. Dados removidos.`);
          }
        }
      },
      error => {
        console.error(`Erro ao carregar as respostas para ${trimestre} ${ano}:`, error);
      }
    );
  }



  hasRespostas(trimestre: Trimestre, ano: number): boolean {
    return this.respostasPesquisas[trimestre] && this.respostasPesquisas[trimestre][ano] && this.respostasPesquisas[trimestre][ano].length > 0;
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

  getColor(evasao: string | undefined): string {
    if (evasao === undefined) {
      return 'white';
    }

    if (evasao == "Não") {
      return 'green';
    } else {
      return 'red';
    }
  }

  gerarNovoMotivo(): void {
    if (this.analiseColaborador.colaborador.id) {
      this.analiseColaboradorService.gerarNovoMotivo(this.analiseColaborador.colaborador.id).subscribe(
        response => {
          console.log('Novo motivo gerado:', response.novo_motivo);
          this.analiseColaborador.motivo = response.novo_motivo;
        },
        error => {
          console.error('Erro ao gerar novo motivo:', error);
        }
      );
    }
  }

  gerarNovaSugestao(): void {
    if (this.analiseColaborador.colaborador.id) {
      this.analiseColaboradorService.gerarNovaSugestao(this.analiseColaborador.colaborador.id).subscribe(
        response => {
          console.log('Nova sugestao gerado:', response.novo_motivo);
          this.analiseColaborador.sugestao = response.nova_sugestao;
        },
        error => {
          console.error('Erro ao gerar nova sugestao:', error);
        }
      );
    }
  }
}
