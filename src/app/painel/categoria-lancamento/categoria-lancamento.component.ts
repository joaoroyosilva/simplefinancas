import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';

import { CategoriaLancamento } from '../../shared/models/categoria-lancamento.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { CategoriaModalComponent } from './modal/categoria-modal.component';

@Component({
  selector: 'app-categoria-lancamento',
  templateUrl: './categoria-lancamento.component.html',
  styleUrls: ['./categoria-lancamento.component.scss']
})
export class CategoriaLancamentoComponent implements OnInit {

  categorias: CategoriaLancamento[] = [];
  categoria: CategoriaLancamento = new CategoriaLancamento();

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    var atualiza = Observable.interval(2000);
    atualiza.subscribe((interval) => {
      this.firebaseService.getCategorias().then(
        (categorias: any) => {
          this.categorias = categorias;
        }
      )
    })
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CategoriaModalComponent, {
      width: '400px',
      data: { categoria: this.categoria }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoria = new CategoriaLancamento();
    });
  }

}
