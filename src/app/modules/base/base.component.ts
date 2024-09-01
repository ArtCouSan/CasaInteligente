import { MediaMatcher } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboadComponent } from './components/dashboad/dashboad.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faHouse, faDatabase, faUser, faChartPie, faPercent, faGaugeHigh, faCloud } from '@fortawesome/free-solid-svg-icons';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { AnaliseColaboradorComponent } from './components/analise-colaborador/analise-colaborador.component';
import { PesquisaClimaComponent } from './components/pesquisa-clima/pesquisa-clima.component';

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
  }

  mostrarComponente(componente: ComponentType<any>, item: string) {
    this.selectedItem = item;
    this.conteudoDinamico = componente;
  }

  recarregarComponenteAtual() {
    if (this.conteudoDinamico) {
      const currentComponent = this.conteudoDinamico;
      this.conteudoDinamico = null; // Remove o componente atual
      setTimeout(() => this.conteudoDinamico = currentComponent, 0); // Recarrega o mesmo componente
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
