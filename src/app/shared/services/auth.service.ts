import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Router } from '@angular/router';

import { MessageService } from './message.service';
import { Usuario } from '../models/usuario.model';

@Injectable()
export class AuthService {

  public token_id: string;

  constructor(private router: Router, private messageService: MessageService) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    //console.log('Chegamos até o serviço: ', usuario)

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        this.messageService.sucesso('Usuário cadastrado com sucesso!');
        //remover a senha do atributo senha do objeto usuário
        delete usuario.senha
        //registrando dados complementares do usuário no path email na base64
        firebase.database().ref(`${btoa(usuario.email)}/usuario`)
          .set(usuario)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  public autenticar(email: string, senha: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
          firebase.auth().currentUser.getIdToken()
            .then((idToken: string) => {
              localStorage.setItem('email', email)
              this.token_id = idToken
              localStorage.setItem('idToken', idToken)
              this.router.navigate(['/painel'])
              resolve()
            })
        }).catch((error: Error) => {
          reject()
          this.messageService.erro('Usuário/Senha inválidos!');
        })
    })

  }

  public autenticado(): boolean {

    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }

    if (this.token_id === undefined) {
      this.router.navigate(['/auth/login'])
    }

    return this.token_id !== undefined
  }

  public sair(): void {

    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken')
        this.token_id = undefined
        this.router.navigate(['/auth/login'])
      })
  }

  logarGmail(): boolean {
    let auth: boolean = false
    firebase.auth().signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then((resposta: any) => {
      firebase.auth().currentUser.getIdToken()
        .then((idToken: string) => {
          this.token_id = idToken
          localStorage.setItem('idToken', idToken)
          this.router.navigate(['/painel'])
          auth = true;
        })
    }).catch((error: Error) => {
      this.messageService.erro('Usuário/Senha inválidos!');
      auth = false;
    })
    return auth;
  }
}
