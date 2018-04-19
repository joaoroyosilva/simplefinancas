import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';

import { GraficosService } from '../../shared/services/graficos.service';
import { Receita } from '../../shared/models/receita.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {


  hora_receitas: any;
  atualiza_receitas: Subscription;

  hora_despesas: any;
  atualiza_despesas: Subscription;

  constructor(private graficosService: GraficosService) { }
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

  ngOnInit() {
    this.atualizaReceitas();
    let observable_receitas: Observable<any> = Observable.interval(600000);
    this.atualiza_receitas = observable_receitas.subscribe(
      (interval) => {
        this.atualizaReceitas();
      }
    )

    this.atualizaDespesas();
    let observable_despesas: Observable<any> = Observable.interval(600000);
    this.atualiza_despesas = observable_despesas.subscribe(
      (interval) => {
        this.atualizaDespesas();
      }
    )


    var dataEmailsSubscriptionChart = {
      labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      series: [
        [542, -400, 320, 780, 553, 453, 326]

      ]
    };
    var optionsEmailsSubscriptionChart = {
      axisX: {
        showGrid: false
      },
      low: -1000,
      high: 1000,
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
    var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

    this.startAnimationForBarChart(emailsSubscriptionChart);
  }

  ngOnDestroy() {
    this.atualiza_receitas.unsubscribe();
    this.atualiza_despesas.unsubscribe();
  }

  atualizaReceitas(): void {
    this.graficosService.getReceitas().then(
      (receitas: any) => {
        //console.log('atualizou', this.receitas)
        this.hora_receitas = new Date();
        const dataReceitasSemana: any = {
          labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          series: [
            receitas
          ]
        };

        const optionsReceitasSemana: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
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

    this.graficosService.getDespesas().then(
      (despesas: any) => {
        //console.log('atualizou', this.despesas)
        this.hora_despesas = new Date();
        const dataDespesasSemana: any = {
          labels: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          series: [
            despesas
          ]
        };

        const optionsDespesasSemana: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: Math.max.apply(null, despesas) * 1.101, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var despesasSemana = new Chartist.Line('#despesasSemana', dataDespesasSemana, optionsDespesasSemana);

        this.startAnimationForLineChart(despesasSemana);
      }
    )
  }
}
