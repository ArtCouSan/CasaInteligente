import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { AnaliseColaborador } from '../../../../core/dto/analise-colaborador';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faAngleLeft, faRotate, faStar as fasStar, faPaperPlane, faFaceLaughWink, faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Cargo, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../../core/dto/colaborador';
import { SelecoesService } from '../../../../service/selecoes.service';
import { AnaliseColaboradorService } from '../../../../service/analise-colaborador.service';
import { PesquisaService } from '../../../../service/pesquisa.service';
import { Pergunta } from '../../../../core/dto/pergunta';

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
  perguntasMap: { [id: number]: Pergunta } = {};

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

  respostasPesquisas: { [ano: number]: { titulo: string, respostas: any[], descricao: string }[] } = {};

  anosDisponiveis: number[] = [];

  isLoadingMotivo: boolean = false;
  isLoadingSugestao: boolean = false;
  isLoadingTela: boolean = false;

  constructor(
    library: FaIconLibrary,
    private listasService: SelecoesService,
    private analiseColaboradorService: AnaliseColaboradorService,
    private pesquisaService: PesquisaService
  ) {
    library.addIcons(faCheck, faRotate, faAngleLeft, farStar, fasStar, faPaperPlane, faFaceSadCry, faFaceLaughWink);
  }

  ngOnInit(): void {
    this.isLoadingTela = true;
    if (this.analiseColaborador?.colaborador?.id) {
      this.carregarPerguntas();  // Carregar perguntas para mapear texto pelo ID
      this.carregarRespostasParaPesquisasFechadas(this.analiseColaborador.colaborador.id);
    }
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.isLoadingTela = false;
    }, 1500);
  }

  carregarPerguntas(): void {
    this.pesquisaService.getPerguntas().subscribe((perguntas: Pergunta[]) => {
      perguntas.forEach(pergunta => {
        this.perguntasMap[pergunta.id] = pergunta;
      });
    });
  }

  carregarRespostasParaPesquisasFechadas(colaboradorId: number): void {
    this.pesquisaService.getPesquisasFechadasComRespostas(colaboradorId).subscribe(
      (pesquisas: any[]) => {
        pesquisas.forEach(pesquisa => {
          const ano = pesquisa.ano;
          const titulo = pesquisa.titulo;
          const descricao = pesquisa.descricao;
          const respostas = pesquisa.respostas.map((resposta: any) => ({
            ...resposta,
            pergunta_texto: this.getPerguntaTexto(resposta.pergunta_id)
          }));

          if (!this.respostasPesquisas[ano]) {
            this.respostasPesquisas[ano] = [];
          }

          this.respostasPesquisas[ano].push({
            titulo: titulo,
            descricao: descricao,
            respostas: respostas
          });
        });
        this.anosDisponiveis = Object.keys(this.respostasPesquisas).map(Number);
      },
      error => {
        console.error('Erro ao carregar as pesquisas fechadas com respostas:', error);
      }
    );
  }

  // Função auxiliar para obter o texto da pergunta baseado no ID
  getPerguntaTexto(perguntaId: number): string {
    const pergunta = this.perguntasMap[perguntaId];
    return pergunta ? pergunta.texto : 'Pergunta desconhecida';
  }

  getRespostaEscolhida(perguntaId: number, nota: number): string {
    const pergunta = this.perguntasMap[perguntaId];
    if (pergunta && pergunta.opcoes_resposta) {
      const respostaEscolhida = pergunta.opcoes_resposta.find(opcao => opcao.nota === nota);
      return respostaEscolhida ? respostaEscolhida.texto : 'Resposta desconhecida';
    }
    return 'Resposta desconhecida';
  }

  getColor(evasao: string | undefined): string {
    if (evasao === 'Não') {
      return 'green';
    } else if (evasao === 'Sim') {
      return 'red';
    }
    return 'white';
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

  gerarNovoMotivo(): void {
    if (this.analiseColaborador.colaborador.id) {
      this.isLoadingMotivo = true;

      this.analiseColaboradorService.gerarNovoMotivo(this.analiseColaborador.colaborador.id).subscribe(
        response => {
          console.log('Novo motivo gerado:', response.novo_motivo);
          this.analiseColaborador.motivo = response.novo_motivo;
          this.isLoadingMotivo = false;
        },
        error => {
          console.error('Erro ao gerar novo motivo:', error);
          this.isLoadingMotivo = false;
        }
      );
    }
  }

  gerarNovaSugestao(): void {
    if (this.analiseColaborador.colaborador.id) {
      this.isLoadingSugestao = true;

      this.analiseColaboradorService.gerarNovaSugestao(this.analiseColaborador.colaborador.id).subscribe(
        response => {
          console.log('Nova sugestao gerado:', response.novo_motivo);
          this.analiseColaborador.sugestao = response.nova_sugestao;
          this.isLoadingSugestao = false;
        },
        error => {
          console.error('Erro ao gerar nova sugestao:', error);
          this.isLoadingSugestao = false;
        }
      );
    }
  }
}
