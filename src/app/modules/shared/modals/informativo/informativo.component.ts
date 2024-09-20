import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informativo',
  templateUrl: './informativo.component.html',
  styleUrl: './informativo.component.scss'
})
export class InformativoComponent {
  constructor(
    public dialogRef: MatDialogRef<InformativoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: 'Sucesso' | 'Erro' | 'info' | 'warning', mensagem: string }
  ) { }

  fecharModal(): void {
    this.dialogRef.close();
  }
}
