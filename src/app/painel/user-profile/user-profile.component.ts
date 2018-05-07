import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Usuario } from 'app/shared/models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  enviando: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  form: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    endereco: new FormControl(null),
    telefone: new FormControl(null)
  });

  ngOnInit() {
    this.firebaseService.getUsuario().then(
      (usuario) => {
        this.form.controls['nome'].setValue(usuario.nome);
        this.form.controls['endereco'].setValue(usuario.endereco);
        this.form.controls['telefone'].setValue(usuario.telefone);
      }
    )
  }

  atualizar(): void {
    // console.log(this.form.value);
    if (this.form.valid) {
      let usuario = new Usuario();
      usuario.nome = this.form.controls['nome'].value;
      usuario.endereco = this.form.controls['endereco'].value;
      usuario.telefone = this.form.controls['telefone'].value;
      this.enviando = true;
      this.firebaseService.updateUsuario(usuario).then(
        (resp) => {
          this.enviando = false;
        }
      );
    } else {
      this.messageService.erro('Confira as informações!');
    }
  }

}
