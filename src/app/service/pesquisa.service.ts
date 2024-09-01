import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pergunta } from '../core/dto/pergunta';
import { Resposta } from '../core/dto/resposta';

@Injectable({
    providedIn: 'root'
})
export class PesquisaService {
    private apiUrlPerguntas = 'http://localhost:5000/api/perguntas';
    private apiUrlRespostas = 'http://localhost:5000/api/respostas';
    private apiUrlColaboradorRespostas = 'http://localhost:5000/api/colaborador';

    constructor(private http: HttpClient) { }

    // Obter todas as perguntas
    getPerguntas(): Observable<Pergunta[]> {
        return this.http.get<Pergunta[]>(this.apiUrlPerguntas);
    }

    // Criar uma nova pergunta
    createPergunta(pergunta: Pergunta): Observable<Pergunta> {
        return this.http.post<Pergunta>(this.apiUrlPerguntas, pergunta);
    }

    getRespostas(colaboradorId: number, trimestre: string, ano: number): Observable<Resposta[]> {
        return this.http.get<Resposta[]>(`${this.apiUrlColaboradorRespostas}/${colaboradorId}/respostas?trimestre=${trimestre}&ano=${ano}`);
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
}
