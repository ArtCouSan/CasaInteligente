import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { ColaboradorEditComponent } from './modals/colaborador-edit/colaborador-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmarDelecaoComponent } from './modals/confirmar-delecao/confirmar-delecao.component';
import { DetalheAnaliseColaboradorComponent } from './modals/detalhe-analise-colaborador/detalhe-analise-colaborador.component';
import { BaseChartDirective } from 'ng2-charts';
import { G1Component } from './graficos/g1/g1.component';
import { G2Component } from './graficos/g2/g2.component';
import { G3Component } from './graficos/g3/g3.component';
import { G4Component } from './graficos/g4/g4.component';
import { G5Component } from './graficos/g5/g5.component';
import { G6Component } from './graficos/g6/g6.component';
import { G7Component } from './graficos/g7/g7.component';
import { G8Component } from './graficos/g8/g8.component';
import { G9Component } from './graficos/g9/g9.component';
import { G10Component } from './graficos/g10/g10.component';
import { G11Component } from './graficos/g11/g11.component';
import { G12Component } from './graficos/g12/g12.component';
import { ChatComponent } from './chat/chat.component';
import { QuestionarioEditComponent } from './modals/questionario-edit/questionario-edit.component';

@NgModule({
    declarations: [
        QuestionarioEditComponent,
        EmConstrucaoComponent,
        ColaboradorEditComponent,
        ConfirmarDelecaoComponent,
        DetalheAnaliseColaboradorComponent,
        G1Component,
        G2Component,
        G3Component,
        G4Component,
        G5Component,
        G6Component,
        G7Component,
        G8Component,
        G9Component,
        G10Component,
        G11Component,
        G12Component,
        ChatComponent
    ],
    exports: [
        MaterialModule,
        QuestionarioEditComponent,
        EmConstrucaoComponent,
        ColaboradorEditComponent,
        ConfirmarDelecaoComponent,
        DetalheAnaliseColaboradorComponent,
        G1Component,
        G2Component,
        G3Component,
        G4Component,
        G5Component,
        G6Component,
        G7Component,
        G8Component,
        G9Component,
        G10Component,
        G11Component,
        G12Component,
        ChatComponent
    ], imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        BaseChartDirective,
        MaterialModule],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class SharedModule { }
