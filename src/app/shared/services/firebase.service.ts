import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import * as moment from 'moment';


import { Usuario } from '../models/usuario.model';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { CategoriaLancamento } from '../models/categoria-lancamento.model';
import { Receita } from 'app/shared/models/receita.model';
import { Despesa } from '../models/despesa.model';
import { Utils } from '../utils/utils';

@Injectable()
export class FirebaseService implements OnInit {


  constructor(private messageService: MessageService) { }

  ngOnInit() {

  }

  getUsuario(): Promise<any> {
    //console.log(this.authService.email)
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/usuario`)
        .once('value')
        .then((snapshot: any) => {
          let usuario: Usuario = snapshot.val();
          //console.log(snapshot.val())
          resolve(usuario);
        })
    })
  }

  updateUsuario(usuario: Usuario): Promise<any> {
    return new Promise((resolve, reject) => {
      delete usuario.senha;
      //console.log(usuario);
      usuario.email = localStorage.getItem('email');
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/usuario`)
        .set(usuario)
        .then((resp) => {
          this.messageService.sucesso('Dados Atualizados com sucesso!');
          resolve()
        })
        .catch((erro) => this.messageService.erro('Não foi possível atualizar os dados!'))
    });
  }

  getCategorias(): Promise<any> {
    return new Promise((resolve, reject) => {
      let categorias: CategoriaLancamento[] = [];
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          snapshot.forEach((childSnapshot: any) => {
            let categoria: CategoriaLancamento = new CategoriaLancamento();
            categoria = childSnapshot.val();
            categoria.key = childSnapshot.key;
            categorias.push(categoria);
          })
          //console.log(categorias);
          resolve(categorias);
        })
    })
  }

  pushCategoria(categoria: CategoriaLancamento): Promise<any> {
    return new Promise((resolve, reject) => {
      delete categoria.key;
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento`)
        .push(categoria)
        .then((resp: any) => {
          this.messageService.sucesso('Categoria inserida com sucesso!');
          resolve(true);
        })
    })
  }

  delCategoria(categoria: CategoriaLancamento): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento/${categoria.key}`)
        .remove()
        .then((resp: any) => {
          Swal(
            'Deletada!',
            'Categoria deletada com sucesso!',
            'success'
          )
        })
    })
  }

  updateCategoria(categoria: CategoriaLancamento): Promise<any> {
    return new Promise((resolve, reject) => {
      let key = categoria.key;
      delete categoria.key;
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento/${key}`)
        .update(categoria)
        .then((resp: any) => {
          Swal(
            'Editada!',
            'Categoria editada com sucesso!',
            'success'
          )
        })
    })
  }

  getReceitas(status: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      let receitas: Receita[] = [];
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/receitas`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          snapshot.forEach((childSnapshot: any) => {
            let receita: Receita = new Receita();
            receita = childSnapshot.val();
            receita.key = childSnapshot.key;
            switch (status) {
              case 'abertas':
                if (receita.quitada == 'false') {
                  receitas.push(receita);
                }
                break;

              case 'atrasadas':
                let data = moment(new Utils().getDataAtual());
                if (data.isAfter(receita.vencimento) && receita.quitada == 'false') {
                  receitas.push(receita);
                }
                break;

              case 'quitadas':
                if (receita.quitada == 'true') {
                  receitas.push(receita);
                }
                break;

              default:
                receitas.push(receita);
                break;
            }
          })
          //console.log(categorias);
          resolve(receitas);
        })
    })
  }

  pushReceita(receita: Receita): Promise<any> {
    return new Promise((resolve, reject) => {
      delete receita.key;
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/receitas`)
        .push(receita)
        .then((resp: any) => {
          this.messageService.sucesso('Receita inserida com sucesso!');
          resolve(true);
        })
    })
  }

  delReceita(receita: Receita): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/receitas/${receita.key}`)
        .remove()
        .then((resp: any) => {
          Swal(
            'Deletada!',
            'Receita deletada com sucesso!',
            'success'
          )
        })
    })
  }

  updateReceita(receita: Receita): Promise<any> {
    return new Promise((resolve, reject) => {
      let key = receita.key;
      delete receita.key;
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/receitas/${key}`)
        .update(receita)
        .then((resp: any) => {
          Swal(
            'Editada!',
            'Receita editada com sucesso!',
            'success'
          )
        })
    })
  }

  getDespesas(status: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      let despesas: Despesa[] = [];
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/despesas`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          snapshot.forEach((childSnapshot: any) => {
            let despesa: Despesa = new Despesa();
            despesa = childSnapshot.val();
            despesa.key = childSnapshot.key;
            switch (status) {
              case 'abertas':
                if (despesa.quitada == 'false') {
                  despesas.push(despesa);
                }
                break;

              case 'atrasadas':
                let data = moment(new Utils().getDataAtual());
                if (data.isAfter(despesa.vencimento) && despesa.quitada == 'false') {
                  despesas.push(despesa);
                }
                break;

              case 'quitadas':
                if (despesa.quitada == 'true') {
                  despesas.push(despesa);
                }
                break;

              default:
                despesas.push(despesa);
                break;
            }
          })
          //console.log(categorias);
          resolve(despesas);
        })
    })
  }

  pushDespesa(despesa: Despesa): Promise<any> {
    return new Promise((resolve, reject) => {
      delete despesa.key;
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/despesas`)
        .push(despesa)
        .then((resp: any) => {
          this.messageService.sucesso('Despesa inserida com sucesso!');
          resolve(true);
        })
    })
  }

  delDespesa(despesa: Despesa): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/despesas/${despesa.key}`)
        .remove()
        .then((resp: any) => {
          Swal(
            'Deletada!',
            'Despesa deletada com sucesso!',
            'success'
          )
        })
    })
  }

  updateDespesa(despesa: Despesa): Promise<any> {
    return new Promise((resolve, reject) => {
      let key = despesa.key;
      delete despesa.key;
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/despesas/${key}`)
        .update(despesa)
        .then((resp: any) => {
          Swal(
            'Editada!',
            'Despesa editada com sucesso!',
            'success'
          )
        })
    })
  }
}
