import { Colaborador } from '../../core/dto/colaborador';

export interface AnaliseColaborador {
  colaborador: Colaborador;
  motivo: string;
  evasao: string;
  sugestao: string;
  observacao: string;
  porcentagem_evasao: number;
  feature_importance?: EvasaoFeatureImportance[]
}

export interface EvasaoFeatureImportance {
  id: number;
  motivo: string;
  acuracia: number;
}
