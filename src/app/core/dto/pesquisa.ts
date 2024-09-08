import { Resposta } from "./resposta";

export interface Pesquisa {
    id: number;
    titulo: string;
    descricao: string;
    ano: number;
    respostas?: Resposta[];
    acoes: string;
}