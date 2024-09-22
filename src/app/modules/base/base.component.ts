import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHouse, faDatabase, faUser, faChartPie, faPercent, faGaugeHigh, faCloud, faListCheck, faClipboardQuestion, faRightFromBracket, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { AnaliseColaboradorComponent } from './components/analise-colaborador/analise-colaborador.component';
import { PesquisaClimaComponent } from './components/pesquisa-clima/pesquisa-clima.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { AuthService } from '../../auth/auth.service';
import { Perfil } from '../../core/dto/colaborador';
import { QuestionarioComponent } from './components/questionario/questionario.component';
import { PesquisaAnonimaComponent } from './components/pesquisa-anonima/pesquisa-anonima.component';
import { TermometroComponent } from './components/termometro/termometro.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy, OnInit {

  conteudoDinamico: ComponentType<any> | null;
  componentHome = HomeComponent;
  componentDashboard = DashboadComponent;
  componentColaborador = ColaboradorComponent;
  componentAnalisarColaborador = AnaliseColaboradorComponent;
  componentPesquisaClima = PesquisaClimaComponent;
  componentPesquisaAnonima = PesquisaAnonimaComponent;
  componentPerguntas = PesquisaComponent;
  componentQuestionario = QuestionarioComponent;
  componentTermometro = TermometroComponent;

  mobileQuery: MediaQueryList;
  selectedItem: string = "";
  isLoginVisible: boolean = true;
  perfis: Perfil[] = [];
  usuario = this.authService.getCurrentUser();
  isLoadingTela = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    library: FaIconLibrary,
    private authService: AuthService) {

    this.conteudoDinamico = null;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    library.addIcons(faHouse, faDatabase, faUser, faChartPie, faPercent, faGaugeHigh, faCloud, faListCheck, faClipboardQuestion, faRightFromBracket, faTemperatureHigh);
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.perfis = this.authService.getPerfis();
      this.isLoginVisible = false;

      // Verifica o último componente salvo no localStorage
      const lastComponent = localStorage.getItem('lastComponent');

      if (lastComponent) {
        this.restoreComponent(lastComponent);
      } else {
        this.mostrarComponente(this.componentHome, 'home');
      }

    } else {
      this.perfis = [];
      this.isLoginVisible = true;
      this.usuario = {
        nome: '',
        cpf: '',
        idade: 0,
        genero: { id: 0, descricao: '' },
        estadoCivil: { id: 0, descricao: '' },
        telefone: '',
        email: '',
        formacao: { id: 0, descricao: '' },
        faculdade: { id: 0, nome: '' },
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        departamento: { id: 0, nome: '' },
        setor: { id: 0, nome: '' },
        faixaSalarial: { id: 0, descricao: '' },
        cargo: { id: 0, nome: '' },
        gerente: undefined,
        tempoTrabalho: '',
        quantidadeEmpresasTrabalhou: 0,
        quantidadeAnosTrabalhadosAnteriormente: 0,
        nivelEscolaridade: { id: 0, descricao: '' },
        exFuncionario: false,
        acoes: 'Adicionar',
        perfis: []
      };
    }
  }

  // Função para exibir componentes dinamicamente e salvar no localStorage
  mostrarComponente(componente: ComponentType<any>, item: string) {
    this.selectedItem = item;
    this.conteudoDinamico = componente;

    // Salva o identificador do componente no localStorage
    localStorage.setItem('lastComponent', item);
  }

  // Função para restaurar o componente salvo no localStorage
  restoreComponent(componentName: string): void {
    switch (componentName) {
      case 'home':
        this.mostrarComponente(this.componentHome, 'home');
        break;
      case 'dashboard':
        this.mostrarComponente(this.componentDashboard, 'dashboard');
        break;
      case 'colaborador':
        this.mostrarComponente(this.componentColaborador, 'colaborador');
        break;
      case 'percent':
        this.mostrarComponente(this.componentAnalisarColaborador, 'percent');
        break;
      case 'pesquisaClima':
        this.mostrarComponente(this.componentPesquisaClima, 'pesquisaClima');
        break;
      case 'pesquisaAnonima':
        this.mostrarComponente(this.componentPesquisaAnonima, 'pesquisaAnonima');
        break;
      case 'perguntas':
        this.mostrarComponente(this.componentPerguntas, 'perguntas');
        break;
      case 'questionario':
        this.mostrarComponente(this.componentQuestionario, 'questionario');
        break;
      case 'termometro':
        this.mostrarComponente(this.componentTermometro, 'termometro');
        break;
      default:
        this.mostrarComponente(this.componentHome, 'home');
        break;
    }
  }

  // Função para ocultar o modal de login
  onLoginSuccess() {
    this.perfis = this.authService.getPerfis();
    this.usuario = this.authService.getCurrentUser();
    this.isLoginVisible = false;
    this.mostrarComponente(this.componentHome, 'home');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(): void {
    this.authService.logout();
    window.location.reload();
  }

  hasPerfil(nomePerfil: string): boolean {
    return this.perfis.some(perfil => perfil.nome === nomePerfil);
  }
}
