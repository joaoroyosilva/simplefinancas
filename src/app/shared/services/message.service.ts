import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class MessageService {

  constructor() { }

  sucesso(msg: string): any {
    $.notify({
      icon: 'notifications',
      message: msg
    },
      {
        type: 'info',
        placement: {
          from: "bottom",
          align: "right"
        },
      });
  }

  erro(msg: string): any {
    $.notify({
      icon: 'notifications',
      message: msg
    },
      {
        type: 'danger',
        placement: {
          from: "bottom",
          align: "right"
        },
      });
  }

  info(msg: string): any {
    $.notify({
      icon: 'notifications',
      message: msg
    },
      {
        type: 'success',
        placement: {
          from: "bottom",
          align: "right"
        },
      });
  }
}
