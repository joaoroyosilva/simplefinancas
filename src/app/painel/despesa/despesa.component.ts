import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { Utils } from '../../shared/utils/utils';

import { Despesa } from '../../shared/models/despesa.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { DespesaModalComponent } from './modal/despesa-modal.component';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent implements OnInit, OnDestroy {

  despesas: Despesa[] = [];
  atualiza: Observable<any>;
  atualizando: Subscription;
  carregando: boolean = false;

  data;

  displayedColumns = ['documento', 'historico', 'categoria', 'emissao', 'vencimento', 'valor', 'situacao', 'opcoes'];
  dataSource: MatTableDataSource<Despesa>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.atualiza = Observable.interval(2000);
    this.atualizando = this.atualiza.subscribe((interval) => {
    //this.carregando = true;
      this.firebaseService.getDespesas().then(
        (despesas: any) => {
          //this.carregando = false;
          this.data = moment(new Utils().getDataAtual());
          this.despesas = despesas;
          this.dataSource = new MatTableDataSource(this.despesas);
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

  catDialog(despesa: Despesa = new Despesa()): void {
    let dialogRef = this.dialog.open(DespesaModalComponent, {
      width: '400px',
      height: '600px',
      data: { despesa: despesa }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  delDialog(despesa: Despesa): void {
    Swal({
      title: 'Deseja excluir despesa?',
      text: `Número do documento: ${despesa.documento}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não, cancelar!',
      confirmButtonText: 'Sim, excluir!'
    }).then((result) => {
      if (result.value) {
        this.firebaseService.delDespesa(despesa)
      }
    })
  }
}
