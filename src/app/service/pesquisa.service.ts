import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pergunta } from '../core/dto/pergunta';
import { Resposta } from '../core/dto/resposta';
import { Pesquisa } from '../core/dto/pesquisa';

@Injectable({
    providedIn: 'root'
})
export class PesquisaService {
    private apiUrlPerguntas = 'http://localhost:5000/api/pergunta';
    private apiUrlRespostas = 'http://localhost:5000/api/respostas';
    private apiUrlPesquisa = 'http://localhost:5000/api/pesquisa';
    private apiUrlColaboradorRespostas = 'http://localhost:5000/api/colaborador';

    constructor(private http: HttpClient) { }

    // Obter todas as perguntas
    getPerguntas(): Observable<Pergunta[]> {
        return this.http.get<Pergunta[]>(this.apiUrlPerguntas);
    }

    // Obter perguntas por pesquisa
    getPerguntasPorPesquisa(pesquisaId: number): Observable<Pergunta[]> {
        return this.http.get<Pergunta[]>(`${this.apiUrlPesquisa}/${pesquisaId}/perguntas`);
    }

    // Criar uma nova pergunta
    createPergunta(pergunta: Pergunta): Observable<Pergunta> {
        return this.http.post<Pergunta>(this.apiUrlPerguntas, pergunta);
    }

    // Atualizar uma pergunta existente
    updatePergunta(perguntaId: number, pergunta: Pergunta): Observable<Pergunta> {
        return this.http.put<Pergunta>(`${this.apiUrlPerguntas}/${perguntaId}`, pergunta);
    }

    // Deletar uma pergunta existente
    deletePergunta(perguntaId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlPerguntas}/${perguntaId}`);
    }

    // Obter todas as respostas de um colaborador específico para um determinado trimestre e ano
    getRespostas(colaboradorId: number, pesquisaId: number): Observable<Resposta[]> {
        return this.http.get<Resposta[]>(`${this.apiUrlColaboradorRespostas}/${colaboradorId}/respostas?pesquisaId=${pesquisaId}`);
    }

    // Obter todas as respostas de um colaborador específico
    getRespostasByColaborador(colaboradorId: number): Observable<Resposta[]> {
        return this.http.get<Resposta[]>(`${this.apiUrlColaboradorRespostas}/${colaboradorId}/respostas`);
    }

    // Criar uma nova resposta para um colaborador
    createResposta(colaboradorId: number, resposta: Resposta): Observable<Resposta> {
        return this.http.post<Resposta>(`${this.apiUrlColaboradorRespostas}/${colaboradorId}/resposta`, resposta);
    }

    // Atualizar uma resposta existente
    updateResposta(respostaId: number, resposta: Resposta): Observable<Resposta> {
        return this.http.put<Resposta>(`${this.apiUrlRespostas}/${respostaId}`, resposta);
    }

    // Deletar uma resposta existente
    deleteResposta(respostaId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlRespostas}/${respostaId}`);
    }

    // Obter todas as pesquisas
    getPesquisas(): Observable<Pesquisa[]> {
        return this.http.get<Pesquisa[]>(this.apiUrlPesquisa);
    }

    // Criar uma nova pesquisa
    createPesquisa(pesquisa: Pesquisa): Observable<Pesquisa> {
        return this.http.post<Pesquisa>(`${this.apiUrlPesquisa}`, pesquisa);
    }

    // Atualizar uma pesquisa existente
    updatePesquisa(pesquisaId: number, pesquisa: Pesquisa): Observable<Pesquisa> {
        return this.http.put<Pesquisa>(`${this.apiUrlPesquisa}/${pesquisaId}`, pesquisa);
    }

    // Deletar uma pesquisa existente
    deletePesquisa(pesquisaId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlPesquisa}/${pesquisaId}`);
    }

    // Marcar pesquisa como anônima ou fechada
    marcarPesquisa(id: number, data: { is_pesquisa_anonima?: number, is_pesquisa_fechada?: number }): Observable<any> {
        return this.http.patch(`${this.apiUrlPesquisa}/marcar/${id}`, data);
    }

    // Busca a pesquisa fechada
    getPesquisaFechada(): Observable<Pesquisa> {
        return this.http.get<Pesquisa>(`${this.apiUrlPesquisa}/fechada`);
    }

    // Busca a pesquisa anônima
    getPesquisaAnonima(): Observable<Pesquisa> {
        return this.http.get<Pesquisa>(`${this.apiUrlPesquisa}/anonima`);
    }
}
