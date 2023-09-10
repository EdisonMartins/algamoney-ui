import { Component, OnInit } from '@angular/core';
import { Pessoa } from './../../core/model';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../shared/BaseComponent';
import { MessageService } from 'primeng/components/common/messageservice';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent extends BaseComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    messageService: MessageService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService
  ) {
    super(messageService);
  }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.addMsgSuccess(this.pessoa.nome, "Pessoa adicionada com sucesso!");
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
