import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { Receita } from '../../shared/models/receita.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ReceitaModalComponent } from './modal/receita-modal.component';
import { DeletaReceitaComponent } from './deleta-receita/deleta-receita.component';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit, OnDestroy {

  receitas: Receita[] = [];
  atualiza: Observable<any>;
  atualizando: Subscription;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.atualiza = Observable.interval(2000);
    this.atualizando = this.atualiza.subscribe((interval) => {
      this.firebaseService.getReceitas().then(
        (receitas: any) => {
          this.receitas = receitas;
        }
      )
    })
  }

  ngOnDestroy() {
    this.atualizando.unsubscribe();
  }

  catDialog(receita: Receita = new Receita()): void {
    let dialogRef = this.dialog.open(ReceitaModalComponent, {
      width: '400px',
      height: '600px',
      data: { receita: receita }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  delDialog(receita: Receita): void {
    let dialogRef = this.dialog.open(DeletaReceitaComponent, {
      width: '400px',
      height: '250px',
      data: { receita: receita }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}