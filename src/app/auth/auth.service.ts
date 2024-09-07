import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Colaborador, Perfil } from '../core/dto/colaborador';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private loginUrl = 'http://localhost:5000/api/login';
    private logoutUrl = 'http://localhost:5000/api/logout';

    constructor(private http: HttpClient) {
    }

    login(cpf: string, password: string): Observable<any> {
        return this.http.post(`${this.loginUrl}`, { cpf, password }).pipe(
            tap(response => {
                if (response) {
                    var colaborador = response as Colaborador
                    localStorage.setItem('user', JSON.stringify(colaborador));
                    localStorage.setItem('perfis', JSON.stringify(colaborador.perfis as Perfil[]));  // Armazena os perfis
                }
            })
        );
    }

    // Logout do colaborador
    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('perfis');
    }

    // Verifica se o usuário está logado
    isLoggedIn(): boolean {
        return localStorage.getItem('user') !== null;
    }

    // Obtém o colaborador logado
    getCurrentUser(): any {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user) as Colaborador;
        }
        return null
    }

    getPerfis(): Perfil[] {
        const perfis = localStorage.getItem('perfis');
        if (perfis) {
            return JSON.parse(perfis) as Perfil[];
        }
        return [];
    }
}
