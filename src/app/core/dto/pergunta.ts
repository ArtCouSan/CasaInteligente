import { Resposta } from "./resposta";

export interface Pergunta {
    id: number;
    texto: string;
    acoes: string;
    respostas?: Resposta[];  // Respostas podem ser opcionais, como no `include_respostas=False`
}