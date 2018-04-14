import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { CategoriaLancamento } from '../../shared/models/categoria-lancamento.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { CategoriaModalComponent } from './modal/categoria-modal.component';
import { DeletaCategoriaComponent } from './deleta-categoria/deleta-categoria.component';

@Component({
  selector: 'app-categoria-lancamento',
  templateUrl: './categoria-lancamento.component.html',
  styleUrls: ['./categoria-lancamento.component.scss']
})
export class CategoriaLancamentoComponent implements OnInit, OnDestroy {

  categorias: CategoriaLancamento[] = [];
  categoria: CategoriaLancamento = new CategoriaLancamento();
  atualiza: Observable<any>;
  atualizando: Subscription;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.atualiza = Observable.interval(2000);
    this.atualizando = this.atualiza.subscribe((interval) => {
      this.firebaseService.getCategorias().then(
        (categorias: any) => {
          this.categorias = categorias;
        }
      )
    })
  }

  ngOnDestroy() {
    this.atualizando.unsubscribe();
  }

  catDialog(categoria: CategoriaLancamento = new CategoriaLancamento()): void {
    let dialogRef = this.dialog.open(CategoriaModalComponent, {
      width: '400px',
      height: '300px',
      data: { categoria: categoria }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoria = new CategoriaLancamento();
    });
  }

  delDialog(categoria: CategoriaLancamento): void {
    let dialogRef = this.dialog.open(DeletaCategoriaComponent, {
      width: '400px',
      height: '250px',
      data: { categoria: categoria }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
