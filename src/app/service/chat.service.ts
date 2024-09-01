import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private apiUrl = 'http://localhost:5000/api/colaborador';  // URL base do backend Flask

    constructor(private http: HttpClient) { }

    // Método para obter mensagens de um colaborador específico
    getMessages(colaboradorId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${colaboradorId}/messages`);
    }

    // Método para enviar uma nova mensagem para um colaborador específico
    sendMessage(colaboradorId: number, message: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${colaboradorId}/messages`, { text: message });
    }
}
