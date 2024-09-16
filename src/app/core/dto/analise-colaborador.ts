import { Colaborador } from '../../core/dto/colaborador';

export interface AnaliseColaborador {
  colaborador: Colaborador;
  motivo: string;
  evasao: string;
  sugestao: string;
  observacao: string;
}

