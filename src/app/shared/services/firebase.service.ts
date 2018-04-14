import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario.model';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { CategoriaLancamento } from '../models/categoria-lancamento.model';

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

  updateUsuario(usuario: Usuario): void {
    delete usuario.senha;
    //console.log(usuario);
    firebase.database().ref(`${btoa(localStorage.getItem('email'))}/usuario`)
      .set(usuario)
      .then((resp) => this.messageService.sucesso('Dados Atualizados com sucesso!'))
      .catch((erro) => this.messageService.erro('Não foi possível atualizar os dados!'))
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
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento`)
        .push(categoria)
        .then((resp: any) => {
          this.messageService.sucesso('Categoria inserida com sucesso!');
        })
    })
  }

  delCategoria(categoria: CategoriaLancamento): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento/${categoria.key}`)
        .remove()
        .then((resp: any) => {
          this.messageService.sucesso('Categoria excluída com sucesso!');
        })
    })
  }

  updateCategoria(categoria: CategoriaLancamento): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`${btoa(localStorage.getItem('email'))}/categorias-lancamento/${categoria.key}`)
        .update(categoria)
        .then((resp: any) => {
          this.messageService.sucesso('Categoria excluída com sucesso!');
        })
    })
  }
}
