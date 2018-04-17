import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { Utils } from '../../shared/utils/utils';

import { Receita } from '../../shared/models/receita.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ReceitaModalComponent } from './modal/receita-modal.component';
//import { DeletaReceitaComponent } from './deleta-receita/deleta-receita.component';


@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit, OnDestroy {

  receitas: Receita[] = [];
  atualiza: Observable<any>;
  atualizando: Subscription;

  data;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.atualiza = Observable.interval(2000);
    this.atualizando = this.atualiza.subscribe((interval) => {
      this.firebaseService.getReceitas().then(
        (receitas: any) => {
          this.data = moment(new Utils().getDataAtual());
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
    Swal({
      title: 'Deseja excluir receita?',
      text: `Número do documento: ${receita.documento}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, cancelar!',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.delReceita(receita)
      }
    })
  }

}
