import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Receita } from '../../../shared/models/receita.model';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { CategoriaLancamento } from '../../../shared/models/categoria-lancamento.model';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import * as moment from 'moment';

@Component({
  selector: 'app-receita-modal',
  templateUrl: './receita-modal.component.html',
  styleUrls: ['./receita-modal.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'pt-Br' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ReceitaModalComponent implements OnInit {

  categorias: CategoriaLancamento[] = [];
  form: FormGroup = new FormGroup({
    documento: new FormControl(null, [Validators.required]),
    categoria: new FormControl(null, [Validators.required]),
    emissao: new FormControl(null, [Validators.required]),
    vencimento: new FormControl(null, [Validators.required]),
    valor: new FormControl(null, [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<ReceitaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    private messageService: MessageService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.firebaseService.getCategorias().then(
      (categorias: any) => {
        //console.log(this.categorias);
        categorias.forEach((categoria: any) => {
          //console.log(categoria);
          if (categoria.tipo === 'Receitas') {
            this.categorias.push(categoria);
          }
        })
      }
    )
    this.form.controls['documento'].setValue(this.data.receita.documento);
    this.form.controls['categoria'].setValue(this.data.receita.categoria);
    this.form.controls['emissao'].setValue(moment(this.data.receita.emissao));
    this.form.controls['vencimento'].setValue(moment(this.data.receita.vencimento));
    this.form.controls['valor'].setValue(this.data.receita.valor);
  }

  inserirReceita(): void {
    this.form.controls['documento'].markAsTouched();
    this.form.controls['categoria'].markAsTouched();
    this.form.controls['emissao'].markAsTouched();
    this.form.controls['vencimento'].markAsTouched();
    this.form.controls['valor'].markAsTouched();
    if (this.form.valid) {
      let receita = new Receita();
      receita.documento = this.form.controls['documento'].value;
      receita.categoria = this.form.controls['categoria'].value;
      receita.emissao = (this.form.controls['emissao'].value).format();
      receita.vencimento = (this.form.controls['vencimento'].value).format();
      receita.valor = this.form.controls['valor'].value;
      receita.key = this.data.receita.key;
      if (receita.key == '') {
        this.firebaseService.pushReceita(receita);
      } else {
        this.firebaseService.updateReceita(receita);
      }
      this.dialogRef.close();
    } else {
      this.messageService.erro('Preencha todos os campos!');
    }

  }

}

