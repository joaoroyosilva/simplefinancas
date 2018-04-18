import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { Utils } from '../../shared/utils/utils';

import { Receita } from '../../shared/models/receita.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ReceitaModalComponent } from './modal/receita-modal.component';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit, OnDestroy {

  receitas: Receita[] = [];
  atualiza: Observable<any>;
  atualizando: Subscription;
  carregando: boolean = false;

  data;

  displayedColumns = ['documento', 'historico', 'categoria', 'emissao', 'vencimento', 'valor', 'situacao', 'opcoes'];
  dataSource: MatTableDataSource<Receita>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.atualiza = Observable.interval(2000);
    this.atualizando = this.atualiza.subscribe((interval) => {
    //this.carregando = true;
      this.firebaseService.getReceitas().then(
        (receitas: any) => {
          //this.carregando = false;
          this.data = moment(new Utils().getDataAtual());
          this.receitas = receitas;
          this.dataSource = new MatTableDataSource(this.receitas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
    })
  }

  ngOnDestroy() {
    this.atualizando.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
