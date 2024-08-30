import { Colaborador } from '../../core/dto/colaborador';

export interface AnaliseColaborador {
  colaborador: Colaborador;
  motivo: string;
  predicao: number;
  sugestao: string;
  observacao: string;
}

