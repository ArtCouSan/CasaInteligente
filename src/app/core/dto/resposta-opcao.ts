export interface RespostaOpcao {
    id?: number;  // Opcional, pois pode ainda não ter sido salvo no banco
    texto: string;
    nota: number;
}