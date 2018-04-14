import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../shared/models/usuario.model';
import { MessageService } from '../shared/services/message.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [
    trigger('animacao-form', [
      state('criado', style({
        opacity: 1
      })),
      state('recusado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0)' }),
        animate('500ms 0s ease-in-out') //duração, delay e aceleração 
      ]),
      transition('criado => recusado', [
        //0 void ----X----------------------------X--X--X-------------------X criado 1.5s//
        animate('1.5s 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)' })
        ])) //duração, delay e aceleração 
      ])
    ])
  ]
})
export class RegistroComponent implements OnInit {

  estadoForm: string = 'criado';
  hide = true;

  form: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  cadastrar() {
    this.form.controls['nome'].markAsTouched();
    this.form.controls['email'].markAsTouched();
    this.form.controls['senha'].markAsTouched();
    if (this.form.valid) {
      let usuario: Usuario = new Usuario();
      usuario.nome = this.form.controls['nome'].value;
      usuario.email = this.form.controls['email'].value;
      usuario.senha = this.form.controls['senha'].value;
      this.authService.cadastrarUsuario(usuario).then(
        () => this.router.navigate(['/auth/login'])
      );
    } else {
      this.estadoForm = 'recusado';
      this.messageService.erro('Confira todos os campos!');
    }
  }

  alteraStatusForm(): void {
    this.estadoForm = 'criado';
  }
}
