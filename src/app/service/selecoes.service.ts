import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo, Departamento, EstadoCivil, Faculdade, FaixaSalarial, Formacao, Genero, NivelEscolaridade, Setor } from '../core/dto/colaborador';

@Injectable({
  providedIn: 'root'
})
export class SelecoesService {
  private apiUrl = 'http://localhost:5000/api';  // Base URL para as APIs

  constructor(private http: HttpClient) { }

  // Listar Gêneros
  listarGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.apiUrl}/generos`);
  }

  // Listar Estados Civis
  listarEstadosCivis(): Observable<EstadoCivil[]> {
    return this.http.get<EstadoCivil[]>(`${this.apiUrl}/estados-civis`);
  }

  // Listar Níveis de Escolaridade
  listarNiveisEscolaridade(): Observable<NivelEscolaridade[]> {
    return this.http.get<NivelEscolaridade[]>(`${this.apiUrl}/niveis-escolaridade`);
  }

  // Listar Faculdades
  listarFaculdades(): Observable<Faculdade[]> {
    return this.http.get<Faculdade[]>(`${this.apiUrl}/faculdades`);
  }

  // Listar Formações
  listarFormacoes(): Observable<Formacao[]> {
    return this.http.get<Formacao[]>(`${this.apiUrl}/formacoes`);
  }

  // Listar Departamentos
  listarDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/departamentos`);
  }

  // Listar Setores
  listarSetores(): Observable<Setor[]> {
    return this.http.get<Setor[]>(`${this.apiUrl}/setores`);
  }

  listarFaixasSalariais(): Observable<FaixaSalarial[]> {
    return this.http.get<FaixaSalarial[]>(`${this.apiUrl}/faixas-salariais`);
  }

  listarCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.apiUrl}/cargos`);
  }


}
