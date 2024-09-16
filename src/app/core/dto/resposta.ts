import { Colaborador } from "./colaborador";
import { Pergunta } from "./pergunta";
import { Pesquisa } from "./pesquisa";

export interface Resposta {
    id?: number;
    colaborador_id: number;
    pesquisa_id: number;
    pergunta_id: number;
    nota: number;

    colaborador?: Colaborador;
    pergunta?: Pergunta;
    pesquisa?: Pesquisa;
    is_pesquisa_fechada?: number;
    is_pesquisa_anonima?: number;
}