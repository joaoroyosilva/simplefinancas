import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Despesa } from '../../../shared/models/despesa.model';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { CategoriaLancamento } from '../../../shared/models/categoria-lancamento.model';

import * as moment from 'moment';


@Component({
  selector: 'app-despesa-modal',
  templateUrl: './despesa-modal.component.html',
  styleUrls: ['./despesa-modal.component.scss'],
})
export class DespesaModalComponent implements OnInit {

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
    public dialogRef: MatDialogRef<DespesaModalComponent>,
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
          if (categoria.tipo === 'Despesas') {
            this.categorias.push(categoria);
          }
        })
      }
    )
    this.form.controls['documento'].setValue(this.data.despesa.documento);
    this.form.controls['historico'].setValue(this.data.despesa.historico);
    this.form.controls['categoria'].setValue(this.data.despesa.categoria);
    this.form.controls['emissao'].setValue(moment(this.data.despesa.emissao));
    this.form.controls['vencimento'].setValue(moment(this.data.despesa.vencimento));
    this.form.controls['valor'].setValue(this.data.despesa.valor);
    this.form.controls['quitada'].setValue(this.data.despesa.quitada);
    this.form.controls['valorquitado'].setValue(this.data.despesa.valorquitado);
    if (this.data.despesa.quitacao) {
      this.form.controls['quitacao'].setValue(moment(this.data.despesa.quitacao));
    }
  }

  inserirDespesa(): void {
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
        let despesa = new Despesa();
        despesa.documento = this.form.controls['documento'].value;
        despesa.historico = this.form.controls['historico'].value;
        if (this.form.controls['qtd_lancamento'].value > 1) {
          despesa.documento = despesa.documento + "-" + i;
        }
        despesa.categoria = this.form.controls['categoria'].value;
        despesa.emissao = (this.form.controls['emissao'].value).format();
        despesa.vencimento = moment(this.form.controls['vencimento'].value).add(i, 'M').format();
        despesa.valor = +this.form.controls['valor'].value;
        despesa.key = this.data.despesa.key;
        if (this.form.controls['quitacao'].value) {
          despesa.quitacao = (this.form.controls['quitacao'].value).format();
          despesa.valorquitado = +this.form.controls['valorquitado'].value;
        } else {
          despesa.quitacao = "";
          despesa.valorquitado = 0;
        }
        despesa.quitada = (this.form.controls['quitada'].value);
        if (despesa.key == '') {
          this.firebaseService.pushDespesa(despesa);
        } else {
          this.firebaseService.updateDespesa(despesa);
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

