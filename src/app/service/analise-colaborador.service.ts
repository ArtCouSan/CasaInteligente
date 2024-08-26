import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseColaborador } from '../core/dto/analise-colaborador';

@Injectable({
  providedIn: 'root'
})
export class AnaliseColaboradorService {
  private apiUrl = 'http://localhost:5000/api/analise-colaborador';

  constructor(private http: HttpClient) { }

  // Obter todas as análises de colaboradores
  getAnalisesColaboradores(): Observable<AnaliseColaborador[]> {
    return this.http.get<AnaliseColaborador[]>(`${this.apiUrl}es`);
  }

  // Obter uma análise de colaborador por ID
  getAnaliseColaborador(id: number): Observable<AnaliseColaborador> {
    return this.http.get<AnaliseColaborador>(`${this.apiUrl}/${id}`);
  }

  // Criar uma nova análise de colaborador
  createAnaliseColaborador(analiseColaborador: AnaliseColaborador): Observable<AnaliseColaborador> {
    return this.http.post<AnaliseColaborador>(this.apiUrl, analiseColaborador);
  }

  // Atualizar uma análise de colaborador existente
  updateAnaliseColaborador(id: number, analiseColaborador: AnaliseColaborador): Observable<AnaliseColaborador> {
    return this.http.put<AnaliseColaborador>(`${this.apiUrl}/${id}`, analiseColaborador);
  }

  // Deletar uma análise de colaborador
  deleteAnaliseColaborador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
