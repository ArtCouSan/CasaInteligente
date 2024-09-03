import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHouse, faDatabase, faUser, faChartPie, faPercent, faGaugeHigh, faCloud, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { AnaliseColaboradorComponent } from './components/analise-colaborador/analise-colaborador.component';
import { PesquisaClimaComponent } from './components/pesquisa-clima/pesquisa-clima.component';
import { PesquisaComponent } from './components/pesquisa/pesquisa.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent implements OnDestroy {

  conteudoDinamico: ComponentType<any> | null;
  componentHome = HomeComponent;
  componentDashboard = DashboadComponent;
  componentColaborador = ColaboradorComponent;
  componentAnalisarColaborador = AnaliseColaboradorComponent;
  componentPesquisaClima = PesquisaClimaComponent;
  componentPerguntas = PesquisaComponent;

  mobileQuery: MediaQueryList;
  selectedItem: string = "";

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    library: FaIconLibrary) {
    this.conteudoDinamico = null;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    library.addIcons(faHouse);
    library.addIcons(faDatabase);
    library.addIcons(faUser);
    library.addIcons(faChartPie);
    library.addIcons(faPercent);
    library.addIcons(faGaugeHigh);
    library.addIcons(faCloud);
    library.addIcons(faListCheck);
  }

  mostrarComponente(componente: ComponentType<any>, item: string) {
    this.selectedItem = item;
    this.conteudoDinamico = componente;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}