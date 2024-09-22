import { Component } from '@angular/core';
import { Termometro } from '../../../../core/dto/termometro';
import { TermometroService } from '../../../../service/termometro.service';

@Component({
  selector: 'app-termometro',
  templateUrl: './termometro.component.html',
  styleUrl: './termometro.component.scss'
})
export class TermometroComponent {
  termometros: Termometro[] = [];
  isLoading = false;

  constructor(
    private termometroService: TermometroService
  ) { }

  ngOnInit(): void {
    this.carregarTermometros();
  }

  carregarTermometros(): void {
    this.isLoading = true;
    this.termometroService.getAllTermometros().subscribe(
      (data) => {
        this.termometros = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
