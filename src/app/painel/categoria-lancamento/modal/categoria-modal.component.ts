import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriaLancamento } from '../../../shared/models/categoria-lancamento.model';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.scss']
})
export class CategoriaModalComponent implements OnInit {

  tipos: string[] = ['Despesas', 'Receitas'];

  form: FormGroup = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    tipo: new FormControl(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.form.controls['nome'].setValue(this.data.categoria.nome);
    this.form.controls['tipo'].setValue(this.data.categoria.tipo);
  }

  inserirCategoria(): void {
    this.form.controls['nome'].markAsTouched();
    this.form.controls['tipo'].markAsTouched();
    if (this.form.valid) {
      let categoria = new CategoriaLancamento();
      categoria.nome = this.form.controls['nome'].value;
      categoria.tipo = this.form.controls['tipo'].value;
      this.firebaseService.setCategoria(categoria);
      this.dialogRef.close();
    } else {
      this.messageService.erro('Preencha todos os campos!');
    }
  }

}
