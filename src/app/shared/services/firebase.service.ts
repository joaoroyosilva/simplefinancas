import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { CategoriaLancamento } from '../models/categoria-lancamento.model';
import { Receita } from 'app/shared/models/receita.model';

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

  getReceitas(): Promise<any> {
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
            receitas.push(receita);
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
}
