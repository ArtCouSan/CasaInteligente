import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { AnaliseColaborador } from '../../../core/dto/analise-colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Cargo, Colaborador, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../core/dto/colaborador';

@Component({
  selector: 'app-detalhe-analise-colaborador',
  templateUrl: './detalhe-analise-colaborador.component.html',
  styleUrl: './detalhe-analise-colaborador.component.scss'
})
export class DetalheAnaliseColaboradorComponent {

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

  generos: Genero[] = [
    { id: 1, descricao: 'Masculino' },
    { id: 2, descricao: 'Feminino' },
    { id: 3, descricao: 'Outro' }
  ];

  estadosCivis: EstadoCivil[] = [
    { id: 1, descricao: 'Solteiro' },
    { id: 2, descricao: 'Casado' },
    { id: 3, descricao: 'Divorciado' }
  ];

  niveisEscolaridade: NivelEscolaridade[] = [
    { id: 1, descricao: 'Ensino Médio' },
    { id: 2, descricao: 'Graduação' },
    { id: 3, descricao: 'Pós-Graduação' }
  ];

  faculdades: Faculdade[] = [
    { id: 1, nome: 'USP' },
    { id: 2, nome: 'PUC-SP' },
    { id: 3, nome: 'FGV' }
  ];

  formacoes: Formacao[] = [
    { id: 1, descricao: 'Ciência da Computação' },
    { id: 2, descricao: 'Engenharia de Software' },
    { id: 3, descricao: 'Administração' }
  ];

  departamentos: Departamento[] = [
    { id: 1, nome: 'TI' },
    { id: 2, nome: 'Financeiro' },
    { id: 3, nome: 'RH' }
  ];

  setores: Setor[] = [
    { id: 1, nome: 'Desenvolvimento' },
    { id: 2, nome: 'Contabilidade' },
    { id: 3, nome: 'Recrutamento' }
  ];

  faixasSalariais: FaixaSalarial[] = [
    { id: 1, descricao: 'R$ 4.000 - R$ 6.000' },
    { id: 2, descricao: 'R$ 6.001 - R$ 8.000' },
    { id: 3, descricao: 'R$ 8.001 - R$ 10.000' }
  ];

  cargos: Cargo[] = [
    { id: 1, nome: 'Desenvolvedor' },
    { id: 2, nome: 'Analista Financeiro' },
    { id: 3, nome: 'Gerente de TI' }
  ];

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

  constructor(library: FaIconLibrary){
    library.addIcons(faCheck);
    library.addIcons(faAngleLeft);
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
