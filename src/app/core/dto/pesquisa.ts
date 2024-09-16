import { Pergunta } from "./pergunta";
import { Resposta } from "./resposta";

export interface Pesquisa {
    id: number;
    titulo: string;
    descricao: string;
    ano: number;
    respostas?: Resposta[];
    perguntas?: Pergunta[];
    acoes: string;
    is_pesquisa_fechada?: number;
    is_pesquisa_anonima?: number;
}