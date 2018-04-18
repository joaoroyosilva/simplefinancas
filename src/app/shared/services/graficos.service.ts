import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

import { Receita } from '../models/receita.model';
import { FirebaseService } from './firebase.service';

@Injectable()
export class GraficosService implements OnInit {

  receitas: Array<Receita> = [];
  atualizandoReceitas: Subscription;

  constructor(private firebaseService: FirebaseService) { }


  ngOnInit() {

  }


  getReceitas(): Promise<any> {
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
          //console.log(categorias);
          resolve(receitas);
        })
    })
  }
}
