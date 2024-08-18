import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnaliseColaborador } from '../../../core/dto/analise-colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-detalhe-analise-colaborador',
  templateUrl: './detalhe-analise-colaborador.component.html',
  styleUrl: './detalhe-analise-colaborador.component.scss'
})
export class DetalheAnaliseColaboradorComponent {

  @Input()
  colaborador!: AnaliseColaborador;
  @Output() salvar = new EventEmitter<AnaliseColaborador>();
  @Output() voltar = new EventEmitter<void>();
  
  estadosCivis: string[] = [
    "Solteiro",
    "Casado",
    "Viuvo",
    "Divorciado",
    "Solteira",
    "Casada",
    "Viuva",
    "Divorciada"
  ]

  generos: string[] = [
    "Masculino",
    "Feminino",
    "Outros"
  ]

  niveisEscolaridade: string[] = [
    "Ensino Fundamental - Completo",
    "Ensino Fundamental - Incompleto",
    "Ensino Médio - Completo",
    "Ensino Médio - Incompleto",
    "Ensino Superior - Completo",
    "Ensino Superior - Incompleto"
  ]

  estados: string[] = [
    'AC',  // Acre
    'AL',  // Alagoas
    'AP',  // Amapá
    'AM',  // Amazonas
    'BA',  // Bahia
    'CE',  // Ceará
    'DF',  // Distrito Federal
    'ES',  // Espírito Santo
    'GO',  // Goiás
    'MA',  // Maranhão
    'MT',  // Mato Grosso
    'MS',  // Mato Grosso do Sul
    'MG',  // Minas Gerais
    'PA',  // Pará
    'PB',  // Paraíba
    'PR',  // Paraná
    'PE',  // Pernambuco
    'PI',  // Piauí
    'RJ',  // Rio de Janeiro
    'RN',  // Rio Grande do Norte
    'RS',  // Rio Grande do Sul
    'RO',  // Rondônia
    'RR',  // Roraima
    'SC',  // Santa Catarina
    'SP',  // São Paulo
    'SE',  // Sergipe
    'TO'   // Tocantins
  ];
    faixasSalariais: string[] = [
    'R$ 1.000 - R$ 1.500',
    'R$ 1.501 - R$ 2.000',
    'R$ 2.001 - R$ 2.500',
    'R$ 2.501 - R$ 3.000',
    'R$ 3.001 - R$ 3.500',
    'R$ 3.501 - R$ 4.000',
    'R$ 4.001 - R$ 4.500',
    'R$ 4.501 - R$ 5.000',
    'R$ 5.001 - R$ 5.500',
    'R$ 5.501 - R$ 6.000',
    'R$ 6.001 - R$ 6.500',
    'R$ 6.501 - R$ 7.000',
    'R$ 7.001 - R$ 7.500',
    'R$ 7.501 - R$ 8.000',
    'R$ 8.001 - R$ 8.500',
    'R$ 8.501 - R$ 9.000',
    'R$ 9.001 - R$ 9.500',
    'R$ 9.501 - R$ 10.000',
    'R$ 10.001 - R$ 10.500',
    'R$ 10.501 - R$ 11.000',
    'R$ 11.001 - R$ 11.500',
    'R$ 11.501 - R$ 12.000',
    'R$ 12.001 - R$ 12.500',
    'R$ 12.501 - R$ 13.000',
    'R$ 13.001 - R$ 13.500',
    'R$ 13.501 - R$ 14.000',
    'R$ 14.001 - R$ 14.500',
    'R$ 14.501 - R$ 15.000'
  ];

  constructor(library: FaIconLibrary){
    library.addIcons(faCheck);
    library.addIcons(faAngleLeft);
  }


  onVoltar() {
    this.voltar.emit(); 
  }

}
