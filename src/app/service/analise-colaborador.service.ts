import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseColaborador } from '../core/dto/analise-colaborador';

@Injectable({
  providedIn: 'root'
})
export class AnaliseColaboradorService {
  private apiUrl = 'http://localhost:5000/api/analise-colaborador';

  constructor(private http: HttpClient) { }

  getAnalisesColaboradores(
    page: number,
    perPage: number,
    search: string = '',
    sortColumn: string = '',
    sortDirection: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('search', search);

    if (sortColumn) {
      params = params.set('sortColumn', sortColumn);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    return this.http.get(`${this.apiUrl}es`, { params });
  }

  // Obter uma análise de colaborador por ID
  getAnaliseColaborador(id: number): Observable<AnaliseColaborador> {
    return this.http.get<AnaliseColaborador>(`${this.apiUrl}/${id}`);
  }

  gerarNovoMotivo(colaboradorId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${colaboradorId}/gerar-novo-motivo`, {});
  }

  gerarNovaSugestao(colaboradorId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${colaboradorId}/gerar-nova-sugestao`, {});
  }

  getRecarregarEvasaoColaborador(colaboradorId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${colaboradorId}/recarregar-evasao`);
  }

  getRecarregarEvasaoTodosColaboradores(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/recarregar-todas-evasoes`);
  }
}
