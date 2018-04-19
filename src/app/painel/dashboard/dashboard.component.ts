import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import Swal from 'sweetalert2';

import { GraficosService } from '../../shared/services/graficos.service';
import { Receita } from '../../shared/models/receita.model';
import { Subscription, Observable } from 'rxjs';
import { Despesa } from '../../shared/models/despesa.model';
import { FirebaseService } from '../../shared/services/firebase.service';
import { ReceitaModalComponent } from '../receita/modal/receita-modal.component';
import { MatDialog } from '@angular/material';
import { DespesaModalComponent } from '../despesa/modal/despesa-modal.component';
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {


  hora: any;
  atualiza_receitas: Subscription;
  atualiza_despesas: Subscription;
  atualiza_saldo: Subscription;

  rec_abertas: Receita[] = [];
  rec_atrasadas: Receita[] = [];

  des_abertas: Despesa[] = [];
  des_atrasadas: Despesa[] = [];

  constructor(
    private graficosService: GraficosService,
    private firebaseService: FirebaseService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.atualizaReceitas();
    let observable_receitas: Observable<any> = Observable.interval(600000);
    this.atualiza_receitas = observable_receitas.subscribe(
      (interval) => this.atualizaReceitas()
    )

    this.atualizaDespesas();
    let observable_despesas: Observable<any> = Observable.interval(600000);
    this.atualiza_despesas = observable_despesas.subscribe(
      (interval) => this.atualizaDespesas()
    )

    this.atualizaSaldo();
    let observable_saldo: Observable<any> = Observable.interval(600000);
    this.atualiza_saldo = observable_saldo.subscribe(
      (interval) => this.atualizaSaldo()
    )
  }


  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnDestroy() {
    this.atualiza_receitas.unsubscribe();
    this.atualiza_despesas.unsubscribe();
    this.atualiza_saldo.unsubscribe();
  }

  atualizaReceitas(): void {
    this.firebaseService.getReceitas('abertas')
      .then((receitas: Receita[]) => this.rec_abertas = receitas)
    this.firebaseService.getReceitas('atrasadas')
      .then((receitas: Receita[]) => this.rec_atrasadas = receitas)
    this.graficosService.getReceitasSemana().then(
      (receitas: any) => {
        //console.log('atualizou', this.receitas)
        this.hora = moment(new Utils().getDataAtual());
        const dataReceitasSemana: any = {
          labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          series: [
            receitas
          ]
        };

        const optionsReceitasSemana: any = {
          low: 0,
          high: Math.max.apply(null, receitas) * 1.101, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var receitasSemana = new Chartist.Line('#receitasSemana', dataReceitasSemana, optionsReceitasSemana);

        this.startAnimationForLineChart(receitasSemana);
      }
    )
  }

  atualizaDespesas(): void {
    this.firebaseService.getDespesas('abertas')
      .then((despesas: Receita[]) => this.des_abertas = despesas)
    this.firebaseService.getDespesas('atrasadas')
      .then((despesas: Receita[]) => this.des_atrasadas = despesas)

    this.graficosService.getDespesasSemana().then(
      (despesas: any) => {
        //console.log('atualizou', this.despesas)
        this.hora = moment(new Utils().getDataAtual());
        const dataDespesasSemana: any = {
          labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          series: [
            despesas
          ]
        };

        const optionsDespesasSemana: any = {
          low: 0,
          high: Math.max.apply(null, despesas) * 1.101, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var despesasSemana = new Chartist.Line('#despesasSemana', dataDespesasSemana, optionsDespesasSemana);

        this.startAnimationForLineChart(despesasSemana);
      }
    )
  }

  atualizaSaldo(): void {
    let saldo = [0, 0, 0, 0, 0, 0, 0];
    this.graficosService.getReceitasSemana().then(
      (receitas: any) => {
        for (let i = 0; i < 7; i++) {
          saldo[i] += receitas[i];
        }
        this.graficosService.getDespesasSemana().then(
          (despesas: any) => {
            for (let i = 0; i < 7; i++) {
              saldo[i] -= despesas[i];
            }
            this.hora = moment(new Utils().getDataAtual());
            var dataSaldoSemana = {
              labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
              series: [
                saldo
              ]
            };
            var optionsSaldoSemana = {
              low: Math.min.apply(null, saldo) * 1.101,
              high: Math.max.apply(null, saldo) * 1.101,
              chartPadding: { top: 0, right: 10, bottom: 0, left: 10 }
            };
            var responsiveOptions: any[] = [
              ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function (value) {
                    return value[0];
                  }
                }
              }]
            ];
            var saldoSemana = new Chartist.Line('#saldoSemana', dataSaldoSemana, optionsSaldoSemana, responsiveOptions);

            this.startAnimationForLineChart(saldoSemana);
          })
      })
  }


  catRecDialog(receita: Receita = new Receita()): void {
    let dialogRef = this.dialog.open(ReceitaModalComponent, {
      width: '400px',
      height: '600px',
      data: { receita: receita }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.atualizaReceitas()
    });
  }

  delRecDialog(receita: Receita): void {
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
        this.firebaseService.delReceita(receita).then(
          (resp) => this.atualizaReceitas()
        )
      }
    })
  }

  catDesDialog(despesa: Despesa = new Despesa()): void {
    let dialogRef = this.dialog.open(DespesaModalComponent, {
      width: '400px',
      height: '600px',
      data: { despesa: despesa }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.atualizaDespesas()
    });
  }

  delDesDialog(despesa: Despesa): void {
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
        .then(resp=> this.atualizaDespesas())
      }
    })
  }
}

