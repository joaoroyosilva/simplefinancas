import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('animacao-login', [
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
export class LoginComponent implements OnInit {

  estadoLogin: string = 'criado';
  hide = true;
  enviando: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
  }

  public autenticar(): void {
    if (this.form.valid) {
      this.enviando = true;
      this.authService.autenticar(this.form.value.email, this.form.value.senha)
        .then(
          (resp) => {
            this.enviando = false;
          })
        .catch(
          (erro) => {
            this.estadoLogin = 'recusado';
            this.enviando = false;
          }
        )
    } else {
     // this.estadoLogin = 'recusado';
      this.messageService.erro('Confira todos os campos!');
    }
  }

  alteraStatusForm(): void {
    this.estadoLogin = 'criado';
  }

  logarGmail(): void {
    this.authService.logarGmail();
  }
}
