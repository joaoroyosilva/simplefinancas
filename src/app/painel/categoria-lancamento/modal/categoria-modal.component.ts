import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaLancamento } from '../../../shared/models/categoria-lancamento.model';
import { FirebaseService } from '../../../shared/services/firebase.service';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.scss']
})
export class CategoriaModalComponent implements OnInit {

  categoria: CategoriaLancamento;

  constructor(
    public dialogRef: MatDialogRef<CategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.categoria = this.data.categoria;
  }

  inserirCategoria(): void {
    this.firebaseService.setCategoria(this.categoria);
    this.dialogRef.close();
  }

}
