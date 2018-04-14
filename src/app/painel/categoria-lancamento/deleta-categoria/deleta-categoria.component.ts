import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from 'app/shared/services/firebase.service';
import { MessageService } from 'app/shared/services/message.service';
import { CategoriaLancamento } from '../../../shared/models/categoria-lancamento.model';

@Component({
  selector: 'app-deleta-categoria',
  templateUrl: './deleta-categoria.component.html',
  styleUrls: ['./deleta-categoria.component.scss']
})
export class DeletaCategoriaComponent implements OnInit {

  categoria: CategoriaLancamento;

  constructor(
    public dialogRef: MatDialogRef<DeletaCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.categoria = this.data.categoria;
  }

  deletar(): void {
    this.firebaseService.delCategoria(this.categoria);
    this.dialogRef.close();
  }
}
