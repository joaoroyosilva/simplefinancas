import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Receita } from '../../../shared/models/receita.model';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { CategoriaLancamento } from '../../../shared/models/categoria-lancamento.model';

import * as moment from 'moment';

@Component({
  selector: 'app-receita-modal',
  templateUrl: './receita-modal.component.html',
  styleUrls: ['./receita-modal.component.scss'],
})
export class ReceitaModalComponent implements OnInit {

  categorias: CategoriaLancamento[] = [];
  form: FormGroup = new FormGroup({
    documento: new FormControl(null, [Validators.required]),
    categoria: new FormControl(null, [Validators.required]),
    emissao: new FormControl(null, [Validators.required]),
    vencimento: new FormControl(null, [Validators.required]),
    valor: new FormControl(null, [Validators.required]),
    quitada: new FormControl("false", [Validators.required]),
    valorquitado: new FormControl(0, [Validators.required]),
    quitacao: new FormControl(null),
    qtd_lancamento: new FormControl(1, [Validators.required, Validators.min(1)])
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
    this.form.controls['quitada'].setValue(this.data.receita.quitada);
    this.form.controls['valorquitado'].setValue(this.data.receita.valorquitado);
    if (this.data.receita.quitacao) {
      this.form.controls['quitacao'].setValue(moment(this.data.receita.quitacao));
    }
  }

  inserirReceita(): void {
    this.form.controls['documento'].markAsTouched();
    this.form.controls['categoria'].markAsTouched();
    this.form.controls['emissao'].markAsTouched();
    this.form.controls['vencimento'].markAsTouched();
    this.form.controls['valor'].markAsTouched();
    this.form.controls['quitada'].markAsTouched();
    this.form.controls['valorquitado'].markAsTouched();
    this.form.controls['quitacao'].markAsTouched();
    this.form.controls['qtd_lancamento'].markAsTouched();
    if (this.form.valid) {
      for (let i = 0; i < this.form.controls['qtd_lancamento'].value; i++) {
        let receita = new Receita();
        receita.documento = this.form.controls['documento'].value;
        if (this.form.controls['qtd_lancamento'].value > 1) {
          receita.documento = receita.documento + "-" + i;
        }
        receita.categoria = this.form.controls['categoria'].value;
        receita.emissao = (this.form.controls['emissao'].value).format();
        receita.vencimento = moment(this.form.controls['vencimento'].value).add(i, 'M').format();
        console.log('vencimento ' + i, receita.vencimento);
        receita.valor = this.form.controls['valor'].value;
        receita.key = this.data.receita.key;
        if (this.form.controls['quitacao'].value) {
          receita.quitacao = (this.form.controls['quitacao'].value).format();
        }
        receita.valorquitado = (this.form.controls['valorquitado'].value);
        receita.quitada = (this.form.controls['quitada'].value);
        if (receita.key == '') {
          this.firebaseService.pushReceita(receita).then(
            (resp) => console.log(receita)
          );
        } else {
          this.firebaseService.updateReceita(receita);
        }
      }
      this.dialogRef.close();
    } else {
      this.messageService.erro('Preencha todos os campos!');
    }

  }

}

