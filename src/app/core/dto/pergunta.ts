import { RespostaOpcao } from "./resposta-opcao";

export interface Pergunta {
    id: number;
    texto: string;
    acoes: string;
    opcoes_resposta?: RespostaOpcao[];
    selecionada: boolean;
}