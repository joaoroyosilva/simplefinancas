import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from 'app/shared/services/firebase.service';
import { MessageService } from 'app/shared/services/message.service';
import { Receita } from '../../../shared/models/receita.model';

@Component({
  selector: 'app-deleta-receita',
  templateUrl: './deleta-receita.component.html',
  styleUrls: ['./deleta-receita.component.scss']
})
export class DeletaReceitaComponent implements OnInit {

  receita: Receita;

  constructor(
    public dialogRef: MatDialogRef<DeletaReceitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.receita = this.data.receita;
  }

  deletar(): void {
    this.firebaseService.delReceita(this.receita);
    this.dialogRef.close();
  }
}
