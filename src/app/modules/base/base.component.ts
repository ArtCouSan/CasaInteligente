import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHouse, faDatabase, faUser, faChartPie, faPercent, faGaugeHigh, faCloud, faListCheck, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { AnaliseColaboradorComponent } from './components/analise-colaborador/analise-colaborador.component';
import { PesquisaClimaComponent } from './components/pesquisa-clima/pesquisa-clima.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';
import { AuthService } from '../../auth/auth.service';
import { Perfil } from '../../core/dto/colaborador';
import { QuestionarioComponent } from './components/questionario/questionario.component';

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
  componentPerguntas = PesquisaComponent;
  componentQuestionario = QuestionarioComponent;

  mobileQuery: MediaQueryList;
  selectedItem: string = "";
  isLoginVisible: boolean = true;
  perfis: Perfil[] = [];
  usuario = this.authService.getCurrentUser();

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    library: FaIconLibrary,
    private authService: AuthService) {

    this.conteudoDinamico = null;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    library.addIcons(faHouse, faDatabase, faUser, faChartPie, faPercent, faGaugeHigh, faCloud, faListCheck, faClipboardQuestion);
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.perfis = this.authService.getPerfis();
      this.isLoginVisible = false;
      this.mostrarComponente(this.componentHome, 'home')
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

  // Função para exibir componentes dinamicamente
  mostrarComponente(componente: ComponentType<any>, item: string) {
    this.selectedItem = item;
    this.conteudoDinamico = componente;
  }

  // Função para ocultar o modal de login
  onLoginSuccess() {
    this.perfis = this.authService.getPerfis();
    this.usuario = this.authService.getCurrentUser();
    this.isLoginVisible = false; // Esconde o modal de login
    this.mostrarComponente(this.componentHome, 'home')
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout(): void {
  }

  hasPerfil(nomePerfil: string): boolean {
    return this.perfis.some(perfil => perfil.nome === nomePerfil);
  }
}
