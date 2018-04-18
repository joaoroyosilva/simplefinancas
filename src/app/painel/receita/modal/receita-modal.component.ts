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
    historico: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    categoria: new FormControl(null, [Validators.required]),
    emissao: new FormControl(null, [Validators.required]),
    vencimento: new FormControl(null, [Validators.required]),
    valor: new FormControl(0, [Validators.required, Validators.min(0)]),
    quitada: new FormControl("false", [Validators.required]),
    valorquitado: new FormControl(0),
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
    this.form.controls['historico'].setValue(this.data.receita.historico);
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
    this.form.controls['historico'].markAsTouched();
    this.form.controls['categoria'].markAsTouched();
    this.form.controls['emissao'].markAsTouched();
    this.form.controls['vencimento'].markAsTouched();
    this.form.controls['valor'].markAsTouched();
    this.form.controls['quitada'].markAsTouched();
    this.form.controls['valorquitado'].markAsTouched();
    this.form.controls['quitacao'].markAsTouched();
    this.form.controls['qtd_lancamento'].markAsTouched();
    //console.log(this.form);
    if (this.form.valid) {
      for (let i = 0; i < this.form.controls['qtd_lancamento'].value; i++) {
        let receita = new Receita();
        receita.documento = this.form.controls['documento'].value;
        receita.historico = this.form.controls['historico'].value;
        if (this.form.controls['qtd_lancamento'].value > 1) {
          receita.documento = receita.documento + "-" + i;
        }
        receita.categoria = this.form.controls['categoria'].value;
        receita.emissao = (this.form.controls['emissao'].value).format();
        receita.vencimento = moment(this.form.controls['vencimento'].value).add(i, 'M').format();
        receita.valor = this.form.controls['valor'].value;
        receita.key = this.data.receita.key;
        if (this.form.controls['quitacao'].value) {
          receita.quitacao = (this.form.controls['quitacao'].value).format();
          receita.valorquitado = this.form.controls['valorquitado'].value;
        }
        receita.quitada = (this.form.controls['quitada'].value);
        if (receita.key == '') {
          this.firebaseService.pushReceita(receita);
        } else {
          this.firebaseService.updateReceita(receita);
        }
      }
      this.dialogRef.close();
    } else {
      this.messageService.erro('Preencha todos os campos!');
    }

  }

  quitada(): void {
    if (this.form.get('quitada').value == 'true') {
      this.form.get('quitacao').setValidators([Validators.required]);
      this.form.get('valorquitado').setValidators([Validators.required, Validators.min(0)]);
    } else {
      this.form.get('quitacao').clearValidators();
      this.form.get('quitacao').updateValueAndValidity();
      this.form.get('valorquitado').clearValidators();
      this.form.get('valorquitado').updateValueAndValidity();
    }
  }

}

