import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Termometro } from "../core/dto/termometro";

@Injectable({
    providedIn: 'root'
})
export class TermometroService {

    private apiUrl = 'http://localhost:5000/api/termometro';

    constructor(private http: HttpClient) { }

    getAllTermometros(): Observable<Termometro[]> {
        return this.http.get<Termometro[]>(this.apiUrl + "s");
    }

    atualizarTermometro(contexto_id: number): Observable<Termometro> {
        return this.http.get<Termometro>(`${this.apiUrl}/${contexto_id}`);
    }

}