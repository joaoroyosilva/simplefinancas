import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

import { Receita } from '../models/receita.model';
import { FirebaseService } from './firebase.service';
import { Despesa } from '../models/despesa.model';

@Injectable()
export class GraficosService implements OnInit {

  receitas: Array<Receita> = [];
  atualizandoReceitas: Subscription;

  constructor(private firebaseService: FirebaseService) { }


  ngOnInit() {

  }


  getReceitasSemana(): Promise<any> {
    return new Promise((resolve, reject) => {
      let receitas: number[] = [0, 0, 0, 0, 0, 0, 0];
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/receitas`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          snapshot.forEach((childSnapshot: any) => {
            let receita: Receita = new Receita();
            //console.log('snap', childSnapshot.val());
            receita = childSnapshot.val();
            let data = moment(new Date());
            let data_receita = moment(receita.vencimento);
            if ((data.week() == data_receita.week()) && (data.year() == data_receita.year())) {
              //console.log('dia', data_receita.weekday());
              //console.log('valor atual', receitas[data_receita.weekday()]);
              //console.log('receita', receita.documento + ' - ' + receita.valor);
              //console.log(receita.valor+receita.valor)
              receitas[data_receita.weekday()] += receita.valor
              //console.log('nova receita', receitas[data_receita.weekday()])
            }
          })
          //console.log('receitas', receitas);
          resolve(receitas);
        })
    })
  }

  getDespesasSemana(): Promise<any> {
    return new Promise((resolve, reject) => {
      let despesas: number[] = [0, 0, 0, 0, 0, 0, 0];
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/despesas`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          snapshot.forEach((childSnapshot: any) => {
            let despesa: Despesa = new Despesa();
            //console.log('snap', childSnapshot.val());
            despesa = childSnapshot.val();
            let data = moment(new Date());
            let data_receita = moment(despesa.vencimento);
            if ((data.week() == data_receita.week()) && (data.year() == data_receita.year())) {
              //console.log('dia', data_receita.weekday());
              //console.log('valor atual', receitas[data_receita.weekday()]);
              //console.log('receita', receita.documento + ' - ' + receita.valor);
              //console.log(receita.valor+receita.valor)
              despesas[data_receita.weekday()] += despesa.valor
              //console.log('nova receita', receitas[data_receita.weekday()])
            }
          })
          //console.log('despesas', despesas);
          resolve(despesas);
        })
    })
  }

}
