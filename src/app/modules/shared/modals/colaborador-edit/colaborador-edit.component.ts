import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Cargo, Colaborador, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../../../../core/dto/colaborador';
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
    { id: 3, descricao: 'Outros' }
  ];
  
  estadosCivis: EstadoCivil[] = [
    { id: 1, descricao: 'Solteiro' },
    { id: 2, descricao: 'Casado' },
    { id: 3, descricao: 'Viuvo' },
    { id: 4, descricao: 'Divorciado' },
    { id: 5, descricao: 'Solteira' },
    { id: 6, descricao: 'Casada' },
    { id: 7, descricao: 'Viuva' },
    { id: 8, descricao: 'Divorciada' }
  ];
  
  niveisEscolaridade: NivelEscolaridade[] = [
    { id: 1, descricao: 'Ensino Fundamental - Completo' },
    { id: 2, descricao: 'Ensino Fundamental - Incompleto' },
    { id: 3, descricao: 'Ensino Médio - Completo' },
    { id: 4, descricao: 'Ensino Médio - Incompleto' },
    { id: 5, descricao: 'Ensino Superior - Completo' },
    { id: 6, descricao: 'Ensino Superior - Incompleto' }
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
    { id: 1, descricao: 'R$ 1.000 - R$ 1.500' },
    { id: 2, descricao: 'R$ 1.501 - R$ 2.000' },
    { id: 3, descricao: 'R$ 2.001 - R$ 2.500' },
    { id: 4, descricao: 'R$ 2.501 - R$ 3.000' },
    { id: 5, descricao: 'R$ 3.001 - R$ 3.500' },
    { id: 6, descricao: 'R$ 3.501 - R$ 4.000' },
    { id: 7, descricao: 'R$ 4.001 - R$ 4.500' },
    { id: 8, descricao: 'R$ 4.501 - R$ 5.000' },
    { id: 9, descricao: 'R$ 5.001 - R$ 5.500' },
    { id: 10, descricao: 'R$ 5.501 - R$ 6.000' },
    { id: 11, descricao: 'R$ 6.001 - R$ 6.500' },
    { id: 12, descricao: 'R$ 6.501 - R$ 7.000' },
    { id: 13, descricao: 'R$ 7.001 - R$ 7.500' },
    { id: 14, descricao: 'R$ 7.501 - R$ 8.000' },
    { id: 15, descricao: 'R$ 8.001 - R$ 8.500' },
    { id: 16, descricao: 'R$ 8.501 - R$ 9.000' },
    { id: 17, descricao: 'R$ 9.001 - R$ 9.500' },
    { id: 18, descricao: 'R$ 9.501 - R$ 10.000' },
    { id: 19, descricao: 'R$ 10.001 - R$ 10.500' },
    { id: 20, descricao: 'R$ 10.501 - R$ 11.000' },
    { id: 21, descricao: 'R$ 11.001 - R$ 11.500' },
    { id: 22, descricao: 'R$ 11.501 - R$ 12.000' },
    { id: 23, descricao: 'R$ 12.001 - R$ 12.500' },
    { id: 24, descricao: 'R$ 12.501 - R$ 13.000' },
    { id: 25, descricao: 'R$ 13.001 - R$ 13.500' },
    { id: 26, descricao: 'R$ 13.501 - R$ 14.000' },
    { id: 27, descricao: 'R$ 14.001 - R$ 14.500' },
    { id: 28, descricao: 'R$ 14.501 - R$ 15.000' }
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
