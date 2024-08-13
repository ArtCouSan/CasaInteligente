import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirmar-delecao',
  templateUrl: './confirmar-delecao.component.html',
  styleUrl: './confirmar-delecao.component.scss'
})
export class ConfirmarDelecaoComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarDelecaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    library: FaIconLibrary
  ) {
    library.addIcons(faCheck);
    library.addIcons(faAngleLeft);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
