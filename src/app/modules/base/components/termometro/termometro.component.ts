import { Component } from '@angular/core';
import { Termometro } from '../../../../core/dto/termometro';
import { TermometroService } from '../../../../service/termometro.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFaceSadCry, faFaceLaughWink, faFaceMeh, faRotate } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { InformativoComponent } from '../../../shared/modals/informativo/informativo.component';

@Component({
  selector: 'app-termometro',
  templateUrl: './termometro.component.html',
  styleUrl: './termometro.component.scss'
})
export class TermometroComponent {
  termometros: Termometro[] = [];
  isLoading = false;

  constructor(
    library: FaIconLibrary,
    private dialog: MatDialog,
    private termometroService: TermometroService
  ) {
    library.addIcons(faFaceSadCry, faFaceLaughWink, faRotate, faFaceMeh);
  }

  ngOnInit(): void {
    this.carregarTermometros();
  }

  // Método para carregar os dados dos termômetros
  carregarTermometros(): void {
    this.isLoading = true; // Ativa o carregamento
    this.termometroService.getAllTermometros().subscribe({
      next: (data) => {
        this.termometros = data;
        this.isLoading = false; // Desativa o carregamento
      },
      error: (err) => {
        console.error('Erro ao carregar os termômetros:', err);
        this.isLoading = false; // Desativa o carregamento em caso de erro
      }
    });
  }

  // Método para recarregar um único termômetro pelo contexto_id
  recarregarTermometro(contexto_id: number): void {
    this.termometroService.atualizarTermometro(contexto_id).subscribe(
      (atualizado) => {
        // Atualiza o termômetro na lista
        const index = this.termometros.findIndex(termometro => termometro.contexto_id === contexto_id);
        if (index !== -1) {
          this.termometros[index] = atualizado;
        }
        this.abrirModalInformativo('Sucesso', 'Motivo atualizado com sucesso!');
      },
      (error) => {
        this.abrirModalInformativo('Erro', 'Ocorreu um erro ao recarregar.');
      }
    );
  }

  // Método para retornar a classe CSS de acordo com o status
  getClassByStatus(status: string): string {
    if (status === 'bom') {
      return 'status-bom';
    } else if (status === 'ruim') {
      return 'status-ruim';
    } else {
      return 'status-neutro';
    }
  }

  abrirModalInformativo(tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string): void {
    const dialogRef = this.dialog.open(InformativoComponent, {
      width: '400px',
      data: { tipo, mensagem }
    });

    // Recarrega a página somente após o modal ser fechado
    dialogRef.afterClosed().subscribe(() => {
      window.location.reload(); // Recarrega a página após fechar o modal
    });
  }

}
