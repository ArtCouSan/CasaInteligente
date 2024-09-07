export interface Colaborador {
  id?: number;
  nome: string;
  cpf: string;
  idade: number;
  genero: Genero;
  estadoCivil: EstadoCivil;
  telefone: string;
  email: string;
  formacao: Formacao;
  faculdade: Faculdade;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  departamento: Departamento;
  setor: Setor;
  faixaSalarial: FaixaSalarial;
  cargo: Cargo;
  gerente?: string;
  tempoTrabalho: string;
  quantidadeEmpresasTrabalhou: number;
  quantidadeAnosTrabalhadosAnteriormente: number;
  nivelEscolaridade: NivelEscolaridade;
  exFuncionario: boolean;
  acoes: string;
  perfis: Perfil[];
}

export interface Genero {
  id: number;
  descricao: string;
}

export interface EstadoCivil {
  id: number;
  descricao: string;
}

export interface Formacao {
  id: number;
  descricao: string;
}

export interface Faculdade {
  id: number;
  nome: string;
}

export interface Departamento {
  id: number;
  nome: string;
}

export interface Setor {
  id: number;
  nome: string;
}

export interface FaixaSalarial {
  id: number;
  descricao: string;
}

export interface Cargo {
  id: number;
  nome: string;
}

export interface NivelEscolaridade {
  id: number;
  descricao: string;
}

export interface Perfil {
  id: number;
  nome: string;
}