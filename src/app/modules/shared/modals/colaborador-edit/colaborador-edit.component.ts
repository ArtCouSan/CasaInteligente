import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Cargo, Colaborador, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../core/dto/colaborador';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-colaborador-edit',
  templateUrl: './colaborador-edit.component.html',
  styleUrl: './colaborador-edit.component.scss'
})
export class ColaboradorEditComponent {

  @Input()
  colaborador!: Colaborador;
  @Output() salvar = new EventEmitter<Colaborador>();
  @Output() voltar = new EventEmitter<void>();

  readonly panelDadosPessoais = signal(true);
  readonly panelContato = signal(true);
  readonly panelEndereco = signal(true);
  readonly panelFormacao = signal(true);
  readonly panelCargo = signal(true);
  readonly panelCarreira = signal(true);

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

  onSalvar(): void {
    this.salvar.emit(this.colaborador);
  }

}
