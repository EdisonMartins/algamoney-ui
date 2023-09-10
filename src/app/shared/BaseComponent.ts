import { MessageService } from 'primeng/components/common/messageservice';

export class BaseComponent  {
  constructor(protected messageService: MessageService){ }


  addMsgSuccess(titulo: string, mensagem: string) {
    this.messageService.add(
      {
        severity: 'success',
        summary: titulo,
        detail: mensagem
      });
  }

}

