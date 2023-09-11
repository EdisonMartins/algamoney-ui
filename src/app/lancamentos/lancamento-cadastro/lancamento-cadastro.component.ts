import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { BaseComponent } from '../../shared/BaseComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent extends BaseComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  lancamento = new Lancamento();

  categorias = [];
  pessoas = [];

  constructor(
    messageService: MessageService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) {
    super(messageService);

  }
  pt_BR: any;

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    };
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        // Transformar o array de categorias em um objeto com os campos 'label' e 'value'.
        // O 'map' irá percorrer todos elementos do array e chamará um função para cada elemento.
        // A função chamada retornará um novo Array.
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listaTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        console.log("Lançamento adicionado com sucesso!")
        this.addMsgSuccess(this.lancamento.descricao, "Lançamento adicionado com sucesso!");
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
