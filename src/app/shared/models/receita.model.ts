import * as moment from 'moment';

export class Receita {
    documento: string = '';
    historico: string = '';
    valor: number = 0;
    vencimento: string = '';
    emissao: string = moment(new Date()).format();
    juros: number = 0;
    categoria: string = '';
    key: string = '';
    quitada: string = "false";
    quitacao: string = '';
    valorquitado:number = 0;
    constructor() { }
}
